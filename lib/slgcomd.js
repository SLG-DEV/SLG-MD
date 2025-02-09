let commands = [];
function slgcomd(obj, fonctions) {
    let infoComs = obj;
    if (!infoComs.type) {
        infoComs.type = "Général";
    }
    if (!infoComs.alias){
        infoComs.alias = [];
    }
    if (!infoComs.desc){
infoComs.desc = "aucune description"
}
    if (!infoComs.react) {
        infoComs.react = "🍷";
    }
    infoComs.fonction = fonctions;
    commands.push(infoComs);
    
    return infoComs;
}
module.exports = { slgcomd, Module: slgcomd, commands };
