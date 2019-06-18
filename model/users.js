const mongoose=require('mongoose');
const Joi=require('joi');
const config=require('config');
const jwt=require('jsonwebtoken');

const userSchema=new mongoose.Schema({
    user_id:{
        type:String ,
        unique:true
    },
    
    password:{
        type: String
    },

});
userSchema.methods.generateAuthToken=function(){
    const token=jwt.sign({id:this.user_id},config.get('jwtPrivateKey'));
    return token;
}
const User=mongoose.model('User',userSchema);

function validateFields(user){
    const schema={
        user_id:Joi.string().email().required(),
        password:Joi.string().required(),
        
    }

return Joi.validate(user,schema);
}

module.exports.User=User;
module.exports.validateFields=validateFields;



