const mongoose = require('mongoose');
require('dotenv').config()
mongoose.connect(process.env.DB_URI)

const user = require('./Schemas/userData')
const newUser = new user({
    username: 'username',
    avatar: null,
    tasks: [
      {
        card: {
          title: 'Day',
          date: '10/07/2023',
          theme: '#0f6dd2',
        },
        current: [
          {
            id: '6b8f1e1f-f852-4add-99e1-3b43a1fe9ba8',
            desc: 'Task 1',
            date: '10/07/2023',
          },
          {
            id: '3c8835b3-5a13-4fa0-a357-3eaf3e3dd19f',
            desc: 'Task 2',
            date: '10/07/2023',
          },
        ],
        completed: [
          {
            id: '1035fc05-d3e8-4ca1-8350-2e8c5f5288a4',
            desc: 'Task 3',
            date: '10/07/2023',
          },
          {
            id: '0247b29e-dae0-4ebf-adb7-758326bd6683',
            desc: 'Task 4',
            date: '10/07/2023',
          },
        ],
      },
    ],
})
newUser.save()
.then(data => console.log(data));