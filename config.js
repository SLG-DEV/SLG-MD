const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  SESSION_ID: process.env.SESSION_ID || "SLG-MD~G9Fnsffz",
OWNER: process.env.NUMERO_OWNER || "237620066719", 
STATUS: process.env.LECTURE_AUTO_STATUS || "oui", 
 PREFIX: process.env.PREFIX || ".",
   MODE: process.env.MODE || "public",
PRESENCE: process.env.PRESENCE || "audio", // online , ecrit, audio ou mettez non si vous ne désirez aucune des options
ZONE_DE_TEMPS: process.env.ZONE_DE_TEMPS || "Africa/Lagos",
};