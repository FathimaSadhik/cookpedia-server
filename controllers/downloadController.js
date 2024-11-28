const downloads =require('../models/downloadModel')


// add
exports.addRecipetoDownloadController =async(req,res)=>{
    console.log("inside addRecipetoDownloadContoller");
    const {recipeId} =req.params
    const {name,cuisine} =req.body
    try{
        const existingRecipe =await downloads.findOne({recipeId})
        if(existingRecipe){
            existingRecipe.count +=1
            await existingRecipe.save()
            res.status(200).json(existingRecipe)
        }else{
            const newDownloadRecipe = new downloads({
                recipeId,recipeName:name,recipeCuisine:cuisine,count:1
            })
            await newDownloadRecipe.save()
            res.status(200).json(newDownloadRecipe)
        }
    }catch(err){
        res.status(401).json(err)
    }
}
// get all downloads
exports.allDownloadsController =async(req,res)=>{
    console.log("Inside allDownloadsController");
    try{
        const allDownloads =await downloads.find()
        res.status(200).json(allDownloads)
    }catch(err){
res.status(401).json(err)
    }
}