module.exports = {

    getProofList: function(bddConnection) {
        return new Promise((resolve, reject) => {
            bddConnection.query('SELECT * FROM proof order by dateProof asc', (err, rows) => {
                if (err) {
                    console.error('Erreur lors de l\'exécution de la requête :', err);
                    reject();
                }
                resolve(rows);
            });
        });
    },

    getProofById: function(bddConnection, id) {
        return new Promise(async(resolve, reject) => {
            bddConnection.query(`SELECT * FROM proof where idProof = ${bddConnection.escape(id)}`, (err, rows) => {
                if (err) {
                    console.error('Erreur lors de l\'exécution de la requête :', err);
                    reject();
                }
                resolve(rows);
            });
        });
    },

    // getHouseByName: function(bddConnection, name) {
    //     return new Promise(async(resolve, reject) => {
    //         bddConnection.query(`SELECT * FROM house where title = ${bddConnection.escape(name)}`, (err, rows) => {
    //             if (err) {
    //                 console.error('Erreur lors de l\'exécution de la requête :', err);
    //                 reject();
    //             }
    //             resolve(rows);
    //         });
    //     });
    // },

    addProof: function(bddConnection, dateProof, proofImg, proofDescription, accepted, challengerName, idHouse, idChallenge) {
        return new Promise(async(resolve, reject) => {
            bddConnection.query(`INSERT into proof (dateProof, proofImg, proofDescription, accepted, challengerName, idHouse, idChallenge) 
                            VALUES(${bddConnection.escape(dateProof)}, 
                            ${bddConnection.escape(proofImg)}, 
                            ${bddConnection.escape(proofDescription)}, 
                            ${bddConnection.escape(accepted)}, 
                            ${bddConnection.escape(challengerName)}, 
                            ${bddConnection.escape(idHouse)}, 
                            ${bddConnection.escape(idChallenge)})`, (err, rows) => {
                if (err) {
                    console.error('Erreur lors de l\'exécution de la requête :', err);
                    reject();
                }
                resolve();
            });
        });
    },

    updateProof: function(bddConnection, id, dateProof, proofImg, proofDescription, accepted, challengerName, idHouse, idChallenge) {
        return new Promise(async(resolve, reject) => {
            bddConnection.query(`UPDATE proof set dateProof = ${bddConnection.escape(dateProof)},
                                                proofImg = ${bddConnection.escape(proofImg)},
                                                proofDescription = ${bddConnection.escape(proofDescription)},
                                                accepted = ${bddConnection.escape(accepted)},
                                                challengerName = ${bddConnection.escape(challengerName)},
                                                idHouse = ${bddConnection.escape(idHouse)},
                                                idChallenge = ${bddConnection.escape(idChallenge)}
                                    where idProof = ${bddConnection.escape(id)}`, (err, rows) => {
                if (err) {
                    console.error('Erreur lors de l\'exécution de la requête :', err);
                    reject();
                }
                resolve();
            });
        });
    }
}