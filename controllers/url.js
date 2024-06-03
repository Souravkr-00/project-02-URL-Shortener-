const short = require('short-uuid');
const URL = require("../models/url");

async function handleUrlGenerator(req,res){
    const body = req.body;
    if(!body.url) return res.status(400).json({error:"url must be required"});
    // const uid = new ShortUniqueId({ length: 10 });    
    const shortID = short.generate();
    console.log(shortID)

    const result = await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
        createdBy:req.user._id,
    }) 
 
    return res.render("home",{
        id :shortID,
    });
}

async function handleGetAnalytics(req,res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    return res.json({totalclicks:result.visitHistory.length,analytics: result.visitHistory})
}
module.exports = {
    handleUrlGenerator,
    handleGetAnalytics
}
