let commands = [];

function slgcomd(obj, fonctions) {
    let infoComs = obj; 

    if (!infoComs type) {
        infoComs.type = "General"; 
    }
    if (!infoComs.react) {
        infoComs.react = "🍷"; 
    }
    if (!infoComs.desc) {
        infoComs.desc = "Aucune description"; 
    }
    if (!infoComs.alias) {
        infoComs.alias = []; 
    }

    infoComs.fonction = fonctions; 
    commands.push(infoComs); 
    return infoComs; 
} 

module.exports = { slgcomd, Module: slgcomd, commands };
