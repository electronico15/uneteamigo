// adminUserData.js
const sqlite3 = require('sqlite3').verbose();
const moment = require('moment');

const userData = new sqlite3.Database('userData.db');

// Promisify SQLite run method
const run = (query, params) => new Promise((resolve, reject) => {
  userData.run(query, params, function (err) {
    if (err) {
      reject(err);
    } else {
      resolve(this);
    }
  });
});

// Promisify SQLite get method
const get = (query, params) => new Promise((resolve, reject) => {
  userData.get(query, params, function (err, row) {
    if (err) {
      reject(err);
    } else {
      resolve(row);
    }
  });
});

// Crear la tabla de usuarios si no existe
const createTable = () => new Promise((resolve, reject) => {
  userData.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY,
      fechaRegistro TEXT, 
      userId INTEGER,    
      chatId INTEGER, 
      nombreUsuario TEXT,
      nombre TEXT, 
      apellido TEXT
    )
  `, (err) => {
    if (err) {
      reject(err);
    } else {
      resolve();
    }
  });
});

// Función para crear un nuevo usuario
async function crearUsuario(from, chat) {
  try {
    await createTable();

    const fechaRegistro = moment().format('YYYY-MM-DD HH:mm:ss');
    const { id: userId, username: nombreUsuario, first_name: nombre, last_name: apellido } = from;

    // Verificar si el usuario ya existe
    const row = await get('SELECT * FROM usuarios WHERE userId = ?', [userId]);

    if (row) {
      // El usuario ya existe
      console.log('Usuario ya existe:', row);
      return 'existe';
    } else {
      // El usuario no existe, proceder a crearlo
      await run(
        'INSERT INTO usuarios (fechaRegistro, userId, chatId, nombreUsuario, nombre, apellido) VALUES (?, ?, ?, ?, ?, ?)',
        [fechaRegistro, userId, chat.id, nombreUsuario, nombre, apellido]
      );

      console.log('Usuario creado exitosamente.');
      return 'creado';
    }
  } catch (err) {
    console.error('Error al crear/verificar usuario:', err);
    return 'error';
  }
}

// Función para eliminar un usuario por userId
async function eliminarUsuario(userId) {
  try {
    await run('DELETE FROM usuarios WHERE userId = ?', [userId]);
    console.log('Usuario eliminado exitosamente.');
  } catch (err) {
    console.error('Error al eliminar usuario:', err);
  }
}

// Función para modificar un usuario por userId
async function modificarUsuario(userId, nuevosDatos) {
  try {
    await run(
      'UPDATE usuarios SET nombre = ?, apellido = ? WHERE userId = ?',
      [nuevosDatos.nombre, nuevosDatos.apellido, userId]
    );
    console.log('Usuario modificado exitosamente.');
  } catch (err) {
    console.error('Error al modificar usuario:', err);
  }
}

// Función para obtener datos específicos del usuario por userId
async function getUserData(userId) {
  try {
    await createTable();
    const row = await get('SELECT * FROM usuarios WHERE userId = ?', [userId]);

    if (row) {
      // Devolver los datos del usuario
      return row;
    } else {
      // Si el usuario no existe, devolver un mensaje indicando eso
      return Promise.reject('El usuario no existe.');
    }
  } catch (err) {
    console.error('Error al obtener datos del usuario:', err);
    throw err; // Lanzar el error para que se maneje en el código que llama a esta función
  }
}

module.exports = { crearUsuario, eliminarUsuario, modificarUsuario, getUserData };
