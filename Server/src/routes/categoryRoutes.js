const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

// Routes pour la gestion des catégories
router.post("/", categoryController.addCategory);
router.get("/", categoryController.getAllCategories);
router.put("/:categoryId", categoryController.updateCategory);
router.delete("/:categoryId", categoryController.deleteCategory);

module.exports = router;
