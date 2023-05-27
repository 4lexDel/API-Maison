const fs = require('fs');
const USERS_PATH = 'db/users.json';

//Probleme si DB vide !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

module.exports = {
    getUsers: function(bddConnection) {
        return new Promise((resolve, reject) => {
            bddConnection.query('SELECT * FROM user', (err, rows) => {
                if (err) {
                    console.error('Erreur lors de l\'exécution de la requête :', err);
                    reject();
                }
                resolve(rows);
            });
        });
    },

    getUserById: function(bddConnection, id) {
        return new Promise(async(resolve, reject) => {
            bddConnection.query(`SELECT * FROM user where idUser = ${bddConnection.escape(id)}`, (err, rows) => {
                if (err) {
                    console.error('Erreur lors de l\'exécution de la requête :', err);
                    reject();
                }
                resolve(rows);
            });
        });
    },

    addUser: function(bddConnection, newUser) {
        return new Promise(async(resolve, reject) => {
            bddConnection.query(`INSERT INTO user (username, password, admin) VALUES (${bddConnection.escape(newUser.username)}, ${bddConnection.escape(newUser.password)}, ${bddConnection.escape(newUser.admin)})`, (err, rows) => {
                if (err) {
                    console.error('Erreur lors de l\'exécution de la requête :', err);
                    reject();
                }
                resolve(rows);
            });
        });
    },

    updateUser: function(bddConnection, updatedUser) {
        return new Promise(async(resolve, reject) => {
            bddConnection.query(`UPDATE user set password = ${bddConnection.escape(updatedUser.password)} where idUser = ${bddConnection.escape(updatedUser.id)}`, (err, rows) => {
                if (err) {
                    console.error('Erreur lors de l\'exécution de la requête :', err);
                    reject();
                }
                resolve();
            });
        });
    }
}