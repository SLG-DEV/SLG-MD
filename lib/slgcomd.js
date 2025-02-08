let commands = [];
function slgCom(obj, fonctions) {
    let infoComs = obj;
    if (!obj.categorie) {
        infoComs.type = "Général";
    }
    if (!obj.alias){
        infoComs.alias = [];
    }
    if (!obj.react) {
        infoComs.react = "🍷";
    }
    infoComs.fonction = fonctions;
    commands.push(infoComs);
    
    return infoComs;
}
module.exports = { slgCom, Module: slgCom, commands };
*/