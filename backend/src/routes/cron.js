import cron from "cron";
import { User } from "../db/models/user.js";

// Define a function to clear the daily cart
const clearDailyCart = async () => {
  try {
    const currentDate = new Date();
    await User.updateMany({}, { $set: { dailyCart: [] } });
    console.log(`Cleared daily cart for all users on ${currentDate}.`);
  } catch (error) {
    console.error(error);
  }
};

// Define a cron job to run every day at 0:00
const job = new cron.CronJob("0 0 * * *", clearDailyCart);

// Start the cron job
job.start();
export default job;
