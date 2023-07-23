const axios = require('axios')
module.exports = {
    getGoogleUser : async (access_token) => {
        try{
            const res = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo`, {
                headers : {
                    Authorization : `Bearer ${access_token}`
                }
            })
            return res.data;
        }
        catch(error){
            console.error(error);
        }
    }
}