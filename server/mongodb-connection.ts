import mongoose from 'mongoose';
import { discordLogger } from './discord-logger';

class MongoDBConnection {
  private static instance: MongoDBConnection;
  private isConnected: boolean = false;
  private connectionAttempts: number = 0;
  private maxRetries: number = 5;
  private retryDelay: number = 5000; // 5 seconds

  private constructor() {}

  public static getInstance(): MongoDBConnection {
    if (!MongoDBConnection.instance) {
      MongoDBConnection.instance = new MongoDBConnection();
    }
    return MongoDBConnection.instance;
  }

  public async connect(): Promise<void> {
    if (this.isConnected) {
      return;
    }

    const connectionString = process.env.MONGODB_CONNECTION_STRING;
    
    if (!connectionString) {
      const error = new Error('MongoDB connection string not found in environment variables');
      console.error(error.message);
      await discordLogger.logError(error, 'MongoDB Configuration');
      throw error;
    }

    try {
      await this.attemptConnection(connectionString);
    } catch (error) {
      console.error('Failed to establish MongoDB connection after all retries');
      await discordLogger.logError(
        error instanceof Error ? error : new Error(String(error)),
        'MongoDB Connection Failed'
      );
      throw error;
    }
  }

  private async attemptConnection(connectionString: string): Promise<void> {
    while (this.connectionAttempts < this.maxRetries && !this.isConnected) {
      try {
        this.connectionAttempts++;
        console.log(`Attempting MongoDB connection... (${this.connectionAttempts}/${this.maxRetries})`);

        await mongoose.connect(connectionString, {
          maxPoolSize: 10, // Maintain up to 10 socket connections
          serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
          socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
          bufferCommands: false // Disable mongoose buffering
        });

        this.isConnected = true;
        console.log('Successfully connected to MongoDB');
        await discordLogger.logServerEvent(
          'MongoDB Connected',
          `Successfully connected to MongoDB on attempt ${this.connectionAttempts}`
        );

        this.setupEventHandlers();
        break;

      } catch (error) {
        console.error(`MongoDB connection attempt ${this.connectionAttempts} failed:`, error);
        
        if (this.connectionAttempts >= this.maxRetries) {
          throw new Error(`Failed to connect to MongoDB after ${this.maxRetries} attempts: ${error}`);
        }

        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, this.retryDelay));
      }
    }
  }

  private setupEventHandlers(): void {
    mongoose.connection.on('connected', async () => {
      this.isConnected = true;
      console.log('MongoDB connection established');
      await discordLogger.logServerEvent('MongoDB Status', 'Connection established');
    });

    mongoose.connection.on('error', async (error) => {
      console.error('MongoDB connection error:', error);
      await discordLogger.logError(
        error instanceof Error ? error : new Error(String(error)),
        'MongoDB Connection Error'
      );
    });

    mongoose.connection.on('disconnected', async () => {
      this.isConnected = false;
      console.warn('MongoDB disconnected');
      await discordLogger.logServerEvent('MongoDB Status', 'Connection lost - attempting to reconnect');
      
      // Attempt to reconnect
      setTimeout(() => {
        if (!this.isConnected) {
          this.connectionAttempts = 0; // Reset attempts for reconnection
          this.connect().catch(console.error);
        }
      }, this.retryDelay);
    });

    mongoose.connection.on('reconnected', async () => {
      this.isConnected = true;
      console.log('MongoDB reconnected');
      await discordLogger.logServerEvent('MongoDB Status', 'Connection restored');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      if (this.isConnected) {
        await this.disconnect();
        process.exit(0);
      }
    });
  }

  public async disconnect(): Promise<void> {
    if (this.isConnected) {
      try {
        await mongoose.connection.close();
        this.isConnected = false;
        console.log('MongoDB connection closed');
        await discordLogger.logServerEvent('MongoDB Status', 'Connection closed gracefully');
      } catch (error) {
        console.error('Error closing MongoDB connection:', error);
        await discordLogger.logError(
          error instanceof Error ? error : new Error(String(error)),
          'MongoDB Disconnect Error'
        );
      }
    }
  }

  public getConnectionStatus(): boolean {
    return this.isConnected && mongoose.connection.readyState === 1;
  }

  public getConnection(): typeof mongoose.connection {
    if (!this.isConnected) {
      throw new Error('MongoDB not connected. Call connect() first.');
    }
    return mongoose.connection;
  }
}

// Export singleton instance
export const mongoConnection = MongoDBConnection.getInstance();

// Health check function
export function getMongoHealthStatus() {
  const connection = mongoose.connection;
  return {
    status: connection.readyState === 1 ? 'connected' : 'disconnected',
    readyState: connection.readyState,
    host: connection.host,
    name: connection.name,
    collections: Object.keys(connection.collections).length
  };
}