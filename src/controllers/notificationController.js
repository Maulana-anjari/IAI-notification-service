// src/controllers/notificationController.js
import { checkPollutionLevels } from '../services/pollutionService.js';
import { sendEmail, sendSMS, sendWhatsApp } from '../services/notificationService.js';
import User from '../models/user.js';
import { getUsers } from '../services/userService.js';
import { pollutionLimits } from '../config/config.js';

const notifyUsers = async () => {
  try {
    const users = await User.find();
    const sheetUsers = await getUsers();
    const alerts = checkPollutionLevels();
    const allUsers = [...users, ...sheetUsers];

    for (const alert of alerts) {
      for (const user of allUsers) {
        const message = `Hello ${user.name}, Warning: High levels of ${alert.airQuality > pollutionLimits.airQuality ? 'Air Quality' : alert.waterQuality > pollutionLimits.waterQuality ? 'Water Quality' : 'Noise Level'} detected in ${alert.location}.`;

        // gausah pake dulu, syulit
        // await sendEmail(user.email, 'Pollution Alert', message);
        // await sendWhatsApp(user.phone, message);
        await sendSMS(user.phone, message);
      }
    }
  } catch (error) {
    console.error('Error sending notifications:', error);
  }
};

export {
  notifyUsers,
};
