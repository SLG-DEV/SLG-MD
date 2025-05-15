const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  SESSION_ID: process.env.SESSION_ID || "SLG_MD=Hzw3BZ7S#PMwLmlAIWuJh9fzt-Unj_X2FS-AYcKQj4Q1v0wAixHk",
OWNER: process.env.NUMERO_OWNER || "237620066719", 
STATUS: process.env.LECTURE_AUTO_STATUS || "oui", 
 PREFIX: process.env.PREFIX || "null",
   MODE: process.env.MODE || "prive",
ZONE_DE_TEMPS: process.env.ZONE_DE_TEMPS || "Africa/Lagos",
   Db: process.env.Db || "postgresql://postgre.qnjvgxwyncnsbpfxwrbq:ovlmdmdpasse@aws-0-eu-central-1.pooler.supabase.com:6543 /postgres",
};