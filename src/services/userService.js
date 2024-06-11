// src/services/userService.js
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import readXlsxFile from 'read-excel-file/node';

// URL file spreadsheet yang dishare sebagai CSV
const GOOGLE_SPREADSHEET_URL = 'https://docs.google.com/spreadsheets/d/18gcr_1Eo1UwAPUrX1OE-xI_a7NGtwJrWlmw36DBciPY/export?format=xlsx';

const downloadSpreadsheet = async () => {
  const filePath = path.resolve(path.dirname('../data/users.xlsx'));
  const writer = fs.createWriteStream(filePath);
  
  try {
    const response = await axios({
      url: GOOGLE_SPREADSHEET_URL,
      method: 'GET',
      responseType: 'stream',
    });

    response.data.pipe(writer);
    
    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  } catch (error) {
    console.error('Error downloading spreadsheet:', error);
  }
};

const readUsersFromSpreadsheet = async () => {
  const filePath = path.resolve(path.dirname('../data/users.xlsx'));
  const rows = await readXlsxFile(filePath);
  const headers = rows.shift(); // Ambil header
  return rows.map(row => ({
    name: row[headers.indexOf('Nama')],
    phone: row[headers.indexOf('Nomor HP (628...)')],
    email: row[headers.indexOf('Email Aktif')],
  }));
};

const getUsers = async () => {
  await downloadSpreadsheet();
  return await readUsersFromSpreadsheet();
};

export {
  getUsers,
};