const { slgcomd } = require("../lib/slgcomd");  
const{ atbAddOrUpdateJid,
    atbUpdateAction,
    atbVerifStatutJid } = require("../Database/antibot");    
const { addOrUpdateJid,
updateActionInJid,
verifstatutJid } = require("../Database/antilien"); 



  slgcomd({ 
  nomCom: "antilien",
  classe: "groupe",
  react: "🤖"
}, async (ms_org, slg, com_options) => {

 const { verif_Gp, prenium_id, verif_slgAdmin, arg, repondre, prefixe } = com_options;
 try {
   const statut = await verifStatutJid(ms_org);

   if (!verif_Gp) {
     return repondre("*_commande réservée pour les groupes._*");
   }

   if (!verif_slgAdmin) {
     return repondre("*_veillez nommer le bot administrateur_*");
   }

   const shouldWrite = ["oui/kick", "kick", "oui/supp", "non","oui"];
   const verifWrite = shouldWrite.includes(arg);

   const etattrue = await verifstatutJid(ms_org);

   if (!arg || arg === "") {
     return repondre(`*_voici l'utilisation de l'antilien '${prefixe} oui pour activer avec une action supp par defaut ${prefixe}antilien oui/kick pour actualiser sur retirer et antilien oui/supp pour actualiser sur supprimer Antilien non pour desactiver_*`);
   } 

   if (!verifWrite) {
     return repondre("*_saisissez une valeur correcte pour antilien_*");
   } else if (arg === "oui") {
     await addOrUpdateJid(ms_org, "oui");
     return repondre("*_antilien activé avec succès_*");
   } else if (arg === "non") {
     await addOrUpdateJid(ms_org, "non");
     return repondre("*_antilien désactivé avec succès_*");
   } else if (arg === "oui/kick" && etattrue) {
     await updateActionInJid(ms_org, "kick");
     return repondre("*_antilien actualisé sur kick avec succès_*");
   } else if (arg === "oui/supp" && etattrue) {
     await updateActionInJid(ms_org, "supp");
     return repondre("*_antilien actualisé sur supp avec succès_*");
   } else {
     return repondre(`*_voici l'utilisation de l'antilien '${prefixe} oui pour activer avec une action supp par defaut ${prefixe}antilien oui/kick pour actualiser sur retirer et antilien oui/supp pour actualiser sur supprimer Antilien non pour desactiver_*`);
   }
 } catch (e) {
   repondre(e);
 }
});
