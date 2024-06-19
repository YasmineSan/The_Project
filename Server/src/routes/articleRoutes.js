const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');
const authenticateToken = require('../middleware/authenticateToken');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/webp', 'image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type'), false);
        }
    }
});

// Routes publiques
router.get('/', articleController.getAllArticles);
router.get('/:articleId/price', articleController.getArticlePrice);
router.get('/prices', articleController.getAllArticlePrices);
router.get('/categories/:categoryId/prices', (req, res, next) => {
    console.log(`Received request for category: ${req.params.categoryId}`);
    next();
}, articleController.getCategoryArticlePrices);
router.get('/test/categories/:categoryId/prices', articleController.getCategoryArticlePrices);

// Routes avec authentification
router.get('/user/evaluations', authenticateToken, articleController.getAllEvaluationsByUser);
router.get('/user/articles', authenticateToken, articleController.getAllArticlesByUser);
router.post('/', authenticateToken, upload.single('article_photo'), articleController.addArticle);
router.post('/:id/evaluations', authenticateToken, articleController.addEvaluation);
router.put('/:articleId', authenticateToken, upload.single('article_photo'), articleController.updateArticle);
router.delete('/:articleId/evaluations/:evaluationId', authenticateToken, articleController.deleteEvaluation);

module.exports = router;
