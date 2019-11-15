const User = require("../models/User");

const deleteUser = async (id) => {
    const user = await User.findById(id);

    if (!user) {
        throw new Error("User doesn't exist");
    }

    await user.delete();
};

module.exports = deleteUser;
