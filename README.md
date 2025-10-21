⚙️ Instalación y ConfiguraciónSigue estos pasos para poner en marcha el panel:1. Clona o Descarga el RepositorioDescarga los archivos y colócalos en una carpeta en tu servidor o PC. La estructura de carpetas debe ser la siguiente:/tu-proyecto-whitelist/
├── public/
│   └── index.html
└── server.js
Importante: Es crucial que el archivo index.html esté dentro de la carpeta public para que el servidor pueda encontrarlo.2. Instala las DependenciasAbre una terminal en la carpeta principal (tu-proyecto-whitelist/) y ejecuta el siguiente comando para instalar las librerías necesarias:npm install express rcon-client body-parser cors
3. Configura tus DatosAbre el archivo server.js con un editor de texto y modifica las constantes que están al principio:// Los detalles de RCON de tu "server.properties"
const RCON_HOST = '127.0.0.1'; // Déjalo así si corre en la misma máquina que el server
const RCON_PORT = 25575;
const RCON_PASSWORD = 'TU_CONTRASEÑA_RCON_AQUI';

// ¡TU BARRERA DE SEGURIDAD!
// Cámbialo por un código secreto para tus jugadores.
const CODIGO_SECRETO = 'minecraft-secreto-123';
Asegúrate de que la RCON_PASSWORD coincida exactamente con la de tu server.properties.▶️ Cómo Ejecutar la AplicaciónTienes dos maneras de iniciar el servidor:A) Para Probar en tu PC (Modo Desarrollo):Abre una terminal en la carpeta del proyecto y ejecuta:node server.js
El panel estará disponible en tu navegador en la dirección http://localhost:3000.B) Para que Funcione 24/7 (En un Servidor/VPS):Es recomendable usar un gestor de procesos como pm2 para que la aplicación se mantenga corriendo y se reinicie sola si falla.# 1. Instala pm2 globalmente (solo la primera vez)
npm install -g pm2

# 2. Inicia tu aplicación con pm2
pm2 start server.js --name "WhitelistPanel"

# 3. (Opcional) Para ver los logs
pm2 logs WhitelistPanel
La página estará disponible en http://<IP_DE_TU_SERVIDOR>:3000.
