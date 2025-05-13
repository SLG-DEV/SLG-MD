        
  const { pool } = require("pg");
  const config = require("../config");
  const db = config.Db
  
 
const setDb = {
  connectionString:db ,
  ssl: {
    rejectUnauthorized: false,
  },
};

  const pool = new pool(setDb)
  
  async function tableAntilien(){
    try{
      const client = await pool.connect()
      await client.query(`
          CREATE TABLE IF NOT EXISTS  antilien(
          jid TEXT PRIMARY KEY;
          statut text;
          action text
          console.log(`slg ANTILINK table créé avec succès`)
      )`;
      )
      
      
  } catch(err){
      console.log("erreur pour la table ANTILIEN", err)
  } finally{
  client.release()
      
  }
  
  }
  
  tableAntilien()
 
  async function addOrUpdateJid(jid, statut) {
    const client = await pool.connect();
  try { 
      const result = await client.query('SELECT * FROM antilien WHERE jid = $1', [jid]);
      const  jidExiste = result.rows.length > 0
      if (jidExist){
            await client.query('UPDATE antilien SET statut = $1 WHERE jid = $2', [statut, jid]);
          
      }else{
                await client.query('INSERT INTO antilien (jid, statut, action) VALUES ($1, $2, $3)', [jid, etat, 'supp']);
      }
  }catch(e){
   console.log(`erreur lors de l ajout ou de la mise a jour du jid ${jid} `, e)   
  }finally{
      client.release();
  }
        
  }


async function updateActionInJid(jid, action) {
  const client = await pool.connect();

  try {
    // Vérifiez si le jid existe déjà dans la table 'antilien'
    const result = await client.query('SELECT * FROM antilien WHERE jid = $1', [jid]);
    const jidExiste = result.rows.length > 0;

    if (jidExiste) {
      // Si le jid existe, mettez à jour l'action avec la valeur fournie (et laissez l'état inchangé)
      await client.query('UPDATE antilien SET action = $1 WHERE jid = $2', [action, jid]);
    } else {
      // Si le jid n'existe pas, ajoutez-le avec l'état 'non' par défaut et l'action fournie
      await client.query('INSERT INTO antilien (jid, etat, action) VALUES ($1, $2, $3)', [jid, 'non', action]);
    }

    console.log(`Action mise à jour avec succès pour le JID ${jid} dans la table 'antilien'.`);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'action pour le JID dans la table  :', error);
  } finally {
    client.release();
  }
};

async function verifstatutJid(jid) {
  const client = await pool.connect();

  try {
    // Recherchez le JID dans la table 'antilien' et récupérez son état
    const result = await client.query('SELECT etat FROM antilien WHERE jid = $1', [jid]);

    if (result.rows.length > 0) {
      const statut = result.rows[0].statut;
      return statut === 'oui';
    } else {
      // Si le JID n'existe pas dans la table, il n'est pas enregistré comme "oui"
      return false;
    }
  } catch (error) {
    console.error('Erreur lors de la vérification de l\'état du JID dans la table ', error);
    return false;
  } finally {
    client.release();
  }
  
  async function recupActionJid(jid) {
  const client = await pool.connect();

  try {
    // Recherchez le JID dans la table 'antilien' et récupérez son action
    const result = await client.query('SELECT action FROM antilien WHERE jid = $1', [jid]);

    if (result.rows.length > 0) {
      const action = result.rows[0].action;
      return action;
    } else {
      // Si le JID n'existe pas dans la table, retournez une valeur par défaut (par exemple, 'supp')
      return 'supp';
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'action du JID dans la table :', error);
    return 'supp'; // Gestion de l'erreur en retournant une valeur par défaut
  } finally {
    client.release();
  }
};
module.exports = {
addOrUpdateJid;
updateActionInJid;
verifstatutJid;
recupActionJid    
};
