const { getHouseList, getHouseById, addPointsByHouseId } = require("../controllers/housesController");

module.exports = {
    houseList: async function(req, res, bddConnection) {
        let houseList = await getHouseList(bddConnection);

        return res.status(200).send(houseList);
    },

    houseDetail: async function(req, res, bddConnection, id) {
        let house = await getHouseById(bddConnection, id);

        return res.status(200).send(house);
    },

    houseAddPoint: async function(req, res, bddConnection, id, points) {
        if (points == null) {
            return res.status(418).send({ message: 'We need all the parameters !' });
        }

        let newHouse = await addPointsByHouseId(bddConnection, id, points);
    }
}