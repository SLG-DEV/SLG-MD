
var commands = []

function slgcomd(info, func) {
    var data = info;
    data.function = func;
    if (!info.desc) info.desc = '';
    if (!info.classe) data.classe = 'utiles';
    if(!info.react) data.react ="🍷";
    commands.push(data);
    return data;
}
module.exports = {
    slgcomd,
    Function:slgcomd,
    Module:slgcomd,
    commands,
};