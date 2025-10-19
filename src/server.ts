import express from 'express';
import authRoutes from './routes/authRoutes.ts';
import userRoutes from './routes/userRoutes.ts';
import habitRoutes from './routes/habitRoutes.ts';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { isTest } from '../env.ts';

// Create Express application
const app = express()

// Middleware setup
app.use(helmet()) // Security middleware
app.use(cors()) // Enable CORS
app.use(express.json()) // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })) // Parse URL-encoded request bodies
app.use(morgan('dev', { skip: () => isTest() })) // Logging middleware

// Health check endpoint - always good to have!
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'Habit Tracker API',
  })
})

// app.use() is used to register middleware in an Express app.
// Middleware are functions that run before the route handler, 
// and can modify req, res, or end the request.

// Mount routers with base paths
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/habits', habitRoutes)

// Export the app for use in other modules (like tests)
export { app }

// Default export for convenience
export default app