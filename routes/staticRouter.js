const express = require("express");
const router = express.Router();
const URL = require("../models/url");

/*Home Page Route: takes req from middleware
  and it take user also which is because if the 
  the user is undefined then redirect it to the login page
  or if user is authenticated it find urls urls that are created by that user and send it ot render on  home page. */
router.get("/",async (req,res)=>{
    if(!req.user) return res.redirect("/login");
    const allurls = await URL.find({createdBy:req.user._id})
    return res.render("home",{
        urls: allurls,
    });
});

// Signup route: it shows the signup page 
router.get('/signup',(req,res) =>{
    return res.render("signup");
});

// Login route: It shows the login page
router.get('/login',(req,res) =>{
    return res.render("login");
});

module.exports = router;