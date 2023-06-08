const { getHouseList, getHouseById, addPointsByHouseId, getHouseByName, addHouse } = require("../controllers/housesController");

module.exports = {
    houseList: async function(req, res, bddConnection) {
        let houseList = await getHouseList(bddConnection);

        return res.status(200).send(houseList);
    },

    houseDetail: async function(req, res, bddConnection, id) {
        let house = await getHouseById(bddConnection, id);

        return res.status(200).send(house[0]);
    },

    houseAddPoint: async function(req, res, bddConnection, id, points) {
        if (points == null) {
            return res.status(418).send({ message: 'We need all the parameters !' });
        }

        await addPointsByHouseId(bddConnection, id, points);

        module.exports.houseDetail(req, res, bddConnection, id);
    },

    addHouse: async function(req, res, bddConnection, title, score, description) {
        if (!title || !score || !description) {
            return res.status(418).send({ message: 'We need all the parameters !' });
        }

        await addHouse(bddConnection, title, score, description);

        let newHouse = await getHouseByName(bddConnection, title);
        return res.status(201).send(newHouse);
    }
}