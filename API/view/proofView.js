const { DateTime } = require('luxon');
const fs = require("fs");
const path = require("path");

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

        // const uint8Array = new Uint8Array(Object.keys(proofImg).map(key => proofImg[key]));
        // const blob = new Blob([uint8Array], { type: 'image/png' });

        try {
            await addProof(bddConnection, dateProof, proofImg, description, accepted, challengerName, idHouse, idChallenge);
            //let newProof = await getHouseByName(bddConnection, title);/////////////////////////////////////////////

            return res.status(201).send({ message: 'Proof successfully added !', proofImg: `${proofImg}` });
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
            let proof = await getProofById(bddConnection, id);
            console.log(proof[0]);
            let fileToDelete = proof[0].proofImg;
            console.log(fileToDelete);
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
        // const filePath = path.join(__dirname, "..", "upload/images", fileName);
        const filePath = path.join(__dirname, "..", "upload/images", fileName);

        // Vérifier si le fichier existe
        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
                // Le fichier n'existe pas, renvoyer une réponse d'erreur
                console.log("File to delete does not exist");
                return -1;
            }

            // Le fichier existe, essayez de le supprimer
            fs.unlink(filePath, (err) => {
                if (err) {
                    // Erreur lors de la suppression du fichier, renvoyer une réponse d'erreur
                    console.log("Error impossible to delete the file");
                    return -1;
                }

                // Suppression réussie, renvoyer une réponse de succès
                console.log("File successfully deleted");
                return 1;
            });
        });
    }
}