import { THREE } from "./three.js/build/three.module";
import { GLTFLoader } from "./three.js/examples/jsm/loaders/GLTFLoader";

const canvas = document.querySelector("webgl"); // The WebGL canvas element
const scene = new THREE.Scene();

// Create a group to contain the GLB model
const modelGroup = new THREE.Group();

const loader = new GLTFLoader();
loader.load(
  "../assets/helicopter.glb",
  function (glb) {
    console.log(glb);

    // Get the center of the GLB model
    const center = glb.scene.getCenter(new THREE.Vector3());

    // Position the GLB model at the center of the group
    glb.scene.position.sub(center);

    // Add the GLB model to the group
    modelGroup.add(glb.scene);

    // Add the group to the scene
    scene.add(modelGroup);
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "loaded");
  },
  function (error) {
    console.log("An error occurred");
  }
);

const light = new THREE.DirectionalLight("0xffffff", 1);
light.position.set(2, 2, 5);
scene.add(light);

// Boiler Plate Code
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  8.1,
  100
);
camera.position.set(0, 1, 2);
scene.add(camera);

const renderer = new THREE.WebGL1Renderer({
  canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.gammaOutput = true;

function animate() {
  // Render the scene every frame
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();