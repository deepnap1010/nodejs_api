const mongoose=require('mongoose');
const Student=new mongoose.Schema({
    name:String
})
const Course=new mongoose.Schema({
    course:String
})

module.exports.Student=mongoose.Modal('Student',Student);
module.exports.Course=mongoose.Modal('Course',Course);