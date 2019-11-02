const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
const checkRoles = require("../middlewares/checkRoles");
const User = require("../models/User");

const router = express.Router();

// router.post("/register", (req, res) => {
//     const { errors, isValid } = validateRegisterInput(req.body);

//     if (!isValid) {
//         return res.status(400).json(errors);
//     }
//     User.findOne({
//         username: req.body.username,
//     }).then(user => {
//         if (user) {
//             return res.status(400).json({
//                 username: "Username already exists",
//             });
//         }
//         const newUser = new User({
//             username: req.body.username,
//             password: req.body.password,
//         });

//         bcrypt.genSalt(10, (err, salt) => {
//             if (err) {
//                 console.error("There was an error", err);
//             } else {
//                 bcrypt.hash(newUser.password, salt, (e, hash) => {
//                     if (e) {
//                         console.error("There was an error", e);
//                     } else {
//                         newUser.password = hash;
//                         newUser
//                             .save()
//                             .then(u => {
//                                 res.json(u);
//                             });
//                     }
//                 });
//             }
//         });
//     });
// });

const wrongPassError = "Username and/or password is incorrect!";

router.post("/login", (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const { username, password } = req.body;

    User.findOne({ username })
        .then(user => {
            if (!user) {
                errors.username = wrongPassError;
                errors.password = wrongPassError;
                return res.status(404).json(errors);
            }
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = {
                            id: user.id,
                            username: user.username,
                        };
                        jwt.sign(payload, "secret", {
                            expiresIn: 3600,
                        }, (err, token) => {
                            if (err) {
                                console.error("There is some error in token", err);
                            } else {
                                res.json({
                                    success: true,
                                    token: `Bearer ${token}`,
                                });
                            }
                        });
                    } else {
                        errors.username = wrongPassError;
                        errors.password = wrongPassError;
                        return res.status(400).json(errors);
                    }
                });
        });
});

router.get("/me", checkRoles(["admin"]), (req, res) => {
    return res.json({
        id: req.user.id,
        username: req.user.username,
    });
});

module.exports = router;
