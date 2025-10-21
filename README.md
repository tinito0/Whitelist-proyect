# Panel Web de Whitelist para ManicomioLAND


## ⚙️ Instalación y Configuración

### 1️⃣ Clonar o Descargar el Repositorio

Descargá los archivos y colocalos en una carpeta en tu servidor o PC.  

---

### 2️⃣ Instalar Dependencias

Abrí una terminal en la carpeta principal (`/tu-proyecto-whitelist/`) y ejecutá:

```bash
npm install express rcon-client body-parser cors
```

---

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
La página estará disponible en http://<IP_DE_TU_SERVIDOR>:80.
