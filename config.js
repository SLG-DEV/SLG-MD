const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  SESSION_ID: process.env.SESSION_ID || "SLG-MD~Wsw1ugCC",
OWNER: process.env.NUMERO_OWNER || "", 
STATUS: process.env.LECTURE_AUTO_STATUS || "oui", 
 PREFIX: process.env.PREFIX || ",",
   MODE: process.env.MODE || "public",
PRESENCE: process.env.PRESENCE || "écrit",
};