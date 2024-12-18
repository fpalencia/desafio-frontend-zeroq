import express from 'express';
import offices from './data/offices';
import cors from 'cors';
import { Office, Line } from './types';

const app = express();

// Enable CORS
app.use(cors());

// Set the port
const port = process.env.PORT || 3000;

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
});

// Declare variables
const time = 30000
const originalOffices = JSON.parse(JSON.stringify(offices));
let responseOffices = JSON.parse(JSON.stringify(originalOffices));

// Function to update office data
const updateOfficeData = () => {
  responseOffices.forEach((office: Office) => {// Iterate over each office
    office.lines = office.lines.map((line: Line) => {// Iterate over each line
      const waitingAdjustment = Math.random() < 0.5 ? -1 : 1; // Randomly increase or decrease the waiting time
      const newWaiting = Math.max(0, line.waiting + waitingAdjustment); // Ensure waiting time is not negative
      const averageTimePerPerson = 100; // Define an average time per person
      const newElapsed = Math.max(0, newWaiting * averageTimePerPerson); // Calculate the new elapsed time

      return {
        waiting: newWaiting,
        elapsed: newElapsed
      };
    });
  });
};

// Update office data every minute
setInterval(updateOfficeData, time);

// Routes
app.get('/offices', (req, res, next) => {
  try {
    if (responseOffices.length === 0) {
      res.status(404).json({ message: 'No se encontraron oficinas' });
    } else {
      res.set('Custom-Header', 'CustomHeaderValue'); // Set a custom header
      res.json(responseOffices);
    }
  } catch (error) {
    console.error(error);
    next(error); // Pass the error to the error handling middleware
  }
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Servicio no disponible');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
