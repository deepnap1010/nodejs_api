const express = require('express');
const router = express.Router();

const User = require('../model/student').User
const Post = require('../model/student').Post
const mongoose = require('mongoose');
const Hod=require('../model/student')
const Bill = require('../model/student').Bill





//create HOD
router.post('/hod', (req, res, next) => {
    console.log(req.body);
    const { name, email, password, mobile,department } = req.body
    const user = new Hod({ name: name, email: email, password: password, department:department });
    user.save((err, user) => {
        if (err) {
            console.log(err)
        } else {
            // console.log(`User created: ${user}`);
        }
    });
});





router.post('/login',async(req,res,next)=>{
try {
    const { email, password } = req.body;

    if (email && password) {
         const user=await User.findOne({ email: email });
         

        if (user != null) {
             
                
            if (user.password=== password ) {
                
                
                    console.log(user.department)
                    res.send({message:user});
                


            }else{
                res.send({message:"your email or password wrong "})
            }
        } else{
            res.send({message:"User not in our team"})
        }
    } else {
        res.send({ "status": "failed", "message": "All fields are required" })
    }
}catch(err){
console.log(err)
}
})


//edit Hod
router.post('/hod/:id', (req, res, next) => {


    Hod.findByIdAndUpdate({ _id: req.params.id }, { $set: { name: req.body.name, email: req.body.email,password:req.body.password,mobile:req.body.mobile } }).then((result => {

    })).catch((err) => {

    })

});


//delete hod

router.delete('/hod/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Hod.findByIdAndDelete(id);
        console.log('Hod deleted');
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});




//create new Agent 
router.post('/agent', (req, res, next) => {
    console.log(req.body);
    const { name, email,department,password} = req.body
    if(name && email && department && password){
        
            const user = new User({ name: name, email: email, department:department,password:password});
            user.save((err, user) => {
                if (err) {
                    console.log(err)
                } else {
                  res.send({
                    message:"Your register Succesfully",
                  })
                }
            });
       
        }
       
    else{
        res.send({message:"All fields are required"})
    }
    
});



//to create bill of the customer

router.post('/customer/bill/:id', async (req, res) => {
  console.log(req.body);
  console.log(req.params.id)
    const user = new Bill({ 
        billTo: req.body.billTo,
        gstNo: req.body.gstNo,
        Address: req.body.Address,
        email: req.body.email,
        contact: req.body.contact,
        State: req.body.State,
        author:req.params.id
    });
     user.save()
     console.log(user)
    
    
})


router.get('/customer/bill/:id',async(req,res)=>{
    try {
    
        await Bill.find({ author: req.params.id }).then((result)=>{
          
             res.send(result);
        }).catch((err)=>{
      console.log(err)
        })
   
       } catch (error) {
           console.error(error);
           res.sendStatus(500);
       }
});




//edit Agent detail
router.put('/agent/:id', (req, res, next) => {


    User.findByIdAndUpdate({ _id: req.params.id }, { $set: { name: req.body.name, email: req.body.email,department:req.body.department,password:req.body.password } }).then((result => {
   console.log("updated")
    })).catch((err) => {

    })

});

//delete agent
router.delete('/agent/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        console.log('Post deleted');
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});


//get all agent
router.get('/agent', async (req, res) => {

        
        User.find().then((result)=>{
            console.log(result)
            res.send(result)
        }).catch((err)=>{
            res.json(err)
        })
        
});





//Create a new Customer
router.post('/customer/:id', (req, res, next) => {
    const { name,email,mobile,state,city,B_name,B_type,status,Remarks} = req.body;
    const authorId = req.params.id
    console.log(req.body);
//state mean  follow date 
    if(name &&  mobile &&  Remarks && state  ){
        const post = new Post({ name:name,mobile:mobile,state:state,status:"Follow Up",Remarks:Remarks,author:req.params.id});
       post.save(); 
    }
    else if(name && email && mobile && state && city && B_name && B_type && Remarks){
        const post=new Post({ name:name,email:email,mobile:mobile,state:state,city:city,B_name:B_name,B_type :B_type,status:"Lead",Remarks:Remarks,author:req.params.id} )
    }
    



});



// for edit of the status of the customer
router.post('/customer/status/:id', (req, res, next) => {
       const id=req.params.id;
       const {status}=req.body
       Post.findByIdAndUpdate({_id:id},{$set:{status:status}})
});







// Read a Agents's Customers
router.get('/agent/customer/:id', async (req, res) => {
    try {
    
     await Post.find({ author: req.params.id }).then((result)=>{
       
          res.send(result);
     }).catch((err)=>{
   console.log(err)
     })

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

//Read all Customers 
router.get('/agent/customer',async(req,res)=>{
   try{
    await Post.find().then((result)=>{
        
        res.send(result);
   }).catch((err)=>{
          res.send({
            message:"there is error"
          })
   })     
          
   }catch{

   }
})





// Update a Customer
router.put("/customer/:id", async (req, res) => {
    console.log("Update")
    const postId = req.params.id;
    const { name,email,mobile,address,city,category,description } = req.body;
    Post.findByIdAndUpdate({ _id: postId }, { $set: { name:name,email:email,mobile:mobile,address:address,city:city,category:category,description :description } }, (err, post) => {
        if (err) {
            // Handle error
        } else {
            console.log(`Post updated: ${post}`);
        }
    });
});


// Delete a Delete Customer
router.delete('/customer/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Post.findByIdAndDelete(id);
        console.log('Post deleted');
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});






module.exports = router;