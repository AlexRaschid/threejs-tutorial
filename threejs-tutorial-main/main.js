import * as THREE from 'three'; //Docs: https://threejs.org/docs/
import './style.css';

//Scene
const scene = new THREE.Scene();

//Create the shape: this case a sphere
const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
  color: "#00ff83",
});

const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

//Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}


//Light
const light = new THREE.PointLight(0xffffff, 70 , 100);
light.position.set(0, 10, 10);//x, y, z
scene.add(light);

//Camera
const camera = new THREE.PerspectiveCamera(
  45, 
  sizes.width / sizes.height, 
  0.1, 
  100
);
camera.position.z = 20;
scene.add(camera);

//Renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);


//Resize
window.addEventListener("resize", () => {
  //Update Sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  //Update Camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
})

//Animation, rerendering the scene
const loop = () => {
    renderer.render(scene, camera);
    window.requestAnimationFrame(loop);
};
loop();