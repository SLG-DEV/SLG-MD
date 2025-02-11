let commands= [];

function slgcomd(obj, fonctions) {
    let cmd_info = obj; 

    if (!cmd_info.classe) {
        cmd_info.classe = "General"; 
    }
    if (!cmd_info.react) {
        cmd_info.react = "🍷"; 
    }
    if (!cmd_info.desc) {
        cmd_info.desc = "Aucune description"; 
    }
    if (!cmd_info.alias) {
        cmd_info.alias = []; 
    }

    cmd_info.fonction = fonctions; 
    cmd.push(cmd_info); 
    return cmd_info; 
} 

module.exports = { slgcomd, Module: slgcomd, commands };