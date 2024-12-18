import express from 'express';
import offices from './data/offices';
import cors from 'cors';
import { Office } from './types';

const app = express();

// Enable CORS
app.use(cors());

const port = process.env.PORT || 3000;

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
});

// Declare variables
const time = 30000
let requestCount = 0;
const originalOffices = JSON.parse(JSON.stringify(offices));
let responseOffices = JSON.parse(JSON.stringify(originalOffices));

// Function to update office data
const updateOfficeData = () => {
  responseOffices.forEach((office: Office) => {
    office.lines = office.lines.map(line => ({
      waiting: line.waiting + (Math.random() < 0.5 ? -1 : 1),
      elapsed: line.elapsed + (Math.random() < 0.5 ? -100 : 100)
    }));
  });
};

// Update office data every minute
setInterval(updateOfficeData, time);

// Routes
app.get('/offices', (req, res) => {
  requestCount++;

  if (requestCount <= 2) {
    // First and second requests - return original data unchanged
    res.json(originalOffices);
  } else {
    // Third request onwards - return updated data
    res.json(responseOffices);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
