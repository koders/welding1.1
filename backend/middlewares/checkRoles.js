const passport = require('passport');

function checkRoles(roles) {
    return function (req, res, next) {
        passport.authenticate("jwt", { session: false }, function (err, user, info) {
            if (err){
                return res.status(403).send('forbidden');
            }
            else if (!user) {
                return res.status(403).send('forbidden');
            }
            else {
                if (roles.length == 0) {
                    req.user = user;
                    return next();
                }
                else if (roles.includes(user.role)) {
                    req.user = user;
                    return next();
                }
                else {
                    return res.status(403).send('forbidden');
                }
            }
        })(req, res, next);
    }
}

module.exports = checkRoles;
