import express from 'express';
import offices from './data/offices';
import cors from 'cors';
import { Office, Line } from './types';
import { Server } from 'socket.io';
import { createServer } from 'http';

const app = express();
const httpServer = createServer(app);

// Set ports
const port = process.env.PORT || 3000;
const wsPort = process.env.WS_PORT || 3001;

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
  path: '/socket.io',
  transports: ['websocket', 'polling'],
});

// Enable CORS
app.use(cors());

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
});

// Declare variables
const time = 60000;
const originalOffices = JSON.parse(JSON.stringify(offices));
let responseOffices = JSON.parse(JSON.stringify(originalOffices));

// Function to update office data
const updateOfficeData = () => {
  responseOffices.forEach((office: Office) => {
    office.lines = office.lines.map((line: Line) => {
      const waitingAdjustment = Math.random() < 0.5 ? -1 : 1;
      const newWaiting = Math.max(0, line.waiting + waitingAdjustment);
      const averageTimePerPerson = 100;
      const newElapsed = Math.max(0, newWaiting * averageTimePerPerson);

      return {
        ...line,
        waiting: newWaiting,
        elapsed: newElapsed
      };
    });
  });
  
  // Emit updated data to all connected clients
  console.log('Emitting updated office data');
  io.emit('officesUpdate', responseOffices);
};

// Socket connection handler
io.on('connection', (socket) => {
  console.log('Client connected');
  socket.emit('officesUpdate', responseOffices);
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Update office data every minute
setInterval(updateOfficeData, time);

// Routes
app.get('/offices', (req, res, next) => {
  try {
    if (responseOffices.length === 0) {
      res.status(404).json({ message: 'No se encontraron oficinas' });
    } else {
      res.json(responseOffices);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Servicio no disponible');
});

// Start the HTTP server
app.listen(port, () => {
  console.log(`HTTP Server running on port ${port}`);
});

// Start the WebSocket server
httpServer.listen(wsPort, () => {
  console.log(`WebSocket Server running on port ${wsPort}`);
});