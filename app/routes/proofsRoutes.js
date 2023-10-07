// Houses routes
const express = require('express');
const { authMid, adminCheckMid } = require('../middlewares/authMiddlewares');
const { proofList, proofDetail, addProof, updateProof, deleteProof, acceptProof, rejectProof } = require('../views/proofsView');
const { upload } = require('../middlewares/storageMiddlewares');
const { imgLimiter } = require('../middlewares/limiterMiddlewares');
const proofsRoutes = express.Router();

proofsRoutes.get('/', authMid, adminCheckMid, proofList);
proofsRoutes.post('/', imgLimiter, upload.single('proofImg'), addProof);

proofsRoutes.get('/:id', authMid, adminCheckMid, proofDetail);
proofsRoutes.put('/:id', authMid, adminCheckMid, updateProof);
proofsRoutes.delete('/:id', authMid, adminCheckMid, deleteProof);

proofsRoutes.post('/:id/accept', authMid, adminCheckMid, acceptProof);
proofsRoutes.post('/:id/reject', authMid, adminCheckMid, rejectProof);

module.exports = proofsRoutes;