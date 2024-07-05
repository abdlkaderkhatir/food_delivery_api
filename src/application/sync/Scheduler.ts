import cron from 'node-cron';
import syncWithDataServer from './SyncService';

const startScheduler =  async () :  Promise<void> => {
  cron.schedule('*/5 * * * *', async () => {
    try {
      await syncWithDataServer();
      console.log('Scheduled synchronization completed successfully');
    } catch (error) {
      console.error('Scheduled synchronization error:', error);
    }
  });
};

export default { startScheduler };
