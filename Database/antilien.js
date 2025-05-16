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

async function tableAntilien() {
  let client;
  try {
    client = await pool.connect();
    await client.query(`
      CREATE TABLE IF NOT EXISTS antilien (
        jid TEXT PRIMARY KEY,
        statut TEXT,
        action TEXT
      )
    `);
    console.log(`Table ANTILIEN créée avec succès`);
  } catch (err) {
    console.log("Erreur lors de la création de la table ANTILIEN", err);
  } finally {
    if (client) {
      client.release();
    }
  }
}

tableAntilien();

async function addOrUpdateJid(jid, statut) {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM antilien WHERE jid = $1', [jid]);
    const jidExiste = result.rows.length > 0;
    if (jidExiste) {
      await client.query('UPDATE antilien SET statut = $1 WHERE jid = $2', [statut, jid]);
    } else {
      await client.query('INSERT INTO antilien (jid, statut, action) VALUES ($1, $2, $3)', [jid, statut, 'supp']);
    }
  } catch (e) {
    console.log(`Erreur lors de l'ajout ou de la mise à jour du jid ${jid}:`, e);
  } finally {
    client.release();
  }
}

async function updateActionInJid(jid, action) {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM antilien WHERE jid = $1', [jid]);
    const jidExiste = result.rows.length > 0;

    if (jidExiste) {
      await client.query('UPDATE antilien SET action = $1 WHERE jid = $2', [action, jid]);
    } else {
      await client.query('INSERT INTO antilien (jid, statut, action) VALUES ($1, $2, $3)', [jid, 'non', action]);
    }

    console.log(`Action mise à jour avec succès pour le JID ${jid} dans la table 'antilien'.`);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'action pour le JID dans la table:', error);
  } finally {
    client.release();
  }
}

async function verifstatutJid(jid) {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT statut FROM antilien WHERE jid = $1', [jid]);
    if (result.rows.length > 0) {
      const statut = result.rows[0].statut;
      return statut === 'oui';
    } else {
      return false;
    }
  } catch (error) {
    console.error('Erreur lors de la vérification de l\'état du JID dans la table:', error);
    return false;
  } finally {
    client.release();
  }
}

async function recupActionJid(jid) {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT action FROM antilien WHERE jid = $1', [jid]);
    if (result.rows.length > 0) {
      const action = result.rows[0].action;
      return action;
    } else {
      return 'supp';
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'action du JID dans la table:', error);
    return 'supp';
  } finally {
    client.release();
  }
}

module.exports = {
  addOrUpdateJid,
  updateActionInJid,
  verifstatutJid,
  recupActionJid,
};
