const express = require("express");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");

const app = express();

// Middleware pour sécuriser les en-têtes HTTP
app.use(helmet());

// Middleware pour gérer les CORS
app.use(cors({
  origin: ["https://ecommerce-craftify.netlify.app"],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Middleware pour parser les requêtes JSON et URL-encoded
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Middleware pour capturer le corps brut des requêtes
app.use(express.json({
  limit: "5mb",
  verify: (req, _res, buf) => {
    req.rawBody = buf.toString();
  }
}));

// Ajout des en-têtes de contrôle d'accès pour toutes les réponses
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://ecommerce-craftify.netlify.app");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Importer et utiliser les routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/articles", require("./routes/articleRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/api/email", require("./routes/emailRoutes"));
app.use("/api/evaluation", require("./routes/evaluationRoutes"));
app.use("/api/favorite", require("./routes/favoriteRoutes"));
app.use("/api/order", require("./routes/orderRoutes"));
app.use("/api/payment", require("./routes/paymentRoutes"));
app.use("/api/webhook", require("./routes/webhookRoutes"));

// Serve HTML files
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "register.html"));
});

app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "dashboard.html"));
});

app.get("/profile", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "profile.html"));
});

app.get("/", (req, res) => {
  res.send('<h1>Welcome</h1><a href="/login">Login</a> or <a href="/register">Register</a>');
});

module.exports = app;

