const {getUser} = require("../services/auth");

/* this middleware function request the uid from cookie
   and by that uid it get the user if it gets user it will 
   pass the flow the next otherwie to the login page.
*/
async function restrictToLoggedinUserOnly(req,res,next){

    const userUid = await req.cookies?.uid;
    

    if(!userUid) return res.redirect("/login");

    const user =  getUser(userUid);
    
    if(!user) return res.redirect("/login");

    req.user = user;
    next();
}
//It checkauth for the user and passes the user data 
async function checkAuth(req,res,next){

    const userUid = await req.cookies?.uid;
    const user =  getUser(userUid);
    req.user = user;
    next();
}

module.exports = {
    restrictToLoggedinUserOnly,
    checkAuth
}