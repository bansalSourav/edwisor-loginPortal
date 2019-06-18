const express=require('express');
const router=express.Router();
const {User,validateFields}=require('../model/users');
const _=require('lodash');

router.post('/',async(req,res)=>{
   
   const {error}= validateFields(req.body);
   if(error) return res.status(400).send(error.details[0].message);

   let user=await User.findOne({user_id:req.body.user_id});
   
   if(user) 
   {
      return res.send("User is registered already, try login using 'localhost:3000/api/login'");
   }
   
   else{
   user=new User(_.pick(req.body,['user_id','password']));
   await user.save();
   return res.send("User registered successfully");
   
   }
})

module.exports=router;