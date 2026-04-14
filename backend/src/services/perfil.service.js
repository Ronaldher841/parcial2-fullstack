const pool = require('../config/db');

const obtenerPerfilPorUsuarioId = async (usuarioId) => {
  const query = `
    SELECT id, usuario_id, nombre, apellido, edad, correo, telefono
    FROM perfil
    WHERE usuario_id = $1
  `;
  const result = await pool.query(query, [usuarioId]);
  return result.rows[0];
};

const crearPerfil = async ({ usuario_id, nombre, apellido, edad, correo, telefono }) => {
  const query = `
    INSERT INTO perfil (usuario_id, nombre, apellido, edad, correo, telefono)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `;
  const values = [usuario_id, nombre, apellido, edad, correo, telefono];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const actualizarPerfil = async ({ usuario_id, nombre, apellido, edad, correo, telefono }) => {
  const query = `
    UPDATE perfil
    SET nombre = $1,
        apellido = $2,
        edad = $3,
        correo = $4,
        telefono = $5
    WHERE usuario_id = $6
    RETURNING *
  `;
  const values = [nombre, apellido, edad, correo, telefono, usuario_id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

module.exports = {
  obtenerPerfilPorUsuarioId,
  crearPerfil,
  actualizarPerfil
};