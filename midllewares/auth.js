const {getUser} = require("../services/auth");

/* this middleware function request the uid from cookie
   and by that uid it get the user if it gets user it will 
   pass the flow the next otherwie to the login page.
*/

function checkForAuthentication(req,res,next){
    const authenticationToken = req.cookies?.uid;

    req.user = null;

    if(!authenticationToken) return next();

    const user = getUser(authenticationToken);
    req.user = user;
    return next();
}
function restrictTo(roles = []){
    return function(req,res,next){
        if(!req.user) return res.redirect("/login");
        if(!roles.includes(req.user.role)) return res.end("Unauthorized User");
        return next();
    };
}

module.exports = {
    checkForAuthentication,
    restrictTo
}