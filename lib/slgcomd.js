let commands = [];
function slgcomd(obj, fonctions) {
    let infoComs = obj;
    if (!infoComs.type) {
        infoComs.type = "Général";
    }
    if (!infoComs.alias){
        infoComs.alias = [];
    }
  
    
    infoComs.fonction = fonctions;
    commands.push(infoComs);
    
    return infoComs;
}
module.exports = { slgcomd, Module: slgcomd, commands };
