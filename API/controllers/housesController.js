module.exports = {

    getHouseList: function(bddConnection) {
        return new Promise((resolve, reject) => {
            bddConnection.query('SELECT * FROM house order by score desc', (err, rows) => {
                if (err) {
                    console.error('Erreur lors de l\'exécution de la requête :', err);
                    reject();
                }
                resolve(rows);
            });
        });
    },

    getHouseById: function(bddConnection, id) {
        return new Promise(async(resolve, reject) => {
            bddConnection.query(`SELECT * FROM house where idHouse = ${bddConnection.escape(id)}`, (err, rows) => {
                if (err) {
                    console.error('Erreur lors de l\'exécution de la requête :', err);
                    reject();
                }
                resolve(rows);
            });
        });
    },

    getHouseByName: function(bddConnection, name) {
        return new Promise(async(resolve, reject) => {
            bddConnection.query(`SELECT * FROM house where title = ${bddConnection.escape(name)}`, (err, rows) => {
                if (err) {
                    console.error('Erreur lors de l\'exécution de la requête :', err);
                    reject();
                }
                resolve(rows);
            });
        });
    },

    addPointsByHouseId: function(bddConnection, id, amount) {
        return new Promise(async(resolve, reject) => {
            bddConnection.query(`UPDATE house set score = score + ${bddConnection.escape(amount)} where idHouse = ${bddConnection.escape(id)}`, (err, rows) => {
                if (err) {
                    console.error('Erreur lors de l\'exécution de la requête :', err);
                    reject();
                }
                resolve();
            });
        });
    },

    addHouse: function(bddConnection, title, score, description) {
        return new Promise(async(resolve, reject) => {
            bddConnection.query(`INSERT into house (title, score, description) VALUES(${bddConnection.escape(title)}, ${bddConnection.escape(score)}, ${bddConnection.escape(description)})`, (err, rows) => {
                if (err) {
                    console.error('Erreur lors de l\'exécution de la requête :', err);
                    reject();
                }
                resolve();
            });
        });
    },

    updateHouse: function(bddConnection, id, title, score, description) {
        return new Promise(async(resolve, reject) => {
            bddConnection.query(`UPDATE house set title = ${bddConnection.escape(title)},
                                                score = ${bddConnection.escape(score)},
                                                description = ${bddConnection.escape(description)}
                                    where idHouse = ${bddConnection.escape(id)}`, (err, rows) => {
                if (err) {
                    console.error('Erreur lors de l\'exécution de la requête :', err);
                    reject();
                }
                resolve();
            });
        });
    }
}