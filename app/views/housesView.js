const { getHouseList, getHouseById, addPointsByHouseId, getHouseByName, addHouse, updateHouse, removeHouseById } = require("../controllers/housesController");
const { getDatabaseConnection } = require("../utils/initBDD");

const bddConnection = getDatabaseConnection(); // MYSQL CONNECTOR

module.exports = {
    houseList: async function(req, res) {
        console.log("GET /api/houses");
        try {
            let houseList = await getHouseList(bddConnection);

            return res.status(200).send(houseList);
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: 'Internal error !' });
        }
    },

    houseDetail: async function(req, res) {
        console.log("GET /api/house/:id");
        const { id } = req.params;

        try {
            let house = await getHouseById(bddConnection, id);

            return res.status(200).send(house[0]);
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: 'Internal error !' });
        }

    },

    houseAddPoint: async function(req, res) {
        console.log("POST /api/houses/:id/add-points");
        const { id } = req.params;

        const { points } = req.body;

        if (points == null) {
            return res.status(418).send({ message: 'We need all the parameters !' });
        }

        try {
            await addPointsByHouseId(bddConnection, id, points);

            module.exports.houseDetail(req, res, id);
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: 'Internal error !' });
        }
    },

    addHouse: async function(req, res) {
        console.log("POST /api/houses");
        const { title } = req.body;
        const { score } = req.body;
        const { description } = req.body;

        if (!title || (!score && score != 0) || !description) {
            return res.status(418).send({ message: 'We need all the parameters !' });
        }

        try {
            await addHouse(bddConnection, title, score, description);
            let newHouse = await getHouseByName(bddConnection, title);

            return res.status(201).send(newHouse[0]);
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: 'Internal error !' });
        }
    },

    updateHouse: async function(req, res) {
        console.log("PUT /api/houses/:id");
        const { id } = req.params;

        const { title } = req.body;
        const { score } = req.body;
        const { description } = req.body;

        if (!title || (!score && score != 0) || !description) {
            return res.status(418).send({ message: 'We need all the parameters !' });
        }

        try {
            await updateHouse(bddConnection, id, title, score, description);
            let newHouse = await getHouseById(bddConnection, id);

            return res.status(200).send(newHouse[0]);
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: 'Internal error !' });
        }
    },

    deleteHouse: async function(req, res) {
        console.log("DELETE /api/houses/:id");
        const { id } = req.params;

        try {
            await removeHouseById(bddConnection, id);

            return res.status(202).send({ message: 'Content successfully deleted !' });
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: 'Internal error !' });
        }
    },
}