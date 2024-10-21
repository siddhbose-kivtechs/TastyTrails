import { Router } from "express";
import UserController from "../Controllers/UserController.js";
import RecipeController from "../Controllers/RecipeController.js";
import authenticateToken from "../middleware/auth.js";
import rateLimit from 'express-rate-limit';

const router = Router();

// Rate limiter: maximum of 100 requests per 15 minutes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});


// Get Requests
router.get('/usernames', limiter, UserController.getAllUserName)
router.get('/token', authenticateToken ,UserController.verifyUserByToken)
router.get("/recipes", RecipeController.allRecipe)
// added route to get previous comments
router.get('/recipe/getcomments/:recipeId', RecipeController.getComments)

// Post Requests
router.post('/signup', UserController.Signup)
router.post('/login', UserController.Login)
router.post('/recipe/add', authenticateToken, RecipeController.addRecipe)
router.post('/recipe/update', authenticateToken, RecipeController.updateRecipe)
router.post('/recipe/readall', authenticateToken, RecipeController.getOneUserRecipes)
router.post('/recipe/delete', authenticateToken, RecipeController.deleteRecipe)
// added route to add new comment to database
router.post("/recipe/addcomment",authenticateToken, RecipeController.addComment)
router.post('/feedback', UserController.Sendcontactmail);

export default router;
