const { getProofList, getProofById, addProof, updateProof } = require("../controllers/proofsController");

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

    proofDetail: async function(req, res, bddConnection, id) {
        try {
            let proof = await getProofById(bddConnection, id);

            return res.status(200).send(proof[0]);
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: 'Internal error !' });
        }
    },

    addProof: async function(req, res, bddConnection, dateProof, proofImg, proofDescription, accepted, challengerName, idHouse, idChallenge) {
        if (!dateProof || !challengerName || (!idHouse && idHouse != 0) || (!idChallenge && idChallenge != 0)) {
            return res.status(418).send({ message: 'We need all the parameters !' });
        }

        try {
            await addProof(bddConnection, dateProof, proofImg, proofDescription, accepted, challengerName, idHouse, idChallenge);
            //let newProof = await getHouseByName(bddConnection, title);/////////////////////////////////////////////

            return res.status(201).send({ message: 'Proof successfully add !' });
            // return res.status(201).send(newHouse[0]);
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: 'Internal error !' });
        }
    },

    updateProof: async function(req, res, bddConnection, id, dateProof, proofImg, proofDescription, accepted, challengerName, idHouse, idChallenge) {
        if (!dateProof || !challengerName || (!idHouse && idHouse != 0) || (!idChallenge && idChallenge != 0)) {
            return res.status(418).send({ message: 'We need all the parameters !' });
        }

        try {
            await updateProof(bddConnection, id, dateProof, proofImg, proofDescription, accepted, challengerName, idHouse, idChallenge);
            let newProof = await getProofById(bddConnection, id);

            return res.status(200).send(newProof[0]);
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: 'Internal error !' });
        }
    },
}