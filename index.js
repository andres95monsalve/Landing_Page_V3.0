// index.js

import * as THREE from "three";
import { GLTFLoader } from "./src/js/three.js/examples/jsm/loaders/GLTFLoader.js";
import express from "express";

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

// Configuración de la escena Three.js
const canvas = document.querySelector("canvas"); // El elemento canvas WebGL
const scene = new THREE.Scene();

// Crea un grupo para contener el modelo GLB
const modelGroup = new THREE.Group();

// Carga el modelo GLB
const loader = new GLTFLoader();
loader.loadAsync(
  ".src/assets/helicopter.glb",
  (gltf) => {
    console.log(gltf);

    // Obtiene el centro del modelo GLB
    const center = gltf.scene.getCenter(new THREE.Vector3());

    // Posiciona el modelo GLB en el centro del grupo
    gltf.scene.position.sub(center);

    // Agrega el modelo GLB al grupo
    modelGroup.add(gltf.scene);

    // Agrega el grupo a la escena
    scene.add(modelGroup);
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + "% cargado");
  },
  (error) => {
    console.log("Ocurrió un error: ", error);
  }
);

// Agrega una luz a la escena
const light = new THREE.DirectionalLight("0xffffff", 1);
light.position.set(2, 2, 5);
scene.add(light);

// Configura la cámara
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(0, 1, 2);
scene.add(camera);

// Configura el renderizador
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.gammaOutput = true;

// Renderiza la escena
function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

// Inicia la renderización
render();

// Declaracion de exportacion
export { default as app } from "./app";

// Configuración del módulo app

import { start } from "./app/start.js";

export { start };
