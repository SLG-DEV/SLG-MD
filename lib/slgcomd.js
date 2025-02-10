             var tabCmds = [];
let commands = [];
function slgcomd(obj, fonctions) {
    let infoComs = obj;
    if (!obj.classe) {
        infoComs.classe = "Général";
    }
    if (!obj.react) {
        infoComs.react = "💫";
    }
    infoComs.fonction = fonctions;
    commands.push(infoComs);
    // console.log('chargement...')
    return infoComs;
}
module.exports = { slgcomd, Module: slgcomd, commands };
