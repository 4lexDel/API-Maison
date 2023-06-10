module.exports = {

    getChallengeList: function(bddConnection) {
        return new Promise((resolve, reject) => {
            bddConnection.query('SELECT * FROM challenge order by award desc', (err, rows) => {
                if (err) {
                    console.error('Erreur lors de l\'exécution de la requête :', err);
                    reject();
                }
                resolve(rows);
            });
        });
    },

    getChallengeById: function(bddConnection, id) {
        return new Promise(async(resolve, reject) => {
            bddConnection.query(`SELECT * FROM challenge where idChallenge = ${bddConnection.escape(id)}`, (err, rows) => {
                if (err) {
                    console.error('Erreur lors de l\'exécution de la requête :', err);
                    reject();
                }
                resolve(rows);
            });
        });
    },

    getChallengeByName: function(bddConnection, name) {
        return new Promise(async(resolve, reject) => {
            bddConnection.query(`SELECT * FROM challenge where title = ${bddConnection.escape(name)}`, (err, rows) => {
                if (err) {
                    console.error('Erreur lors de l\'exécution de la requête :', err);
                    reject();
                }
                resolve(rows);
            });
        });
    },

    updateChallenge: function(bddConnection, id, title, description, expiration, award, success, winner, idHouse) {
        return new Promise(async(resolve, reject) => {
            bddConnection.query(`UPDATE challenge set title = ${bddConnection.escape(title)},
                                                  description = ${bddConnection.escape(description)},
                                                  expiration = ${bddConnection.escape(expiration)},
                                                  award = ${bddConnection.escape(award)},
                                                  success = ${bddConnection.escape(success)},
                                                  winner = ${bddConnection.escape(winner)},
                                                  idHouse = ${bddConnection.escape(idHouse)} 
                                    where idChallenge = ${bddConnection.escape(id)}`, (err, rows) => {
                if (err) {
                    console.error('Erreur lors de l\'exécution de la requête :', err);
                    reject();
                }
                resolve(rows);
            });
        });
    },

    addChallenge: function(bddConnection, title, description, expiration, award, success, winner, idHouse) {
        return new Promise(async(resolve, reject) => {
            bddConnection.query(`INSERT into challenge (title, description, expiration, award, success, winner, idHouse) 
                                VALUES(${bddConnection.escape(title)}, 
                                        ${bddConnection.escape(description)},
                                        ${bddConnection.escape(expiration)}, 
                                        ${bddConnection.escape(award)}, 
                                        ${bddConnection.escape(success)}, 
                                        ${bddConnection.escape(winner)}, 
                                        ${bddConnection.escape(idHouse)})`, (err, rows) => {
                if (err) {
                    console.error('Erreur lors de l\'exécution de la requête :', err);
                    reject();
                }
                resolve(rows);
            });
        });
    },
}