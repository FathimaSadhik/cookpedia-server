const testimonials =require('../models/testmonyModel')


// add testimonals
exports.addTestimonyController =async(req,res)=>{
    console.log("Inside addTestimonyController")
    const {name,email,message} =req.body
    try{
          const newMessage =  new testimonials({
            name,email,message
          })
          await newMessage.save()
          res.status(200).json(newMessage)
    }catch(err){
        res.status(401).jwon(err)
    }
}
// get al testimony
exports.getAllTestimonyController =async (req,res)=>{
  console.log("Inside getAllTestimonyController ");
  try{
    const allTestimony = await testimonials.find()
    res.status(200).json(allTestimony)
  }catch(err){
    res.status(401).json(err)
  }
}

// status update
exports.updateStatusTestimonyController =async (req,res)=>{
  console.log("Inside UpdateStatusTestimonyController");
  const {id} =req.params
  const status=req.query.status
  try{
const existingTestimony =await testimonials.findById({_id:id})
existingTestimony.status=status
await existingTestimony.save()
res.status(200).json(existingTestimony)

  }catch(err){
        res.status(401).jwon(err)
    }
}
