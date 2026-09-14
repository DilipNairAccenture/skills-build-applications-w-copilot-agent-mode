import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js';

/**
 * Replaces the OctoFit test dataset in octofit_db with users, teams, activities,
 * leaderboard entries, and recommended workouts.
 */
const userIds = {
  alex: new mongoose.Types.ObjectId('64a000000000000000000001'),
  jamie: new mongoose.Types.ObjectId('64a000000000000000000002'),
  taylor: new mongoose.Types.ObjectId('64a000000000000000000003'),
};

async function seedDatabase() {
  try {
    await connectDatabase();

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    await User.insertMany([
      {
        _id: userIds.alex,
        username: 'alex.morgan',
        email: 'alex.morgan@example.com',
        passwordHash: 'seeded-password-hash',
      },
      {
        _id: userIds.jamie,
        username: 'jamie.lee',
        email: 'jamie.lee@example.com',
        passwordHash: 'seeded-password-hash',
      },
      {
        _id: userIds.taylor,
        username: 'taylor.chen',
        email: 'taylor.chen@example.com',
        passwordHash: 'seeded-password-hash',
      },
    ]);

    await Team.insertMany([
      { name: 'Summit Sprinters', members: [userIds.alex, userIds.jamie] },
      { name: 'Trail Blazers', members: [userIds.taylor, userIds.alex] },
    ]);

    await Activity.insertMany([
      { userId: userIds.alex, type: 'Run', durationMinutes: 35, completedAt: new Date('2026-09-12') },
      { userId: userIds.jamie, type: 'Cycle', durationMinutes: 45, completedAt: new Date('2026-09-12') },
      { userId: userIds.taylor, type: 'Strength', durationMinutes: 30, completedAt: new Date('2026-09-13') },
      { userId: userIds.alex, type: 'Yoga', durationMinutes: 25, completedAt: new Date('2026-09-13') },
      { userId: userIds.jamie, type: 'Swim', durationMinutes: 40, completedAt: new Date('2026-09-14') },
    ]);

    await LeaderboardEntry.insertMany([
      { userId: userIds.alex, points: 420, rank: 1 },
      { userId: userIds.jamie, points: 365, rank: 2 },
      { userId: userIds.taylor, points: 310, rank: 3 },
    ]);

    await Workout.insertMany([
      {
        name: 'Foundations Flow',
        description: 'A steady full-body routine for building consistency.',
        difficulty: 'beginner',
        durationMinutes: 20,
      },
      {
        name: 'Tempo Builder',
        description: 'Intervals that improve cardiovascular endurance.',
        difficulty: 'intermediate',
        durationMinutes: 35,
      },
      {
        name: 'Power Circuit',
        description: 'A challenging circuit for strength and conditioning.',
        difficulty: 'advanced',
        durationMinutes: 45,
      },
    ]);

    console.log('Seeded 3 users, 2 teams, 5 activities, 3 leaderboard entries, and 3 workouts');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
