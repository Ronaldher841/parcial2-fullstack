const express = require('express');
const router = express.Router();
const perfilController = require('../controllers/perfil.controller');

router.get('/perfil', perfilController.getPerfil);
router.post('/perfil', perfilController.crearPerfil);
router.put('/perfil', perfilController.actualizarPerfil);

module.exports = router;