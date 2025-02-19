// the first command created 
const { slgcomd } = require("../lib/slgcomd");
const os = require("os");
const {ZONE_DE_TEMPS} = require("../config");
const rl = "https://files.catbox.moe/uih7xz.jpg";
const { runtime } = require("../lib/fonctions");
slgcomd({ 
  nomCom: "test",
  classe: "utiles",
  react: "🔋"
}, // Ajoutez une virgule ici
async (ms_org, slg, com_options) => {
    const {pseudo} = com_options;
    const mess = `Salut ${pseudo}\n je suis *SLG-MD* un bot développé par S L² G`;
    console.log("le bot est en ligne");

    slg.sendMessage(ms_org, {image: {url: rl}, caption: mess});
});



slgcomd({  
    nomCom: "ping",
    classe: "utiles",
   react: "⚡"
},

async (ms_org, slg) => {
const pi = Date.now();
 await slg.sendMessage(ms_org,{text: `*_ping....._*`});
const ng = Date.now();
console.log("ping...");
const ping = ng - pi 

slg.sendMessage(ms_org,{text:`> pong ${ping} ms`});
});


slgcomd({
    nomCom: "alive",
    classe: "utiles",
    desc: "temps de fonctionnement",
    react: "🍷"  // Ajout d'un deux-points pour corriger la syntaxe
}, async (ms_org, slg) => { 
try{
    const timeZone = 'Africa/Lagos';
    const now = new Date();  // Déclaration de 'now' pour obtenir la date actuelle

    const jour = now.toLocaleDateString('en-US', { timeZone, weekday: 'long' });
    const time = now.toLocaleTimeString('en-US', { timeZone });  // Correction de 'ZONE_DE_TEMPS' à 'timeZone'
    const date = now.toLocaleDateString('en-US', { timeZone });  // Correction de 'ZONE_DE_TEMPS' à 'timeZone'

    const uptime = runtime(process.uptime());

    const m = `*NOUS SOMMES ${jour} LE ${date}\n*`;
    const es = `*AVEC UN UPTIME DE ${uptime} À ${time}*`;  // Correction de 'A' à 'À'

    const mes = m + es;

    slg.sendMessage(ms_org, { image: rl }, { caption: mes });
}catch(err){
slg.sendMessage(ms_org,{text: err});
}
});
