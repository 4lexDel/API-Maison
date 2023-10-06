// db.js
const mysql = require('mysql2');

let connection = null; // Déclarez une variable pour stocker la connexion unique.

module.exports = {
    getDatabaseConnection: function() {
        if (!connection) {
            // Si la connexion n'existe pas...
            connection = mysql.createConnection({
                host: process.env.DB_HOST,
                port: process.env.DB_PORT,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE,
            });

            // Connexion
            connection.connect((err) => {
                if (err) {
                    console.error('Erreur de connexion à la base de données :', err);
                    throw err;
                }
                console.log('Connexion à la base de données établie avec succès !');
            });
        }

        return connection; // Renvoie la connexion existante ou nouvellement créée.
    },
};