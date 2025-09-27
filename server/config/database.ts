import mongoose from 'mongoose';
import { env, isDevelopment } from './env';

/**
 * MongoDB connection configuration
 * Provides a singleton connection that can be reused throughout the application
 */
class DatabaseConnection {
  private static instance: DatabaseConnection;
  private isConnected: boolean = false;

  private constructor() {}

  /**
   * Get the singleton instance of DatabaseConnection
   */
  static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  /**
   * Connect to MongoDB
   * Uses environment variables for connection URI
   * Configures mongoose for development/production
   */
  async connect(): Promise<void> {
    if (this.isConnected) {
      console.log('📦 MongoDB already connected');
      return;
    }

    try {
      // Configure mongoose for better performance and debugging
      mongoose.set('strictQuery', false);
      
      if (isDevelopment) {
        mongoose.set('debug', true);
      }

      // Connect to MongoDB
      await mongoose.connect(env.MONGO_URI, {
        bufferCommands: false,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });

      this.isConnected = true;
      console.log('✅ MongoDB connected successfully');
      
      // Handle connection events
      mongoose.connection.on('error', (error) => {
        console.error('❌ MongoDB connection error:', error);
        this.isConnected = false;
      });

      mongoose.connection.on('disconnected', () => {
        console.warn('⚠️ MongoDB disconnected');
        this.isConnected = false;
      });

    } catch (error) {
      console.error('❌ MongoDB connection failed:', error);
      process.exit(1);
    }
  }

  /**
   * Disconnect from MongoDB
   * Useful for graceful application shutdown
   */
  async disconnect(): Promise<void> {
    if (!this.isConnected) {
      return;
    }

    try {
      await mongoose.disconnect();
      this.isConnected = false;
      console.log('✅ MongoDB disconnected successfully');
    } catch (error) {
      console.error('❌ Error disconnecting from MongoDB:', error);
    }
  }

  /**
   * Check if connected to MongoDB
   */
  getConnectionStatus(): boolean {
    return this.isConnected && mongoose.connection.readyState === 1;
  }
}

/**
 * Export singleton instance for use throughout the application
 */
export const database = DatabaseConnection.getInstance();

/**
 * Graceful shutdown handler
 * Ensures database connection is closed when application exits
 */
process.on('SIGINT', async () => {
  console.log('\n🛑 Received SIGINT. Graceful shutdown...');
  await database.disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Received SIGTERM. Graceful shutdown...');
  await database.disconnect();
  process.exit(0);
});