import { THREE } from "./three.js/build/three.module.js";
import { GLTFLoader } from "./three.js/examples/jsm/loaders/GLTFLoader.js";
import express from "express";

const canvas = document.querySelector("webgl"); // The WebGL canvas element
const scene = new THREE.Scene();

// Create a group to contain the GLB model
const modelGroup = new THREE.Group();

const loader = new GLTFLoader();
loader.loadAsync(
  "../assets/helicopter.glb",
  (gltf) => {
    console.log(gltf);

    // Get the center of the GLTF model
    const center = gltf.scene.getCenter(new THREE.Vector3());

    // Position the GLTF model at the center of the group
    gltf.scene.position.sub(center);

    // Add the GLTF model to the group
    modelGroup.add(gltf.scene);

    // Add the group to the scene
    scene.add(modelGroup);
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  (error) => {
    console.log("An error occurred: ", error);
  }
);

// Add a light to the scene
const light = new THREE.DirectionalLight("0xffffff", 1);
light.position.set(2, 2, 5);
scene.add(light);

// Set up the camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(0, 1, 2);
scene.add(camera);

// Set up the renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.gammaOutput = true;

// Start the web server
const app = express();

app.get('/', (req, res) => {
  // Render the Three.js scene here
  renderer.render(scene, camera);
  res.send('<h1>Three.js scene</h1>');
});

const server = http.createServer(app);
server.listen(3000, () => {
  console.log('Servidor iniciado en http://localhost:3000');
});
