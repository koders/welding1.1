const passport = require("passport");

const checkRoles = roles => {
    return (req, res, next) => {
        passport.authenticate("jwt", { session: false }, (err, user) => {
            if (err || !user) {
                return res.status(403).send("forbidden");
            }

            const hasRole = roles ? roles.some(role => user.roles.includes(role)) : true;

            if (roles.length === 0 || hasRole) {
                req.user = user;
                return next();
            }

            return res.status(403).send("forbidden");
        })(req, res, next);
    };
};

module.exports = checkRoles;
