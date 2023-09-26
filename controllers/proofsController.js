module.exports = {

    getProofList: function(bddConnection) {
        return new Promise((resolve, reject) => {
            bddConnection.query(`SELECT idProof, dateProof, proofImg, proof.description, challengerName, challenge.idChallenge, challenge.title challengeTitle, house.idHouse, house.title houseTitle
                                FROM proof
                                inner join challenge on challenge.idChallenge = proof.idChallenge
                                inner join house on house.idHouse = proof.idHouse
                                order by dateProof asc`, (err, rows) => {
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

    addProof: function(bddConnection, dateProof, proofImg, description, accepted, challengerName, idHouse, idChallenge) {
        return new Promise(async(resolve, reject) => {
            bddConnection.query(`INSERT into proof (proofImg, dateProof, description, accepted, challengerName, idHouse, idChallenge) 
                            VALUES(${bddConnection.escape(proofImg)}, 
                            ${bddConnection.escape(dateProof)}, 
                            ${bddConnection.escape(description)}, 
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

    updateProof: function(bddConnection, id, dateProof, proofImg, description, accepted, challengerName, idHouse, idChallenge) {
        return new Promise(async(resolve, reject) => {
            bddConnection.query(`UPDATE proof set dateProof = ${bddConnection.escape(dateProof)},
                                                proofImg = ${bddConnection.escape(proofImg)},
                                                description = ${bddConnection.escape(description)},
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
    },

    removeProofById: function(bddConnection, id) {
        return new Promise(async(resolve, reject) => {
            bddConnection.query(`delete from proof where idProof = ${bddConnection.escape(id)}`, (err, rows) => {
                if (err) {
                    console.error('Erreur lors de l\'exécution de la requête :', err);
                    reject();
                }
                resolve();
            });
        });
    }
}

// https://www.youtube.com/watch?v=1gPCKcGHiaE&ab_channel=CodingShiksha