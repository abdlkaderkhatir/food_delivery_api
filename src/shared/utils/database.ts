import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { log } from 'console';
import { populateInitialData } from '../initialData';
import Scheduler from '../../application/sync/Scheduler';
import { loginUsers } from '../initialUserData';
import {config} from "../../config"

// dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });


export class Database {

  // private readonly MONGO_URI = process.env.MONGO_URI!;
  private readonly MONGO_URI = config.db.mongoUri;

  private static instance: Database;

  private constructor() {}

  public static getInstance() : Database {
    if (!Database.instance) {
        Database.instance = new Database();
    }
    return Database.instance;
  }



  public async connectToDatabase() : Promise<void> {
    try {
      await mongoose.connect(this.MONGO_URI as string).
      then(async ()  => {
          console.log('Connected to database');
          await loginUsers();
          await populateInitialData();
          Scheduler.startScheduler().then(() => {
            console.log('Scheduler started');
          });
          // console.log('Connected to database');
      });
    } catch (error) {
      console.log('Error connecting to database: ', error);
      process.exit(1);
    }
  }

  public async disconnectFromDatabase() {
    try {
      await mongoose.disconnect();
      // logger.info('Disconnected from database');
    } catch (error) {
      // logger.error('Error disconnecting from database: ', error);
    }
  }

  public async dropDatabase() {
    try {
      await mongoose.connection.dropDatabase();
      // logger.info('Dropped database');
    } catch (error) {
      // logger.error('Error dropping database: ', error);
    }
  }

  public async clearDatabase() {
    try {
      const collections = mongoose.connection.collections;
      for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany({});
      }
      // logger.info('Cleared database');
    } catch (error) {
      // logger.error('Error clearing database: ', error);
    }
  }

  public async closeConnection() {
    try {
      await mongoose.connection.close();
      // logger.info('Closed connection');
    } catch (error) {
      // logger.error('Error closing connection: ', error);
    }
  }
  
}


// export const connectToDatabase = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI!, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useCreateIndex: true,
//       useFindAndModify: false,
//     });
//     // logger.info('Connected to database');
//   } catch (error) {
//     // logger.error('Error connecting to database: ', error);
//   }
// };

