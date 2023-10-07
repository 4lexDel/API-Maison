const { DateTime } = require('luxon');
const fs = require("fs");
const path = require("path");

const { getProofList, getProofById, addProof, updateProof, removeProofById } = require("../controllers/proofsController");
const { getChallengeById, achieveChallenge } = require("../controllers/challengesController");
const { getHouseById, addPointsByHouseId } = require("../controllers/housesController");
const { getDatabaseConnection } = require('../utils/initBDD');

const bddConnection = getDatabaseConnection(); // MYSQL CONNECTOR

module.exports = {
    proofList: async function(req, res) {
        console.log("GET /api/proofs");
        try {
            let proofList = await getProofList(bddConnection);

            return res.status(200).send(proofList);
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: 'Internal error !' });
        }
    },

    proofDetail: async function(req, res) {
        console.log("GET /api/proofs/:id");
        const { id } = req.params;

        try {
            let proof = await getProofById(bddConnection, id);

            return res.status(200).send(proof[0]);
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: 'Internal error !' });
        }
    },

    addProof: async function(req, res) {
        console.log("POST /api/proofs");
        let todayDate = DateTime.local();

        const dateProof = todayDate.toFormat('yyyy-MM-dd HH:mm:ss');

        const accepted = 0;

        const proofImg = req.file.filename;
        const { description } = req.body;
        const { challengerName } = req.body;
        const { idHouse } = req.body;
        const { idChallenge } = req.body;

        if (!proofImg || !dateProof || !challengerName || (!idHouse && idHouse != 0) || (!idChallenge && idChallenge != 0)) {
            return res.status(418).send({ message: 'We need all the parameters !' });
        }

        try {
            let challenge = (await getChallengeById(bddConnection, idChallenge))[0];

            if (!challenge || parseInt(challenge.success) == 1) return res.status(403).send({ 'error': 'Challenge already achieved !' });

            await addProof(bddConnection, dateProof, proofImg, description, accepted, challengerName, idHouse, idChallenge);
            //let newProof = await getHouseByName(bddConnection, title);/////////////////////////////////////////////

            return res.status(201).send({ message: 'Proof successfully added !', proofImg: `${proofImg}` });
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: 'Internal error !' });
        }
    },

    updateProof: async function(req, res) {
        console.log("PUT /api/proofs/:id");
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

    deleteProof: async function(req, res) {
        console.log("DELETE /api/proofs/:id");
        const { id } = req.params;

        try {
            let proof = (await getProofById(bddConnection, id))[0];

            let fileToDelete = proof.proofImg;
            let deleteResult = module.exports.deleteFile(fileToDelete);

            if (deleteResult == -1) return res.status(500).send({ message: 'Internal error !' });

            await removeProofById(bddConnection, id);

            return res.status(202).send({ message: 'Content successfully deleted !' });
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: 'Internal error !' });
        }
    },

    deleteFile: function(fileName) {
        if (!fileName) return -1;
        const filePath = path.join(__dirname, "..", "..", process.env.STORAGE_PATH, fileName);

        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
                console.log("File to delete does not exist");
                return -1;
            }
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.log("Error impossible to delete the file");
                    return -1;
                }
                console.log("File successfully deleted");
                return 1;
            });
        });
    },

    acceptProof: async function(req, res) {
        console.log("POST /api/proofs/:id/accept");

        const { id } = req.params;

        try {
            let proof = (await getProofById(bddConnection, id))[0];

            /**----------- delete proof -------------- */
            let fileToDelete = proof.proofImg;
            let deleteResult = module.exports.deleteFile(fileToDelete);

            if (deleteResult == -1) return res.status(500).send({ message: 'Internal error !' });

            await removeProofById(bddConnection, id);
            /**--------------------------------------- */

            /**----------- select challenge ---------- */
            let challenge = (await getChallengeById(bddConnection, proof.idChallenge))[0];
            if (!challenge) return res.status(500).send({ message: 'Challenge dosn\'t exit !' });

            let award = challenge.award;

            /**----------- Achieve challenge --------- */
            await achieveChallenge(bddConnection, proof.idChallenge);

            /**----------- select house -------------- */
            let house = (await getHouseById(bddConnection, proof.idHouse))[0];
            if (!house) return res.status(500).send({ message: 'House dosn\'t exit !' });

            /**----------- Earn award ---------------- */
            await addPointsByHouseId(bddConnection, proof.idHouse, award);

            return res.status(202).send({ message: 'Proof accepted !' });
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: 'Internal error !' });
        }
    },

    rejectProof: async function(req, res) {
        console.log("POST /api/proofs/:id/reject");

        const { id } = req.params;

        try {
            let proof = (await getProofById(bddConnection, id))[0];

            /**----------- delete proof -------------- */
            let fileToDelete = proof.proofImg;
            let deleteResult = module.exports.deleteFile(fileToDelete);

            if (deleteResult == -1) return res.status(500).send({ message: 'Internal error !' });

            await removeProofById(bddConnection, id);
            /**--------------------------------------- */

            return res.status(202).send({ message: 'Proof rejected !' });
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: 'Internal error !' });
        }
    }
}