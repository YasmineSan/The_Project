const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
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

router.get('/', userController.getAllUsers);
router.post('/register', upload.single('profile_image'), userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/dashboard', authenticateToken, userController.getUserInfo);
router.post('/update', authenticateToken, upload.single('profile_image'), userController.updateUser);

// Ajouter des routes pour les articles sous un préfixe distinct
router.post('/articles', authenticateToken, upload.single('article_photo'), articleController.addArticle);
router.get('/articles', authenticateToken, articleController.getAllArticlesByUser);

module.exports = router;
