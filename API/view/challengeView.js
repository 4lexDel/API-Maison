const { getChallengeList, getChallengeById, addChallenge, getChallengeByName, updateChallenge, removeChallengeById } = require("../controllers/challengesController");

module.exports = {
    challengeList: async function(req, res, bddConnection) {
        try {
            let challengeList = await getChallengeList(bddConnection);

            return res.status(200).send(challengeList);
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: 'Internal error !' });
        }
    },

    challengeDetail: async function(req, res, bddConnection) {
        const { id } = req.params;

        try {
            let challenge = await getChallengeById(bddConnection, id);

            return res.status(200).send(challenge[0]);
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: 'Internal error !' });
        }
    },

    addChallenge: async function(req, res, bddConnection) {
        const { title } = req.body;
        const { description } = req.body;
        const { expiration } = req.body;
        const { award } = req.body;
        const { success } = req.body;

        if (!title || !description) {
            return res.status(418).send({ message: 'We need all the required parameters !' });
        }

        try {
            await addChallenge(bddConnection, title, description, expiration, award, success);

            let newChallenge = await getChallengeByName(bddConnection, title);
            return res.status(201).send(newChallenge[0]);
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: 'Internal error !' });
        }
    },

    updateChallenge: async function(req, res, bddConnection) {
        const { id } = req.params;

        const { title } = req.body;
        const { description } = req.body;
        const { expiration } = req.body;
        const { award } = req.body;
        const { success } = req.body;

        if (!title || !description) {
            return res.status(418).send({ message: 'We need all the required parameters !' });
        }

        try {
            await updateChallenge(bddConnection, id, title, description, expiration, award, success);
            let newChallenge = await getChallengeById(bddConnection, id);

            return res.status(200).send(newChallenge[0]);
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: 'Internal error !' });
        }
    },

    deleteChallenge: async function(req, res, bddConnection) {
        const { id } = req.params;

        try {
            await removeChallengeById(bddConnection, id);

            return res.status(202).send({ message: 'Content successfully deleted !' });
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: 'Internal error !' });
        }
    },
    /**--------------------------------------------------------------------------------------------------- */

    //CLAIM CHALLENGE
    //CRUD
}


//safe 
/**
 * try {
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Internal error !' });
    }
 */