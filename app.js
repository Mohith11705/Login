const express=require('express')
const path=require('path')
const app=express();
const collection=require('./conf/config')
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const key='abcd';
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','index.html'))
})
app.post('/', async (req, res) => {
    try {
        const data = {
            name: req.body.username,
            email: req.body.email,
            password: req.body.password,
        };
        const check = await collection.findOne({ email: data.email });
        if (check) {
            return res.status(409).send('email already exists');
        }
        const hashedPassword = await bcrypt.hash(data.password, 10);
        data.password = hashedPassword;
        const userdata = await collection.insertMany(data); 
        console.log('User data inserted:', userdata);

        res.status(201).send('User registered successfully!');
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).send('Server error');
    }
});
app.get('/login',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','login.html'))
})

// const authtoken=(req,res,next)=>{
//     const authheader=req.headers['authorization'];
//     const token=authheader &&authheader.split(' ')[1];
//     if(!token){
//         return res.status(401).send('access denied');
//     }
//     jwt.verify(token,key,(err,user)=>{
//         if(err){
//             res.status(403).send("invalid token")
//         }
//         req.user=user;
//         next();
//     })
// }
app.post('/login',async(req,res)=>{
    const d={
        password:req.body.password,
        email:req.body.email
    }
    const user=await collection.findOne({email:d.email});
    if(!user)
    {
        return res.status(404).send('user not found');
    }
    const isPassword=await bcrypt.compare(d.password,user.password)
    if(!isPassword){
        res.status(401).send('Invalid password');
    }
});
    // if(isPassword){
    //     res.sendFile(path.join(__dirname,'views','home.html'),(err)=>{
    //         if(err)
    //         {
    //             res.status(500).send("error loading in home page")
    //         }
    //     });
    // }
//     const token=jwt.sign({email:user.email,password:user.password},key,{expiresIn:'1h'});
//     res.status(200).send({token});
// })
// app.get('/home',authtoken,(req,res)=>{
//     res.sendFile(path.join(__dirname,'views','home.html'))
// })
// app.get('/*',(req,res)=>{
//     res.sendFile(path.join(__dirname,'views','404.html'))
// })
console.log(key);
const PORT = 3001;
app.listen(PORT,()=>{
    console.log(`server runs ${PORT}`)
});