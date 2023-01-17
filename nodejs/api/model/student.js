const mongoose=require('mongoose');



const CustomerSchema = new mongoose.Schema({
    name: {
        type:String,
        require:true,
        trim:true,
    },
    email: {
        type:String,
       
        trim:true,
    },
    mobile: {
        type:Number,
        require:true,
        trim:true,
        minLength:10,
        maxLength:10
    },
   
    city: {
        type:String,
        require:true,
        trim:true,
    },
    B_name:{
        type:String,
        trim:true,
    },
    B_type:{
      type:String,
      trim:true
    },
    status: {
        type:String,
        require:true,
        trim:true,
    },
    Remarks: {
        type:String,
        require:true,
        trim:true,
    },
    
    meeting_mode:{
       type:String,
       trim:true
    },
    meeting_phyical:{
        type:String,
        trim:true
    },
    meeting_phyical:{
        type:String,
        trim:true
    },
    meeting_address:{
        type:String,
        trim:true
    },
    meeting_date:{
        type:String,
        trim:true
    },


  author:[ { type: mongoose.Types.ObjectId, ref: 'User' }]
});
const AgentSchema = new mongoose.Schema({
    name: {
        type:String,
        require:true,
        trim:true,
    },
    email: {
        type:String,
        require:true,
        trim:true,
    },
   
    department:{
     type:String,
     require:true,
     trim:true,
    },
    password:
    {
        type:String,
        require:true,
        trim:true,
    },
    posts: [{ type: mongoose.Types.ObjectId, ref: 'Post' }]
  });
//HOD
  const HOD = new mongoose.Schema({
    name: {
        type:String,
        require:true,
        trim:true,
    },
    email: {
        type:String,
        require:true,
        trim:true,
    },
    password:
    {
        type:String,
        require:true,
        trim:true,
    },
    department:{
     type:String,
     require:true,
     trim:true,
    },
   
  });


  const Bill=new mongoose.Schema({
    billTo:String ,
    gstNo:String,
    Address:String,
    email:String,
    contact:String,
    State:String,
     author: String
})

// Create the models
module.exports.User = mongoose.model('User', AgentSchema);
module.exports.Post= mongoose.model('Post', CustomerSchema);
module.exports.Hod= mongoose.model('Hod', HOD);
module.exports.Bill=mongoose.model('Bill',Bill);
