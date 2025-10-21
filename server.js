const express = require('express');
const { Rcon } = require('rcon-client');
const bodyParser = require('body-parser');
const cors = require('cors'); // Para permitir la conexión desde el navegador

// -----------------------------------------------------------------
// ------ 1. TUS DATOS CONFIGURADOS ---------------------------------
// -----------------------------------------------------------------

// Los detalles de RCON de tu "server.properties"
const RCON_HOST = 'sv8.minehost.pro';
const RCON_PORT = 25491;
const RCON_PASSWORD = 'matichaparro202';

// Tu barrera de seguridad
const CODIGO_SECRETO = 'Wv8#k@2!pZ*qR$5n';

// -----------------------------------------------------------------
// ------ 2. CÓDIGO DE LA APLICACIÓN (CORREGIDO) ---------------------
// -----------------------------------------------------------------

const app = express();
app.use(cors()); // Permite las conexiones
app.use(bodyParser.json());

// Esta línea le dice a Express que sirva todos los archivos
// que están dentro de una carpeta llamada "public".
app.use(express.static('public'));

app.post('/add_whitelist', async (req, res) => {
  // --- ¡CORRECCIÓN AQUÍ! ---
  // Estaba escrito "a.body" en lugar de "req.body".
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

  // --- ¡NUEVA MEJORA! ---
  // Comprueba si el nombre de usuario contiene espacios.
  if (username.includes(' ')) {
    console.warn(`[WARN] Intento de registro con espacios en el nombre: '${username}'`);
    return res.status(400).send({ message: 'El nombre de usuario no puede contener espacios.' });
  }

  // Ya no se eliminan los espacios ni otros caracteres.
  const safeUsername = username;
  console.log(`[INFO] Solicitud para añadir a: ${safeUsername}`);

  const rcon = new Rcon({
    host: RCON_HOST,
    port: RCON_PORT,
    password: RCON_PASSWORD,
  });

  try {
    await rcon.connect();
    const response = await rcon.send(`whitelist add ${safeUsername}`);
    
    // Si el servidor responde que el nombre no es válido (por tener espacios, por ejemplo)
    if (response.includes("Invalid username") || response.includes("incorrect")) {
        console.error(`[RCON] Error: El nombre '${safeUsername}' no es válido.`);
        return res.status(400).send({ message: `El nombre '${safeUsername}' no es válido en Minecraft.` });
    }

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