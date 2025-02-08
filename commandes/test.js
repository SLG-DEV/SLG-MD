// the firts commandes created 
const slgcomd = require("../lib/slgcomd");

slgcomd({ 
nomCom: "test"
desc: "vérifié si le bot est en ligne"
react: "🍷"

} 
async {arg, slg, dest, pseudo} = com_options {

const mess = `salut ${pseudo} je suis SLG-MD\nun bot développé par S L² G\n`
console.log("le bot est en ligne");
const url =  ""
slg.sendMessage(dest,{image:{url: ''}, caption: mess})

}