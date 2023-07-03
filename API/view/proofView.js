const { DateTime } = require('luxon');

const { getProofList, getProofById, addProof, updateProof, removeProofById } = require("../controllers/proofsController");

module.exports = {
    proofList: async function(req, res, bddConnection) {
        try {
            let proofList = await getProofList(bddConnection);

            return res.status(200).send(proofList);
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: 'Internal error !' });
        }
    },

    proofDetail: async function(req, res, bddConnection) {
        const { id } = req.params;

        try {
            let proof = await getProofById(bddConnection, id);

            return res.status(200).send(proof[0]);
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: 'Internal error !' });
        }
    },

    addProof: async function(req, res, bddConnection) {
        let todayDate = DateTime.local();

        const dateProof = todayDate.toFormat('dd/MM/yyyy HH:mm');
        const accepted = 0;

        const { proofImg } = req.body;
        const { description } = req.body;
        const { challengerName } = req.body;
        const { idHouse } = req.body;
        const { idChallenge } = req.body;

        if (!dateProof || !challengerName || (!idHouse && idHouse != 0) || (!idChallenge && idChallenge != 0)) {
            return res.status(418).send({ message: 'We need all the parameters !' });
        }

        try {
            await addProof(bddConnection, dateProof, proofImg, description, accepted, challengerName, idHouse, idChallenge);
            //let newProof = await getHouseByName(bddConnection, title);/////////////////////////////////////////////

            return res.status(201).send({ message: 'Proof successfully added !' });
            // return res.status(201).send(newHouse[0]);
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: 'Internal error !' });
        }
    },

    updateProof: async function(req, res, bddConnection) {
        const { id } = req.params;

        const { dateProof } = req.body;
        const { proofImg } = req.body;
        const { description } = req.body;
        const { accepted } = req.body;
        const { challengerName } = req.body;
        const { idHouse } = req.body;
        const { idChallenge } = req.body;

        if (!dateProof || !challengerName || (!idHouse && idHouse != 0) || (!idChallenge && idChallenge != 0)) {
            return res.status(418).send({ message: 'We need all the parameters !' });
        }

        try {
            await updateProof(bddConnection, id, dateProof, proofImg, description, accepted, challengerName, idHouse, idChallenge);
            let newProof = await getProofById(bddConnection, id);

            return res.status(200).send(newProof[0]);
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: 'Internal error !' });
        }
    },

    deleteProof: async function(req, res, bddConnection) {
        const { id } = req.params;

        try {
            await removeProofById(bddConnection, id);

            return res.status(202).send({ message: 'Content successfully deleted !' });
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: 'Internal error !' });
        }
    },
}