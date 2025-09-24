const User = require("../model/user.model");

module.exports = class UserServices {
    // Add New USer
    async addNewUser(data){
        return await User.create(data);
    }
    
    // Find Single User
    async findUser(data){
        return await User.findOne(data);
    }
}