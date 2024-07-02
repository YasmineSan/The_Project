const express = require('express');
const router = express.Router();
const evaluationController = require('../controllers/evaluationController');

// Obtenir toutes les évaluations
router.get('/', evaluationController.getAllEvaluations);

// Ajouter une nouvelle évaluation
router.post('/', evaluationController.addEvaluation);

// Obtenir une évaluation par ID
router.get('/:id', evaluationController.getEvaluationById);

// Supprimer une évaluation par ID
router.delete('/:id', evaluationController.deleteEvaluationById);

module.exports = router;
