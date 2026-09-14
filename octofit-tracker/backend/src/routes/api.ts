import { Router } from 'express';
import database from '../config/database.js';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js';

const apiRouter = Router();

apiRouter.get('/health', (_request, response) => {
  response.json({ service: 'octofit-tracker-api', status: 'ok' });
});

apiRouter.get('/database', (_request, response) => {
  response.json({ status: database.readyState === 1 ? 'connected' : 'disconnected' });
});

apiRouter.get('/users', async (_request, response, next) => {
  try {
    response.json(await User.find().select('-passwordHash').lean());
  } catch (error) {
    next(error);
  }
});

apiRouter.get('/teams', async (_request, response, next) => {
  try {
    response.json(await Team.find().populate('members', 'username email').lean());
  } catch (error) {
    next(error);
  }
});

apiRouter.get('/activities', async (_request, response, next) => {
  try {
    response.json(await Activity.find().sort({ completedAt: -1 }).lean());
  } catch (error) {
    next(error);
  }
});

apiRouter.get('/leaderboard', async (_request, response, next) => {
  try {
    response.json(await LeaderboardEntry.find().sort({ rank: 1 }).populate('userId', 'username').lean());
  } catch (error) {
    next(error);
  }
});

apiRouter.get('/workouts', async (_request, response, next) => {
  try {
    response.json(await Workout.find().lean());
  } catch (error) {
    next(error);
  }
});

export default apiRouter;