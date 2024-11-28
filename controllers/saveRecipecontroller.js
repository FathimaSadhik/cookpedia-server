const saveRecipes = require('../models/saveRecipeModel')


// add to save Collection
exports.addRecipeToSaveCollectionController = async (req,res)=>{
    console.log("Inside addRecipeToSaveCollectionController");
    const {id,name,cuisine,image} = req.body
    const userId =req.userId
    try{
        const existingRecipe = await saveRecipes.findOne({recipeId:id})
        if(existingRecipe){
            res.status(406).json("Selected recipe is already in your Collection.Please add another!!!")
        }else{
            const newRecipe =new saveRecipes({
                recipeId:id,name,cuisine,image,userId
            })
            await newRecipe.save()
            res.status(200).json(newRecipe)
        }
    }catch(err){
            res.status(401).json(err)
    }
}
// get saved recipe
exports.getUserSavedRecipeController =async(req,res)=>{
    console.log("inside getUserSaveRecipeContoller");
    const userId =req.userId
    try{
        const allSavedRecipe =await saveRecipes.find({userId})
        res.status(200).json(allSavedRecipe)
    }catch(err){
        res.status(401).json(err)
    }
}

// remove recipe from savedrecipe
exports.removedSaveRecipeController =async(req,res)=>{
    console.log("Inside removedSaveRecipeController");
    const {id} =req.params
    try{
        const removedRecipe =await saveRecipes.findByIdAndDelete({_id:id})
        res.status(200).json(removedRecipe)
    }catch(err){
        res.status(401).json(err)
    }
}