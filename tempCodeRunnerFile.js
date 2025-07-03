    const token=jwt.sign({email:user.email,password:user.password},key,{expiresIn:'1h'});
//     res.status(200).send({token});
// })
// app.get('/home',authtoken,(req,res)=>{
//     res.sendFile(path.join(__dirname,'views','home.html'))
// })