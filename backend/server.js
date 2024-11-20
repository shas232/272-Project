const app = require('./app');  // Import the app configuration from app.js

// Environment variable for the port, defaulting to 5000
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
