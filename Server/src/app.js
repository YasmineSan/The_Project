const express = require("express");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");

const app = express();

// Middleware pour sécuriser les en-têtes HTTP
app.use(helmet());

// Middleware pour gérer les CORS
app.use(
  cors({
    origin: "https://ecommerce-craftify.netlify.app/", // Remplace par l'origine de ton frontend déployé
  }),
);

// Middleware pour parser les requêtes JSON et URL-encoded
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Middleware pour capturer le corps brut des requêtes
app.use(
  express.json({
    limit: "5mb",
    verify: (req, _res, buf) => {
      req.rawBody = buf.toString();
    },
  }),
);

// Redirection HTTP vers HTTPS
app.use((req, res, next) => {
  if (req.secure) {
    next();
  } else {
    res.redirect(`https://${req.headers.host}${req.url}`);
  }
});

// Importer et utiliser les routes
app.use("/api/users", require("./src/routes/userRoutes"));
app.use("/api/articles", require("./src/routes/articleRoutes"));
app.use("/api/cart", require("./src/routes/cartRoutes"));
app.use("/api/categories", require("./src/routes/categoryRoutes"));
app.use("/api/email", require("./src/routes/emailRoutes"));
app.use("/api/evaluation", require("./src/routes/evaluationRoutes"));
app.use("/api/favorite", require("./src/routes/favoriteRoutes"));
app.use("/api/order", require("./src/routes/orderRoutes"));
app.use("/api/payment", require("./src/routes/paymentRoutes"));
app.use("/api/webhook", require("./src/routes/webhookRoutes"));

// Serve HTML files
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "src/views", "login.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "src/views", "register.html"));
});

app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "src/views", "dashboard.html"));
});

app.get("/profile", (req, res) => {
  res.sendFile(path.join(__dirname, "src/views", "profile.html"));
});

app.get("/", (req, res) => {
  res.send(
    '<h1>Welcome</h1><a href="/login">Login</a> or <a href="/register">Register</a>',
  );
});

module.exports = app;
