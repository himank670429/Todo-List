const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3001;
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
mongoose.connect(process.env.DB_URI);

const jwt = require("jsonwebtoken");

// local libraries
const {
	addTaskGroup,
	deleteTaskGroup,
	addTask,
	deleteTask,
	markTask,
} = require("./controller/Database/userDataApi");

const { upSertUser, findUser } = require("./controller/Database/userApi");

const { getGoogleUser } = require("./controller/auth/googleAuth");

const {
	getCache,
	setCache,
	addSocketInstance,
	getSocketInstances,
	removeSocketInstance,
} = require("./controller/cache/localCache");

// setups
app.use(express.json());
app.use(express.static("public"));
app.use(
	cors({
		origin: require("./model/config/allowedOrigins"),
	})
);
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: require("./model/config/allowedOrigins"),
		methods: ["GET, POST"],
	},
});

// cache
const getOrsetCache = async (key, callback) => {
	const user = getCache(key);
	if (user) {
		return user;
	}
	const freshData = await callback();
	setCache(key, freshData);
	return freshData;
};

// use middle to check fot token
io.use((socket, next) => {
	const token = socket.handshake.query.token;
	if (!token) {
		return next(new Error("unauthorized access"));
	}
	try {
		const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
		if (decoded) {
			socket.userId = decoded;
		}
		return next();
	} catch (error) {
		return next(new Error("jwt malformed!"));
	}
});

// server
io.on("connection", (socket) => {
	socket.on("api-user-connect", async (id) => {
		// check if the user is authentic or not
		if (socket.userId === id) {
			await getOrsetCache(id, async () => await findUser(id));
			addSocketInstance(id, socket.id);
		}
	});

	socket.on("api-user-taskGroup-add", async (id, title, theme, date, cb) => {
		if (socket.userId === id) {
			const user = await getOrsetCache(id, async () => await findUser(id));
			try {
				const data = await addTaskGroup(user, title, theme, date);
				cb(data.tasks, null);
				const all_sockets = getSocketInstances(id);
				all_sockets.forEach((socket_id) => {
					if (socket_id === socket.id) return;
					io.to(socket_id).emit("api-user-update-instance", data.tasks);
				});
			} catch (error) {
				cb(null, error.message);
			}
		} else {
			cb(null, new Error("unauthorised access"));
		}
	});

	socket.on("api-user-taskGroup-del", async (id, taskGroupId, cb) => {
		if (socket.userId === id) {
			const user = await getOrsetCache(id, async () => await findUser(id));
			try {
				const data = await deleteTaskGroup(user, taskGroupId);
				cb(data.tasks, null);
				const all_sockets = getSocketInstances(id);
				all_sockets.forEach((socket_id) => {
					if (socket_id === socket.id) return;
					io.to(socket_id).emit("api-user-update-instance", data.tasks);
				});
			} catch (error) {
				cb(null, error.message);
			}
		} else {
			cb(null, new Error("unauthorised access"));
		}
	});

	socket.on("api-user-task-add", async (id, taskGroupId, desc, date, cb) => {
		if (socket.userId === id) {
			const user = await getOrsetCache(id, async () => await findUser(id));
			try {
				const data = await addTask(user, taskGroupId, desc, date);
				const updatedValue = data.tasks.find(
					(obj) => obj.id === taskGroupId
				).current;
				cb(updatedValue, null);
				const all_sockets = getSocketInstances(id);
				all_sockets.forEach((socket_id) => {
					if (socket_id === socket.id) return;
					io.to(socket_id).emit("api-user-update-instance", data.tasks);
				});
			} catch (error) {
				cb(null, error.message);
			}
		} else {
			cb(null, new Error("unauthorised access"));
		}
	});

	socket.on(
		"api-user-task-del",
		async (id, taskGroupId, taskId, isCurrent, cb) => {
			if (socket.userId === id) {
				const user = await getOrsetCache(id, async () => await findUser(id));
				try {
					const data = await deleteTask(user, taskGroupId, taskId, isCurrent);
					const updatedValue = data.tasks.find((obj) => obj.id === taskGroupId);
					cb(isCurrent ? updatedValue.current : updatedValue.completed, null);
					const all_sockets = getSocketInstances(id);
					all_sockets.forEach((socket_id) => {
						if (socket_id === socket.id) return;
						io.to(socket_id).emit("api-user-update-instance", data.tasks);
					});
				} catch (error) {
					cb(null, error.message);
				}
			} else {
				cb(null, new Error("unauthorised access"));
			}
		}
	);

	socket.on(
		"api-user-task-mark",
		async (id, taskGroupId, taskId, isCurrent, cb) => {
			if (socket.userId === id) {
				const user = await getOrsetCache(id, async () => await findUser(id));
				try {
					const data = await markTask(user, taskGroupId, taskId, isCurrent);
					const updatedValue = data.tasks.find((obj) => obj.id === taskGroupId);
					cb(updatedValue, null);
					const all_sockets = getSocketInstances(id);
					all_sockets.forEach((socket_id) => {
						if (socket_id === socket.id) return;
						io.to(socket_id).emit("api-user-update-instance", data.tasks);
					});
				} catch (error) {
					cb(null, error.message);
				}
			} else {
				cb(null, new Error("unauthorised access"));
			}
		}
	);
	// user disconnects
	socket.on("disconnect", () => {
		try {
			removeSocketInstance(socket.id);
		} catch (error) {
			console.log(error.message);
		}
	});
});

app.post("/api/login/google", async (req, res) => {
	const { access_token } = req.body;
	try {
		const { email, name, picture } = await getGoogleUser(access_token);
		const user = await upSertUser(email, name, picture);
		const token = jwt.sign(email, process.env.TOKEN_SECRET);
		res.status(200).send({ data: user, token });
	} catch (error) {
		if (error?.reponse?.status === 401)
			res.status(401).send({ message: "unauthorized access" });
		else res.status(500).send({ message: "internal server error" });
	}
});

server.listen(port);
