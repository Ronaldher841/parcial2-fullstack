const perfilService = require('../services/perfil.service');

const validarCorreo = (correo) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(correo);
};

const validarTelefono = (telefono) => {
  const regex = /^\d{8}$/;
  return regex.test(telefono);
};

const validarDatosPerfil = ({ usuario_id, nombre, apellido, edad, correo, telefono }) => {
  if (!usuario_id || !nombre || !apellido || !edad || !correo || !telefono) {
    return 'Todos los campos son obligatorios';
  }

  if (isNaN(edad)) {
    return 'La edad debe ser numérica';
  }

  if (!validarCorreo(correo)) {
    return 'Correo inválido';
  }

  if (!validarTelefono(telefono)) {
    return 'El teléfono debe tener 8 dígitos';
  }

  return null;
};

const getPerfil = async (req, res) => {
  try {
    const { usuario_id } = req.query;

    if (!usuario_id) {
      return res.status(400).json({ ok: false, mensaje: 'usuario_id requerido' });
    }

    const perfil = await perfilService.obtenerPerfilPorUsuarioId(usuario_id);

    return res.json({ ok: true, perfil });

  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, mensaje: 'Error servidor' });
  }
};

const crearPerfil = async (req, res) => {
  try {
    const errorValidacion = validarDatosPerfil(req.body);

    if (errorValidacion) {
      return res.status(400).json({ ok: false, mensaje: errorValidacion });
    }

    const perfil = await perfilService.crearPerfil(req.body);

    res.json({ ok: true, perfil });

  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, mensaje: 'Error servidor' });
  }
};

const actualizarPerfil = async (req, res) => {
  try {
    const errorValidacion = validarDatosPerfil(req.body);

    if (errorValidacion) {
      return res.status(400).json({ ok: false, mensaje: errorValidacion });
    }

    const perfil = await perfilService.actualizarPerfil(req.body);

    res.json({ ok: true, perfil });

  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, mensaje: 'Error servidor' });
  }
};

module.exports = {
  getPerfil,
  crearPerfil,
  actualizarPerfil
};