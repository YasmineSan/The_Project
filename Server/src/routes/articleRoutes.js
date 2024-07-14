const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");
const authenticateToken = require("../middleware/authenticateToken");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "image/webp",
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/svg+xml",
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"), false);
    }
  },
});

// Routes publiques
router.get("/public/articles", articleController.getAllArticles); // Make sure getAllArticles exists
router.get("/article/:id/price", articleController.getArticlePrice); // Make sure getArticlePrice exists
router.get("/article/:id", articleController.getArticleById); // Make sure getArticleById exists
router.get("/prices", articleController.getAllArticlePrices); // Make sure getAllArticlePrices exists
router.get(
  "/categories/:categoryId/prices",
  articleController.getCategoryArticlePrices,
); // Make sure getCategoryArticlePrices exists
router.get("/user/:userId/articles", articleController.getArticlesByUserId); // Make sure getArticlesByUserId exists
router.get("/available-articles", articleController.getAvailableArticles); // Make sure getAvailableArticles exists
router.get("/article/:articleId/price", articleController.getArticlePrice);
router.get("/article/:id/price", articleController.getArticlePrice);


// Routes avec authentification
router.get(
  "/user/evaluations",
  authenticateToken,
  articleController.getAllEvaluationsByUser,
); // Make sure getAllEvaluationsByUser exists
router.get(
  "/user/articles",
  authenticateToken,
  articleController.getAllArticlesByUser,
); // Make sure getAllArticlesByUser exists
router.post(
  "/",
  authenticateToken,
  upload.single("article_photo"),
  articleController.addArticle,
); // Make sure addArticle exists
router.post(
  "/:id/evaluations",
  authenticateToken,
  articleController.addEvaluation,
); // Make sure addEvaluation exists
router.put(
  "/:articleId",
  authenticateToken,
  upload.single("article_photo"),
  articleController.updateArticle,
); // Make sure updateArticle exists
router.delete("/:id", authenticateToken, articleController.deleteArticle); // Make sure deleteArticle exists
router.delete(
  "/:articleId/evaluations/:evaluationId",
  authenticateToken,
  articleController.deleteEvaluation,
); // Make sure deleteEvaluation exists

module.exports = router;
