const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const userModel = require('./model/user')
const postModel = require('./model/post')
const path = require('path');
const { default: mongoose } = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const upload = require('./config/multerConfig')
const multer = require('multer');
const { env } = require('process');
require('dotenv').config();

app.set('view engine','ejs');
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.render("index")
})

app.get('/profile',isLogedIn,async (req,res)=>{
    let user = await userModel.findOne({email: req.user.email}).populate('posts');
    res.render('profile',{user})
})

app.get('/upload/profile',(req,res)=>{
    res.render('uploadsProfile');
})

app.post('/upload',isLogedIn,upload.single('image'),async (req,res)=>{
    const user = await userModel.findOne({email: req.user.email});
    user.profilePic = req.file.filename;
    user.save();
    res.redirect('/profile');
})

app.get('/like/:id',isLogedIn,async (req,res)=>{
    let post = await postModel.findOne({_id: req.params.id}).populate('user');

    if(post.likes.indexOf(req.user.userid)==-1){
        post.likes.push(req.user.userid);
    }else{
        post.likes.splice(post.likes.indexOf(req.user.userid),1);
    }

    await post.save();
    res.redirect('/profile')
})

app.get('/edit/:id',isLogedIn,async (req,res)=>{
    let post = await postModel.findOne({_id: req.params.id}).populate('user');
    res.render('edit',{post});
})

app.post('/update/:id',isLogedIn,async (req,res)=>{
    let post = await postModel.findOneAndUpdate({_id: req.params.id},{postData: req.body.postData});
    res.redirect('/profile');
})

app.post('/post',isLogedIn,async (req,res)=>{
    let user = await userModel.findOne({email: req.user.email});

    let {postData}=req.body;
    let post = await postModel.create({
        user: user._id,
        postData
    })

    user.posts.push(post._id);
    await user.save();

    res.redirect('/profile');
})

app.post('/register',async (req,res)=>{
    let {name, username, age, email, password} = req.body;

    let user = await userModel.findOne({email});
    if(user) return res.status(500).send("User already exists");

    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(password,salt,async (err,hash)=>{
            let user = await userModel.create({
                name, 
                username,
                age,
                email,
                password: hash
            });

            let token = jwt.sign({email: email, userid: user._id},process.env.JWT_SECRET);
            res.cookie('token',token);
            res.send('Registration Successful')
        })
    })
});

app.get('/login',(req,res)=>{
    res.render("login")
})

app.post('/login',async (req,res)=>{
    let {email, password} = req.body;

    let user = await userModel.findOne({email});
    if(!user) return res.status(500).send("Something went wrong");

    bcrypt.compare(password,user.password,(err,result)=>{
        if(result){
            let token = jwt.sign({email: email, userid: user._id}, process.env.JWT_SECRET);
            res.cookie('token',token);
            res.redirect('/profile')
        }
        else res.redirect('/login') 
    })
});

app.get('/logout',(req,res)=>{
    res.cookie('token',"");
    res.redirect("/login")
})

function isLogedIn(req,res,next){
    if(req.cookies.token==="") res.redirect("/login")
    else{
        let data=jwt.verify(req.cookies.token,process.env.JWT_SECRET);
        req.user=data;
        next();
    }
}

app.listen(3000);