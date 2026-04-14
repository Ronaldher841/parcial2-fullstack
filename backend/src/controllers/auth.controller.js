const pool = require('../config/db');

const login = async (req, res) => {
  try {
    const { usuarioCorreo, password } = req.body;

    if (!usuarioCorreo || !password) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Todos los campos son obligatorios'
      });
    }

    const query = `
      SELECT id, usuario, correo
      FROM usuarios
      WHERE (usuario = $1 OR correo = $1) AND password = $2
    `;

    const values = [usuarioCorreo, password];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(401).json({
        ok: false,
        mensaje: 'Credenciales incorrectas'
      });
    }

    const usuario = result.rows[0];

    return res.status(200).json({
      ok: true,
      mensaje: 'Login correcto',
      usuario
    });

  } catch (error) {
    console.error('Error en login:', error.message);
    return res.status(500).json({
      ok: false,
      mensaje: 'Error interno del servidor'
    });
  }
};

module.exports = {
  login
};