// Houses routes
const express = require('express');
const { authMid, adminCheckMid } = require('../middlewares/authMiddlewares');
const { challengeList, challengeDetail, addChallenge, updateChallenge, deleteChallenge } = require('../views/challengesView');
const challengesRoutes = express.Router();

challengesRoutes.get('/', challengeList);
challengesRoutes.post('/', authMid, adminCheckMid, addChallenge);

challengesRoutes.get('/:id', challengeDetail);
challengesRoutes.put('/:id', authMid, adminCheckMid, updateChallenge);
challengesRoutes.delete('/:id', authMid, adminCheckMid, deleteChallenge);

module.exports = challengesRoutes;