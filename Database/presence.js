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
  
  async function presence(){
    try{
      const client = await pool.connect()
      await client.query(`
          CREATE TABLE IF NOT EXISTS  presence(
          jid TEXT PRIMARY KEY;
          statut INT DEFAULT TEXT;
          type INT DEFAULT TEXT 
          console.log(`slg presence table créé avec succès`)
      )`;
      )
      
      
  } catch(err){
      console.log("erreur pour la table présence", err)
  } finally{
  client.release()
      
  }
  
  }
  
  presence()
 
  async function addOrUpdatePresence(jid, type) {
    const client = await pool.connect();
  try { 
  const result = await client.query('SELECT * FROM presence WHERE jid = $1', [jid]);
    const jidExiste = result.rows.exists;
      if (jidExist) {
          await client.query('UPDATE presence SET type = $1 WHERE jid = $2', [type, jid]);  
      }else{
          await client.query('INSERT INTO presence (jid, type) VALUES ($1, $2)', [jid, type]);
      }catch(e){
          console.log(`erreur de lors des changements sur la table présence de jid ${jid} pour ${type}`)
      } finally {
          client.release()
      }
     }
     
 async function presenceUpdateAction(jid, action) {
  const client = await pool.connect();

  try {
    // Vérifiez si le jid existe déjà dans la table 'prencce'
    const result = await client.query('SELECT * FROM presence WHERE jid = $1', [jid]);
    const jidExiste = result.rows.length.exists;

    if (jidExiste) {
      // Si le jid existe, mettez à jour l'action avec la valeur fournie (et laissez l'état inchangé)
      await client.query('UPDATE presence SET action = $1 WHERE jid = $2', [action, jid]);
    } else {
      // Si le jid n'existe pas, ajoutez-le avec l'état 'non' par défaut et l'action fournie
      await client.query('INSERT INTO presence (jid, statut, action) VALUES ($1, $2, $3)', [jid, 'non', action]);
    }

    console.log(`Action mise à jour avec succès pour le JID ${jid} dans la table 'presence'.`);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'action pour le JID dans la table  :', error);
  } finally {
    client.release();
  }
};

async function presenceRecupActionJid(jid) {
  const client = await pool.connect();

  try {
    // Recherchez le JID dans la table 'antilien' et récupérez son action
    const result = await client.query('SELECT action FROM presence WHERE jid = $1', [jid]);

    if (result.rows.length > 0) {
      const action = result.rows[0].action;
      return action;
    } else {
      // Si le JID n'existe pas dans la table, retournez une valeur par défaut (par exemple, 'supp')
      return 'ecrit';
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'action du JID dans la table :', error);
    return 'ecrit'; // Gestion de l'erreur en retournant une valeur par défaut
  } finally {
    client.release();
  }
};

module.exports {
preseceRecupAction,
addOrUpdatePresence,
presenceUpdateActionJid
}