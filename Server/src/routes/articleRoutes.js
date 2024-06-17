const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');
const authenticateToken = require('../middleware/authenticateToken');

// Routes publiques
router.get('/', articleController.getAllArticles);

// Routes avec authentification
router.get('/user/evaluations', authenticateToken, articleController.getAllEvaluationsByUser);
router.post('/:id/evaluations', authenticateToken, articleController.addEvaluation);
router.put('/:articleId/evaluations/:evaluationId', authenticateToken, articleController.updateEvaluation);
router.delete('/:articleId/evaluations/:evaluationId', authenticateToken, articleController.deleteEvaluation);

module.exports = router;
