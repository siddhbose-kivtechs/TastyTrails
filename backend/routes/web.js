import { Router } from "express";
import UserController from "../Controllers/UserController.js";
import RecipeController from "../Controllers/RecipeController.js";
import authenticateToken from "../middleware/auth.js";
import rateLimit from 'express-rate-limit';

const router = Router();

// Rate limiter: maximum of 5 requests per minute
const loginLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // limit each IP to 5 requests per windowMs
});

// Get Requests
router.get('/usernames', UserController.getAllUserName)
router.get('/token', authenticateToken ,UserController.verifyUserByToken)
router.get("/recipes", RecipeController.allRecipe)
// added route to get previous comments
router.get('/recipe/getcomments/:recipeId', RecipeController.getComments)

// Post Requests
router.post('/signup', UserController.Signup)
router.post('/login', loginLimiter, UserController.Login)
router.post('/recipe/add', authenticateToken, RecipeController.addRecipe)
router.post('/recipe/update', authenticateToken, RecipeController.updateRecipe)
router.post('/recipe/readall', authenticateToken, RecipeController.getOneUserRecipes)
router.post('/recipe/delete', authenticateToken, RecipeController.deleteRecipe)
// added route to add new comment to database
router.post("/recipe/addcomment",authenticateToken, RecipeController.addComment)
router.post('/feedback', UserController.Sendcontactmail);

export default router;
