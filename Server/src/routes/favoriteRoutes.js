const express = require("express");
const router = express.Router();
const favoriteController = require("../controllers/favoriteController");
const authenticateToken = require("../middleware/authenticateToken");

// Routes pour la gestion des favoris
router.post("/", authenticateToken, favoriteController.addFavorite);
router.get("/user", authenticateToken, favoriteController.getUserFavorites);
router.delete(
  "/:articleId",
  authenticateToken,
  favoriteController.deleteFavorite,
);

module.exports = router;
