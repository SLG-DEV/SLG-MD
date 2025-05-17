const { Pool } = require("pg");
const config = require("../config");
const db = config.Db;

const setDb = {
  connectionString: db,
  ssl: {
    rejectUnauthorized: false,
  },
};

const pool = new Pool(setDb);

async function presence() {
  let client;
  try {
    client = await pool.connect();
    await client.query(`
      CREATE TABLE IF NOT EXISTS presence (
        jid TEXT PRIMARY KEY,
        statut text,
        type text
      )
    `);
    console.log(`Table presence créée avec succès`);
  } catch (err) {
    console.log("Erreur lors de la création de la table présence", err);
  } finally {
   client.release();
  }
}

presence();

async function addOrUpdatePresence(jid, type) {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query('SELECT * FROM presence WHERE jid = $1', [jid]);
    const jidExiste = result.rows.length > 0;

    if (jidExiste) {
      await client.query('UPDATE presence SET type = $1 WHERE jid = $2', [type, jid]);
    } else {
      await client.query('INSERT INTO presence (jid, type) VALUES ($1, $2)', [jid, type]);
    }
  } catch (e) {
    console.log(`Erreur lors des changements sur la table présence pour jid ${jid} et type ${type}:`, e);
  } finally {
    client.release();
  }
}

async function presenceUpdateAction(jid, action) {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query('SELECT * FROM presence WHERE jid = $1', [jid]);
    const jidExiste = result.rows.length > 0;

    if (jidExiste) {
      await client.query('UPDATE presence SET action = $1 WHERE jid = $2', [action, jid]);
    } else {
      await client.query('INSERT INTO presence (jid, statut, action) VALUES ($1, $2, $3)', [jid, 'non', action]);
    }

    console.log(`Action mise à jour avec succès pour le JID ${jid} dans la table 'presence'.`);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'action pour le JID dans la table :', error);
  } finally {
     client.release();
  }
}

async function pRecupActionJid(jid) {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query('SELECT action FROM presence WHERE jid = $1', [jid]);

    if (result.rows.length > 0) {
      return result.rows[0].action;
    } else {
      return 'ecrit'; // Valeur par défaut si le JID n'existe pas
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'action du JID dans la table :', error);
    return 'ecrit'; // Gestion de l'erreur en retournant une valeur par défaut
  } finally {
   client.release();
  }
}

module.exports = {
  pRecupActionJid,
  addOrUpdatePresence,
  presenceUpdateAction
};
