const { getChallengeList, getChallengeById, addChallenge, getChallengeByName, updateChallenge } = require("../controllers/challengesController");

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

    challengeDetail: async function(req, res, bddConnection, id) {
        try {
            let challenge = await getChallengeById(bddConnection, id);

            return res.status(200).send(challenge[0]);
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: 'Internal error !' });
        }
    },

    addChallenge: async function(req, res, bddConnection, title, description, expiration, award, success, winner, idHouse) {
        if (!title || !description) {
            return res.status(418).send({ message: 'We need all the required parameters !' });
        }

        try {
            await addChallenge(bddConnection, title, description, expiration, award, success, winner, idHouse);

            let newChallenge = await getChallengeByName(bddConnection, title);
            return res.status(201).send(newChallenge[0]);
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: 'Internal error !' });
        }
    },

    updateChallenge: async function(req, res, bddConnection, id, title, description, expiration, award, success, winner, idHouse) {
        if (!title || !description) {
            return res.status(418).send({ message: 'We need all the required parameters !' });
        }

        try {
            await updateChallenge(bddConnection, id, title, description, expiration, award, success, winner, idHouse);
            let newChallenge = await getChallengeById(bddConnection, id);

            return res.status(200).send(newChallenge[0]);
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