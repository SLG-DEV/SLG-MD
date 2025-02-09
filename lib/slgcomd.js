let commands = [];
function slgcomd(obj, fonctions) {
    let infoComs = obj;
    if (!obj.type) {
        infoComs.type = "Général";
    }
    if (!obj.alias){
        infoComs.alias = [];
    }
    if (!obj.desc){
infoComs.desc = "aucune description"
}
    if (!obj.react) {
        infoComs.react = "🍷";
    }
    infoComs.fonction = fonctions;
    commands.push(infoComs);
    
    return infoComs;
}
module.exports = { slgcomd, Module: slgcomd, commands };
