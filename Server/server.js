const express = require('express'); 
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000; // use the variable envirronment or a port 3000


//pour ouvrir le server npm start 
app.listen(PORT, function() {
    console.log(`Server is running now at ${PORT}`);
})
