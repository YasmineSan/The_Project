const app = require('./app');
const dotenv = require('dotenv');
const { poolPromise } = require('./utils/db');

dotenv.config();

const PORT = process.env.PORT || 3001;

app.listen(PORT, async () => {
  try {
    await poolPromise;
    console.log(`Server is running on port ${PORT}`);
  } catch (err) {
    console.error('Failed to connect to the database:', err);
    process.exit(1);
  }
});
