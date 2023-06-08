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


    // addHouse: function(bddConnection, title, score, description) {
    //     return new Promise(async(resolve, reject) => {
    //         bddConnection.query(`INSERT into house (title, score, description) VALUES(${bddConnection.escape(title)}, ${bddConnection.escape(score)}, ${bddConnection.escape(description)})`, (err, rows) => {
    //             if (err) {
    //                 console.error('Erreur lors de l\'exécution de la requête :', err);
    //                 reject();
    //             }
    //             resolve();
    //         });
    //     });
    // }
}