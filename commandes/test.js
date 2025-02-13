// the first command created 
const { slgcomd } = require("../lib/slgcomd");

slgcomd({ 
  nomCom: "test",
  classe: "utiles",
  react: "🔋"
}, // Ajoutez une virgule ici
async (ms_org, slg, com_options) => {
    const {pseudo} = com_options;
    const mess = `salut ${pseudo} je suis SLG-MD\nun bot développé par S L² G\n`;
    console.log("le bot est en ligne");
    const rl = "https://files.catbox.moe/uih7xz.jpg";
    slg.sendMessage(ms_org, {image: {url: rl}, caption: mess});
});



slgcomd({  
    nom nom: "ping",
    classe: "utiles",
   react: "⚡"
},

async (ms_org, slg, com_options) => {
const pi = Date.now();
 await slg.sendMessage(ms_org,{text: `ping.....`});
const ng = Date.now();

const ping = ng - pi 

slg.sendMessage(ms_org,{text:`> ${ping} ms`});
)

