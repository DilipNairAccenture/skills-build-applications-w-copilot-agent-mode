import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import database, { connectDatabase } from './config/database.js';

const app = express();
const port = Number(process.env.PORT || 8000);

app.use(cors());
app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ service: 'octofit-tracker-api', status: 'ok' });
});

app.get('/api/database', (_request, response) => {
  response.json({ status: database.readyState === 1 ? 'connected' : 'disconnected' });
});

async function startServer() {
  await connectDatabase();
  app.listen(port, () => {
    console.log(`OctoFit Tracker API listening on port ${port}`);
  });
}

startServer().catch((error) => {
  console.error('Unable to start OctoFit Tracker API:', error);
  process.exit(1);
});