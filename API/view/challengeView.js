const { getChallengeList, getChallengeById } = require("../controllers/challengesController");

module.exports = {
    challengeList: async function(req, res, bddConnection) {
        let challengeList = await getChallengeList(bddConnection);

        return res.status(200).send(challengeList);
    },

    challengeDetail: async function(req, res, bddConnection, id) {
        let challenge = await getChallengeById(bddConnection, id);

        return res.status(200).send(challenge[0]);
    },

    // addHouse: async function(req, res, bddConnection, title, score, description) {
    //     if (!title || !score || !description) {
    //         return res.status(418).send({ message: 'We need all the parameters !' });
    //     }

    //     await addHouse(bddConnection, title, score, description);

    //     let newHouse = await getHouseByName(bddConnection, title);
    //     return res.status(201).send(newHouse);
    // }

    /**--------------------------------------------------------------------------------------------------- */

    //CLAIM CHALLENGE
    //CRUD
}