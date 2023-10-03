// Importer le module mysql
const mysql = require('mysql2');

module.exports = {
    getDatabaseConnection: function() {
        // Configurer les informations de connexion à la base de données
        const connection = mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        });

        // Établir la connexion à la base de données
        connection.connect((err) => {
            if (err) {
                console.error('Erreur de connexion à la base de données :', err);
                throw err;
                // return -1;
            }
            console.log('Connexion à la base de données établie avec succès !');
        })

        return connection;
    }
}