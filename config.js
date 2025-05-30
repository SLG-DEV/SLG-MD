const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  SESSION_ID: process.env.SESSION_ID || "SLG-MD~qJZai67Z",
OWNER: process.env.NUMERO_OWNER || "237620066719", 
STATUS: process.env.LECTURE_AUTO_STATUS || "oui", 
 PREFIX: process.env.PREFIX || ".",
   MODE: process.env.MODE || "public",
ZONE_DE_TEMPS: process.env.ZONE_DE_TEMPS || "Africa/Lagos",
   Db: process.env.Db || "postgresql://postgres.qnjvgxwyncnsbpfxwrbq:ovlmdmdpasse@aws-0-eu-central-1.pooler.supabase.com:6543/postgres",
};