const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.promise = global.promise;
const bodyParser = require('body-parser');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const port = 4111 || process.env.PORT;

mongoose.connect('mongodb://localhost:27017/login',{ useNewUrlParser: true });
mongoose.connection
    .once('open',()=>console.log('database is connected'))
    .on('error',(err)=>{
        console.log('connection error');
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.post('/hi',(req,res)=>{

    const new_user = new User();
        new_user.email = req.body.email,
        new_user.password = req.body.password;
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(new_user.password,salt,(err,hash)=>{
            if (err) return err;
            new_user.password = hash;
            new_user.save().then(savedUser=>{
                res.send('the user is saved');
            }).catch(err=>{
                res.send(err);
            });

            res.send(new_user);

        });

    });

});



app.post('/login',(req,res)=>{
    User.findOne({email : req.body.email}).then(user=>{
        if (user){
            bcrypt.compare(req.body.password,user.password,(err,match)=>{
                if (match){
                    res.send('you are logged in');
                }else {
                    res.send('couldnot login');
                }
            });
        }
    });
});



app.listen(port,()=>{
    console.log(`listening to port ${port}`);
});