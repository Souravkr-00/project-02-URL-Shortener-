const express = require('express');
const {connectionMongoDB} = require("./connect");
const app = express();
const urlRoute = require('./routes/url');
const userRoute = require("./routes/user");
const URL = require(".//models/url");
const cookieParser = require("cookie-parser")
const {checkForAuthentication,restrictTo} = require("./midllewares/auth")
const path = require("path")
const PORT = 8001;
const staticRoute = require("./routes/staticRouter");
connectionMongoDB("mongodb://localhost:27017/short-url")
.then(()=> console.log("MongoDb Connected"));

app.set("view engine","ejs"); // It defines the template we are using in this app
app.set("views", path.resolve("./views")); // this will give the path of the file of ejs 


app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkForAuthentication);


app.use("/url",restrictTo(["NORMAL"]),urlRoute);
app.use("/user",userRoute);
app.use("/",staticRoute);

app.get('/url/:shortId',async(req,res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
    shortId,
    },
    {
        $push:{
            visitHistory:{
                timestamp:Date.now(),
            }
        }
    }
);


res.redirect("https://"+ entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server is started at PORT: ${PORT}`));