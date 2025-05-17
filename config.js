const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  SESSION_ID: process.env.SESSION_ID || "SLG-MD~QEqePnKX",
OWNER: process.env.NUMERO_OWNER || "237620066719", 
STATUS: process.env.LECTURE_AUTO_STATUS || "oui", 
 PREFIX: process.env.PREFIX || "null",
   MODE: process.env.MODE || "prive",
ZONE_DE_TEMPS: process.env.ZONE_DE_TEMPS || "Africa/Lagos",
   Db: process.env.Db || "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
};