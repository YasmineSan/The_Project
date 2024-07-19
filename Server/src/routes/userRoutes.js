const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authenticateToken = require("../middleware/authenticateToken");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // Limite de 50MB
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

// Routes utilisateur
router.get("/", userController.getAllUsers);
router.post(
  "/register",
  upload.single("profile_image"),
  userController.registerUser,
);
router.post("/login", userController.loginUser);
router.get("/dashboard", authenticateToken, userController.getUserInfo);
router.get("/:userId", userController.getUserById); // Route publique pour obtenir un utilisateur par ID
router.put(
  "/update/:userId",
  authenticateToken,
  upload.single("profile_image"),
  userController.updateUser,
);

module.exports = router;
