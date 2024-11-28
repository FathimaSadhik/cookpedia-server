const express =require('express')
const recipeController = require('../controllers/recipeController')
const testimonyController =require('../controllers/testimonyController')
const userController = require('../controllers/userController')
const downloadController =require('../controllers/downloadController')
const jwtMiddleware =require('../middlewares/jwtMiddleware')
const saveRecipeController = require('../controllers/saveRecipecontroller')
const router = new express.Router()

// allRecipes
router.get('/all-recipes',recipeController.getAllRecipesController)
// add testimony 
router.post('/add-testimony',testimonyController.addTestimonyController)
// add testimony 
router.post('/register',userController.registerController)
// login
 router.post('/login',userController.loginController)
//  view-single-recipe
router.get('/recipe/:id/view',jwtMiddleware,recipeController.getARecipesController)
// all related recipes
router.get('/related-recipes',jwtMiddleware,recipeController.getRelatedRecipeController)
// recipeId
router.post('/recipes/:recipeId/download',jwtMiddleware,downloadController.addRecipetoDownloadController)
//save recipe
router.post('/recipe/save',jwtMiddleware,saveRecipeController.addRecipeToSaveCollectionController) 
// all-saved-recipes
router.get('/all-saved-recipes',jwtMiddleware,saveRecipeController.getUserSavedRecipeController)
// saved-recipe/id/remove
router.delete('/saved-recipe/:id/remove',jwtMiddleware,saveRecipeController.removedSaveRecipeController)
// all-users
router.get('/all-users',jwtMiddleware,userController.getAllUserController)
// all-downloads
router.get('/all-downloads',jwtMiddleware,downloadController.allDownloadsController)
// all-testimony
router.get(`/all-testimony`,testimonyController.getAllTestimonyController)
// update-testimony
// testimony/id?status=Approved
router.get(`/testimony/:id`,jwtMiddleware,testimonyController.updateStatusTestimonyController)
// add-recipe
router.post('/add-recipe',jwtMiddleware,recipeController.addRecipeContoller)
// remove-recipe /recipe/${id}/remove
router.delete('/recipe/:id/remove',jwtMiddleware,recipeController.removeRecipeController)
// update-recipe
router.put(`/recipe/:id/edit`,jwtMiddleware,recipeController.editRecipeController)
module.exports =router