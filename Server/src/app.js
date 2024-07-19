const express = require("express");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");

const app = express();

// Middleware to secure HTTP headers
app.use(helmet());

// CORS Middleware
const allowedOrigins = [
  "https://ecommerce-craftify.netlify.app",
  "https://669a9a2052b089781bc885d7--ecommerce-craftify.netlify.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Middleware to parse JSON and URL-encoded requests
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Middleware to capture raw body of requests
app.use(express.json({
  limit: "5mb",
  verify: (req, _res, buf) => {
    req.rawBody = buf.toString();
  }
}));

// Add Access-Control headers to all responses
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Explicitly handle preflight OPTIONS requests
app.options('*', (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.sendStatus(200);
});

// Import and use routes
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

