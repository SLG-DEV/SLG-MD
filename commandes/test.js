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
desc: "temps de fonctionnement",
react "🍷"
}, 
async ( ms_org, slg ) => 
{ 
const [date, time] = new Date()
      .toLocaleString("en-IN", { timeZone: ZONE_DE_TEMPS })
      .split(",");

const m = `*NOUS SOMMES LE ${date}*`
const es = `*AVEC UN UPTIME DE ${runtime(process.uptime())} A ${time}*`

const mes = m + es

slg.sendMessage(ms_org,{image: rl }, {caption: mes});

});
