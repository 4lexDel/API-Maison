// Importer le module mysql
const mysql = require('mysql');

module.exports = {
    getDatabaseConnection: function() {
        // Configurer les informations de connexion à la base de données
        const connection = mysql.createConnection({
            host: '127.0.0.1',
            port: '3306',
            user: 'root',
            password: '',
            database: 'bde_maison'
        });

        // Établir la connexion à la base de données
        connection.connect((err) => {
            if (err) {
                console.error('Erreur de connexion à la base de données :', err);
                return -1;
            }
            console.log('Connexion à la base de données établie avec succès !');
        })

        return connection;
    }
}