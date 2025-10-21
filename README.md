# 🧱 Panel Web de Whitelist para ManicomioLAND

Este proyecto es una aplicación web simple pero potente, creada con **Node.js**, que permite a los jugadores añadirse a la whitelist de un servidor de **Minecraft** de forma segura mediante un **código de invitación**.  
La interfaz está diseñada para imitar la estética del juego, ofreciendo una experiencia inmersiva para los usuarios.

---


## ⚙️ Instalación y Configuración

### 1️⃣ Clonar o Descargar el Repositorio

Descargá los archivos y colocalos en una carpeta en tu servidor o PC.  
La estructura de carpetas debe ser la siguiente:

```
/tu-proyecto-whitelist/
├── public/
│   └── index.html
└── server.js
```

> 💡 **Importante:** el archivo `index.html` debe estar dentro de la carpeta `public` para que el servidor pueda encontrarlo.

---

### 2️⃣ Instalar Dependencias

Abrí una terminal en la carpeta principal (`/tu-proyecto-whitelist/`) y ejecutá:

```bash
npm install express rcon-client body-parser cors
```

---

### 3️⃣ Configurar tus Datos

Abrí el archivo `server.js` y modificá las constantes del inicio:

```js
// Los detalles de RCON de tu "server.properties"
const RCON_HOST = '127.0.0.1'; // Déjalo así si corre en la misma máquina que el server
const RCON_PORT = 25575;
const RCON_PASSWORD = 'TU_CONTRASEÑA_RCON_AQUI';

// ¡TU BARRERA DE SEGURIDAD!
// Cámbialo por un código secreto para tus jugadores.
const CODIGO_SECRETO = 'minecraft-secreto-123';
```

> ⚠️ Asegurate de que la `RCON_PASSWORD` coincida exactamente con la del `server.properties`.

---

## ▶️ Cómo Ejecutar la Aplicación

Tenés dos formas de iniciar el servidor:

### 🧪 A) Modo Desarrollo (en tu PC)

```bash
node server.js
```

El panel estará disponible en tu navegador en:

👉 [http://localhost:3000](http://localhost:3000)

---

### ☁️ B) Producción (en un Servidor/VPS)

Es recomendable usar **pm2** para mantener la app corriendo 24/7 y que se reinicie automáticamente si falla.

```bash
# 1. Instalar pm2 globalmente (solo la primera vez)
npm install -g pm2

# 2. Iniciar la aplicación con pm2
pm2 start server.js --name "WhitelistPanel"

# 3. (Opcional) Ver los logs
pm2 logs WhitelistPanel
```

La página estará disponible en:

👉 `http://<IP_DE_TU_SERVIDOR>:3000`

---

## 🧰 Mantenimiento y Consejos

- Si modificás `server.js`, recordá reiniciar el proceso con:
  ```bash
  pm2 restart WhitelistPanel
  ```
- Usá contraseñas seguras en el RCON y el código secreto.  
- Si tu servidor usa un firewall, abrí el puerto **25575** para RCON.

---

## 💚 Créditos

Proyecto creado para la comunidad de **ManicomioLAND**  
Desarrollado con amor por jugadores, para jugadores. 🎮


pm2 start server.js --name "WhitelistPanel"

# 3. (Opcional) Para ver los logs
pm2 logs WhitelistPanel
La página estará disponible en http://<IP_DE_TU_SERVIDOR>:3000.
