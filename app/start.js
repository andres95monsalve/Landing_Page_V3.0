// Configuración del servidor
const app = express();

// Ruta para renderizar la escena
app.get("/", (req, res) => {
  // Renderiza la escena Three.js
  renderer.render(scene, camera);

  // Envia el HTML con la escena
  res.send(`<html><head><title>Three.js scene</title></head><body><canvas id="canvas" width="600" height="400"></canvas></body></html>`);
});

// Escucha el puerto 3000
const server = http.createServer(app);
server.listen(3000, () => {
  console.log("Servidor iniciado en http://localhost:3000");
});

