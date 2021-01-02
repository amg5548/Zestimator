const express = require('express');
const zestimate = require('./routes/zestimate');
const cors = require('cors');

const port = process.env.SNOWPACK_PUBLIC_PORT || 2001;

// Initialize express app
const app = express();

// Apply express middleware
app.use(express.json());
app.use(cors());

// Initialize express routes
app.use('/api', zestimate);

// Start express server
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
