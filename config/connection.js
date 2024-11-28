 const mongoose =require("mongoose")

 const connectionString =process.env.DB_CONNECTION
  mongoose.connect(connectionString).then(res=>{
    console.log("Database connected successfully with SErver");
  }).catch(err=>{
    console.log("Database connection failed!!");
    console.log(err)
  })