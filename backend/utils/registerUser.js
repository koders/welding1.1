const bcrypt = require("bcryptjs");
const User = require("../models/User");

const registerUser = async (username, password, role) => {
    // TODO add validation
    // if (!isValid) {
    //     return res.status(400).json(errors);
    // }

    const user = await User.findOne({ username });

    return new Promise((resolve, reject) => {
        if (user) {
            reject(new Error("Username already exists"));
        }

        const newUser = new User({
            username,
            password,
            role,
        });

        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                throw new Error(`There was an error: ${err}`);
            }
            bcrypt.hash(newUser.password, salt, async (e, hash) => {
                if (e) {
                    throw new Error(`There was an error: ${e}`);
                }
                newUser.password = hash;
                try {
                    await newUser.save();
                    resolve(newUser);
                } catch (error) {
                    reject(error);
                }
            });
        });
    });
};

module.exports = registerUser;
