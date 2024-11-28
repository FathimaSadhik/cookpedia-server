const recipes =require('../models/recipeModel')


// getAllRecipes
exports.getAllRecipesController =async(req,res)=>{
    console.log("inside getAllRecipesController");
    
    
    try{
        const allRecipes = await recipes.find()
        res.status(200).json(allRecipes)
    }catch(err){
        res.status(401).json(err)
    }
}

// getsingleRecipe
exports.getARecipesController =async(req,res)=>{
    console.log("inside getARecipesController");
    const {id}=req.params
    try{
        const viewRecipes = await recipes.findOne({_id:id})
        res.status(200).json(viewRecipes)
    }catch(err){
        res.status(401).json(err)
    }


}

// related recipes?cuisine =Italian
 exports.getRelatedRecipeController=async(req,res)=>{
    console.log("Inside getRelatedRecipeContoller");
    const searchCuisine =req.query.cuisine
    const query={
        cuisine:{
            $regex:searchCuisine,$options:"i"
        }
    }
    try{
        const allRelatedRecipes = await recipes.find(query)
        res.status(200).json(allRelatedRecipes)
    }catch(err){
        res.status(401).json(err)
    }
 }

//  addRecipe
exports.addRecipeContoller =async(req,res)=>{
    console.log("inside addRecipeContoller");
    const {name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType}=req.body
    try{
 const existingRecipe = await recipes.findOne({name})
 if(existingRecipe){
    res.status(406).json("Recipe Alreday Exist!!!! Please add Another")
 }else{
    const newRecipe = new recipes({
        name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType
    })
    await newRecipe.save()
    res.status(200).json(newRecipe)
 }
    }catch(err){
        res.status(401).json(err)
    }
}
// editrecipe
exports.editRecipeController =async (req,res)=>{
    console.log("Inside EditRecipeController");
    const {name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType}=req.body
    const {id}=req.params
    try{
        const updateRecipe =await recipes.findByIdAndUpdate({_id:id},{
            name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType 
        },{new:true})
        await updateRecipe.save()
        res.status(200).json(updateRecipe)
        }catch(err){
        res.status(401).json(err)
    }
    
}

// remove recipe
exports.removeRecipeController =async(req,res)=>{
console.log("inside removeREcipeController");
const {id}=req.params
try{
const removeItem = await recipes.findByIdAndDelete({_id:id})
res.status(200).json(removeItem)
}catch(err){
res.status(401).json(err)
}
}