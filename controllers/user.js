const { uuid } = require("short-uuid");
const User = require("../models/user");
const {v4:uuidv4} = require(("uuid"));
const {setUser} = require("../services/auth");

// Deals with Signup user to store in db and redirect to the home page
async function handleUserSignup(req,res){
    const {name, email, password} = req.body;
    await User.create({
        name,
        email,
        password
    });

    return res.redirect("/");
}

/*Deals with users credentials to authenticate the user 
  and generate sessionId and stores in Map(diary) and pass 
  that sessionId in the cookie for authentication purpose by which 
  the user can be checked by middlewares that the user is login or not.
  if loggedin then provide the resource otherwise redirect to the login page.*/

async function handleUserLogin(req,res){

    const {email, password} = req.body;
    const user = await User.findOne({email,password});
    
    if(!user) return res.render("login",{
        error:"Invalid Username or password"
    });

    // const sessionId = uuidv4();
    const token = setUser(user);
    res.cookie("uid",token);
    
    return res.redirect("/");
}

module.exports = {
    handleUserSignup,
    handleUserLogin
}