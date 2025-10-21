const express = require('express');
const { Rcon } = require('rcon-client');
const bodyParser = require('body-parser');
const cors = require('cors'); // Para permitir la conexión desde el navegador

// -----------------------------------------------------------------
// ------ 1. ¡CONFIGURA TUS DATOS AQUÍ! -----------------------------
// -----------------------------------------------------------------

// Los detalles de RCON de tu "server.properties"
const RCON_HOST = 'sv8.minehost.pro';
const RCON_PORT = 25491;
const RCON_PASSWORD = 'matichaparro202';

// ¡TU BARRERA DE SEGURIDAD!
// Cámbialo por algo que solo tú y tus amigos sepan.
const CODIGO_SECRETO = 'Wv8#k@2!pZ*qR$5n';

// -----------------------------------------------------------------
// ------ 2. CÓDIGO DE LA APLICACIÓN (No necesitas editar abajo) -----
// -----------------------------------------------------------------

const app = express();
app.use(cors()); // Permite las conexiones
app.use(bodyParser.json());

// Esta línea le dice a Express que sirva todos los archivos
// que están dentro de una carpeta llamada "public".
app.use(express.static('public'));

app.post('/add_whitelist', async (req, res) => {
  const { username, code } = req.body;

  // ----- ¡LA SEGURIDAD! -----
  if (code !== CODIGO_SECRETO) {
    console.warn(`[WARN] Intento fallido de whitelist. Código incorrecto: ${code}`);
    return res.status(403).send({ message: '¡Código de invitación incorrecto!' });
  }
  // -------------------------

  if (!username) {
    return res.status(400).send({ message: 'Se requiere nombre de usuario' });
  }

  const safeUsername = username.replace(/[^a-zA-Z0-9_]/g, '');
  console.log(`[INFO] Solicitud VÁLIDA para añadir a: ${safeUsername}`);

  const rcon = new Rcon({
    host: RCON_HOST,
    port: RCON_PORT,
    password: RCON_PASSWORD,
  });

  try {
    await rcon.connect();
    const response = await rcon.send(`whitelist add ${safeUsername}`);
    console.log(`[RCON] Respuesta: ${response}`);
    res.status(200).send({ message: `¡Felicidades, ${safeUsername}! Has sido añadido.` });
  } catch (error) {
    console.error('[RCON] Error:', error.message);
    res.status(500).send({ message: 'Error de RCON. Contacta a un admin.' });
  } finally {
    await rcon.end();
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`[SERVER] Panel de Whitelist corriendo. Accede en http://localhost:${PORT}`);
});
