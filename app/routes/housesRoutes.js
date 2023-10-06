// Houses routes
const express = require('express');
const { houseList, addHouse, houseDetail, updateHouse, deleteHouse, houseAddPoint } = require('../views/housesView');
const { authMid, adminCheckMid } = require('../middlewares/authMiddlewares');
const housesRoutes = express.Router();

housesRoutes.get('/', houseList);
housesRoutes.post('/', authMid, adminCheckMid, addHouse);

housesRoutes.get('/:id', houseDetail);
housesRoutes.put('/:id', authMid, adminCheckMid, updateHouse);
housesRoutes.delete('/:id', authMid, adminCheckMid, deleteHouse);

housesRoutes.post('/:id/add-points', authMid, adminCheckMid, houseAddPoint);

module.exports = housesRoutes;