// src/services/pollutionService.js
import cron from 'cron';
import axios from 'axios';
import { pollutionLimits } from '../config/config.js';

let pollutionData = [];

const fetchDataFromAPI = async () => {
  // Ubah dengan URL API polusi aktual jika ada
  try {
    const airQuality = await axios.get('https://api.example.com/air-quality');
    const waterQuality = await axios.get('https://api.example.com/water-quality');
    const noiseLevel = await axios.get('https://api.example.com/noise-level');
    pollutionData = {
      airQuality: airQuality.data.value,
      waterQuality: waterQuality.data.value,
      noiseLevel: noiseLevel.data.value
    };
  } catch (error) {
    console.error('Error fetching pollution data:', error);
    generateRandomData();
  }
};

const generateRandomData = () => {
  pollutionData = [
    {
      location: 'Universitas Gadjah Mada',
      airQuality: Math.floor(Math.random() * 150),
      waterQuality: Math.floor(Math.random() * 100),
      noiseLevel: Math.floor(Math.random() * 100),
    },
    // Tambahkan lokasi lain jika perlu
  ];
};

const checkPollutionLevels = () => {
  return pollutionData.filter((entry) => {
    return (
      entry.airQuality > pollutionLimits.airQuality ||
      entry.waterQuality > pollutionLimits.waterQuality ||
      entry.noiseLevel > pollutionLimits.noiseLevel
    );
  });
};

// Schedule to fetch data every half of hour
const job = new cron.CronJob('*/5 * * * *', generateRandomData);
job.start();

export {
  fetchDataFromAPI,
  checkPollutionLevels,
  pollutionData,
};