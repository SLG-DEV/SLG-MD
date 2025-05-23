
const { Pool } = require("pg");
  const config = require("../config");
  const db = config.Db


const setDb = {
  connectionString:db ,
  ssl: {
    rejectUnauthorized: false,
  },
};

  const pool = new Pool(setDb);

async function createSudoTable() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS sudo (
        id serial PRIMARY KEY,
        jid text NOT NULL
      )
    `);
    console.log("La table 'sudo' a été créée avec succès.");
  } catch (error) {
    console.error("Une erreur est survenue lors de la création de la table 'sudo':", error);
  } finally {
    client.release();
  }
}

// Appelez la méthode pour créer la table "sudo"
createSudoTable();


// Fonction pour vérifier si un groupe est banni
async function issudo(jid) {
    const client = await pool.connect();
    try {
      const query = "SELECT EXISTS (SELECT 1 FROM sudo WHERE jid = $1)";
      const values = [jid];

      const result = await client.query(query, values);
      return result.rows[0].exists;
    } catch (error) {
      console.error("Erreur lors de la vérification du groupe banni :", error);
      return false;
    } finally {
      client.release();
    }
  }


  async function delSudoNumber(jid) {
    const client = await pool.connect();
    try {
      // Supprimez le numéro de téléphone de la table "sudo"
      const query = "DELETE FROM sudo WHERE jid = $1";
      const values = [jid];

      await client.query(query, values);
      console.log(`Numéro de téléphone ${jid} supprimé de la liste des numéros de téléphone autorisés.`);
    } catch (error) {
      console.error("Erreur lors de la suppression du numéro de téléphone autorisé :", error);
    } finally {
      client.release();
    }
  }

  async function addSudoNumber(jid) {
    const client = await pool.connect();
    try {
      const query = "INSERT INTO sudo (jid) VALUES ($1)";
      const values = [jid];

      await client.query(query, values);
      console.log(`Numéro de téléphone ${jid} ajouté à la liste des numéros de téléphone autorisés.`);
    } catch (error) {
      console.error("Erreur lors de l'ajout du numéro de téléphone autorisé :", error);
    } finally {
      client.release();
    }
  }

  async function getAllSudoNumbers() {
    const client = await pool.connect();
    try {
      // Sélectionnez tous les numéros de téléphone de la table "sudo"
      const query = "SELECT jid FROM sudo";
      const result = await client.query(query);
      const sudoNumbers = result.rows.map((row) => row.jid);

      return sudoNumbers;
    } catch (error) {
      console.error("Erreur lors de la récupération des numéros de téléphone autorisés :", error);
      return [];
    } finally {
      client.release();
    }
  }  

     async function isSudoTableNotEmpty() {
    const client = await pool.connect();

    try {
      const result = await client.query('SELECT COUNT(*) FROM sudo');

      // Récupérez la valeur du compteur (nombre de lignes)
      const rowCount = parseInt(result.rows[0].count);

      // Si le nombre de lignes est supérieur à zéro, la table n'est pas vide
      return rowCount > 0;
    } catch (error) {
      console.error('Erreur lors de la vérification de la table "sudo" :', error);
      return false; // En cas d'erreur, considérez la table comme vide
    } finally {
      client.release();
    }
  };




  module.exports = {
    issudo,
    addSudoNumber,
    delSudoNumber,
    getAllSudoNumbers,
    isSudoTableNotEmpty
  };