import { DatabaseStorage } from './storage';
import { MongoDBStorage } from './mongodb-storage';
import { mongoConnection } from './mongodb-connection';
import { discordLogger } from './discord-logger';

// Storage configuration
export class StorageManager {
  private static instance: StorageManager;
  private currentStorage: DatabaseStorage | MongoDBStorage;
  private useMongoAsPrimary: boolean = false;

  private constructor() {
    // Start with PostgreSQL as default
    this.currentStorage = new DatabaseStorage();
  }

  public static getInstance(): StorageManager {
    if (!StorageManager.instance) {
      StorageManager.instance = new StorageManager();
    }
    return StorageManager.instance;
  }

  public async initialize(): Promise<void> {
    try {
      // Check if MongoDB connection is available and working
      if (process.env.MONGODB_CONNECTION_STRING) {
        try {
          // Test MongoDB connection
          const mongoHealthy = mongoConnection.getConnectionStatus();
          if (mongoHealthy) {
            console.log('MongoDB is connected and healthy, enabling MongoDB storage');
            this.currentStorage = new MongoDBStorage();
            this.useMongoAsPrimary = true;
            await discordLogger.logServerEvent(
              'Storage Configuration',
              'Using MongoDB as primary storage'
            );
          } else {
            console.log('MongoDB connection not ready, using PostgreSQL as primary storage');
            await discordLogger.logServerEvent(
              'Storage Configuration', 
              'Using PostgreSQL as primary storage (MongoDB not ready)'
            );
          }
        } catch (error) {
          console.warn('MongoDB not available, falling back to PostgreSQL:', error);
          await discordLogger.logServerEvent(
            'Storage Configuration',
            `MongoDB unavailable, using PostgreSQL. Error: ${error}`
          );
        }
      } else {
        console.log('MongoDB connection string not provided, using PostgreSQL');
        await discordLogger.logServerEvent(
          'Storage Configuration',
          'Using PostgreSQL (no MongoDB connection string provided)'
        );
      }
    } catch (error) {
      console.error('Error initializing storage:', error);
      await discordLogger.logError(
        error instanceof Error ? error : new Error(String(error)),
        'Storage Initialization'
      );
      // Fallback to PostgreSQL
      this.currentStorage = new DatabaseStorage();
      this.useMongoAsPrimary = false;
    }
  }

  public getStorage(): DatabaseStorage | MongoDBStorage {
    return this.currentStorage;
  }

  public isUsingMongoDB(): boolean {
    return this.useMongoAsPrimary;
  }

  public async switchToMongoDB(): Promise<boolean> {
    try {
      if (!mongoConnection.getConnectionStatus()) {
        await mongoConnection.connect();
      }
      
      this.currentStorage = new MongoDBStorage();
      this.useMongoAsPrimary = true;
      
      console.log('Switched to MongoDB storage');
      await discordLogger.logServerEvent('Storage Switch', 'Switched to MongoDB storage');
      return true;
    } catch (error) {
      console.error('Failed to switch to MongoDB:', error);
      await discordLogger.logError(
        error instanceof Error ? error : new Error(String(error)),
        'MongoDB Storage Switch Failed'
      );
      return false;
    }
  }

  public switchToPostgreSQL(): void {
    this.currentStorage = new DatabaseStorage();
    this.useMongoAsPrimary = false;
    console.log('Switched to PostgreSQL storage');
    discordLogger.logServerEvent('Storage Switch', 'Switched to PostgreSQL storage');
  }

  public async getStorageStatus() {
    return {
      primary: this.useMongoAsPrimary ? 'MongoDB' : 'PostgreSQL',
      mongoConnected: mongoConnection.getConnectionStatus(),
      mongoHealth: mongoConnection.getConnectionStatus() ? 'healthy' : 'disconnected'
    };
  }
}

// Export singleton instance
export const storageManager = StorageManager.getInstance();