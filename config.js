const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  SESSION_ID: process.env.SESSION_ID || "SLG_MD=Hzw3BZ7S#PMwLmlAIWuJh9fzt-Unj_X2FS-AYcKQj4Q1v0wAixHk",
OWNER: process.env.NUMERO_OWNER || "237620066719", 
STATUS: process.env.LECTURE_AUTO_STATUS || "oui", 
 PREFIX: process.env.PREFIX || "null",
   MODE: process.env.MODE || "prive",
PRESENCE: process.env.PRESENCE || "audio", // online , ecrit, audio ou mettez non si vous ne désirez aucune des options
ZONE_DE_TEMPS: process.env.ZONE_DE_TEMPS || "Africa/Lagos",
};