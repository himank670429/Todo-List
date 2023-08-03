const userData = require('../../model/Schemas/userData')
module.exports = {
    upSertUser : async (email, username, avatar) => {
        const newUser = {
            email,
            username, 
            avatar
        }
        const options = {upsert : true, new : true, setDefaultsOnInsert : true}
        return userData.findOneAndUpdate({email}, newUser, options)
    },
    findUser : async (email) => {
        return await userData.findOne({email});
    }
}