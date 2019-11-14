const bcrypt = require("bcryptjs");
const User = require("../models/User");

const registerUser = async (username, password, role) => {
    // TODO add validation
    // if (!isValid) {
    //     return res.status(400).json(errors);
    // }
    const user = await User.findOne({ username });

    if (user) {
        throw new Error("Username already exists");
    }

    const newUser = new User({
        username,
        password,
        role,
    });

    return new Promise((resolve) => {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                throw new Error(`There was an error: ${err}`);
            }
            bcrypt.hash(newUser.password, salt, async (e, hash) => {
                if (e) {
                    throw new Error(`There was an error: ${e}`);
                }
                newUser.password = hash;
                await newUser.save();
                resolve(newUser);
            });
        });
    });
};

module.exports = registerUser;
