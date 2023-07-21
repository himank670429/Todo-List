const UserData = require('../Schemas/userData')

module.exports = {
    getUserData : async (id) => {
        return await UserData.findById(id);
    }
}