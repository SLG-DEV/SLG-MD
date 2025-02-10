let commands = [];

function slgcomd(obj, fonctions) {
    let infocoms = obj; 

    if (!infocoms type) {
        infocoms.classe = "General"; 
    }
    if (!infocoms.react) {
        infocoms.react = "🍷"; 
    }
    if (!infocoms.desc) {
        infocoms.desc = "Aucune description"; 
    }
    if (!infocoms.alias) {
        infocoms.alias = []; 
    }

    infocoms.fonction = fonctions; 
    commands.push(infocoms); 
    return infocoms; 
} 

module.exports = { slgcomd, Module: slgcomd, commands };
