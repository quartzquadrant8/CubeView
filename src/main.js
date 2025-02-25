import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import brickTextureURL from './brick.png';
import panelImageURL1 from './js.png';
import panelImageURL2 from './python.png';
import panelImageURL3 from './ruby.png';
import panelImageURL4 from './java.png';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const textureLoader = new THREE.TextureLoader();
const brickTexture = textureLoader.load(brickTextureURL);
const panelTexture1 = textureLoader.load(panelImageURL1);
const panelTexture2 = textureLoader.load(panelImageURL2);
const panelTexture3 = textureLoader.load(panelImageURL3);
const panelTexture4 = textureLoader.load(panelImageURL4);

const geometry = new THREE.BoxGeometry(20, 10, 20);
const material = new THREE.MeshBasicMaterial({ map: brickTexture, side: THREE.BackSide });
const room = new THREE.Mesh(geometry, material);
scene.add(room);

camera.position.set(0, 5, 0);
camera.lookAt(scene.position);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const clickableObjects = [];

const panelGeometry = new THREE.PlaneGeometry(5, 5);
const panelMaterial1 = new THREE.MeshBasicMaterial({ map: panelTexture1, side: THREE.FrontSide });
const panelMaterial2 = new THREE.MeshBasicMaterial({ map: panelTexture2, side: THREE.FrontSide });
const panelMaterial3 = new THREE.MeshBasicMaterial({ map: panelTexture3, side: THREE.FrontSide });
const panelMaterial4 = new THREE.MeshBasicMaterial({ map: panelTexture4, side: THREE.FrontSide });

const panel1 = new THREE.Mesh(panelGeometry, panelMaterial1);
panel1.position.set(0, 5, -9.9);
panel1.link = 'https://www.facebook.com';
room.add(panel1);
clickableObjects.push(panel1);

const panel2 = new THREE.Mesh(panelGeometry, panelMaterial2);
panel2.position.set(9.9, 5, 0);
panel2.rotation.y = -Math.PI / 2;
panel2.link = 'https://www.google.com';
room.add(panel2);
clickableObjects.push(panel2);

const panel3 = new THREE.Mesh(panelGeometry, panelMaterial3);
panel3.position.set(-9.9, 5, 0); // Corrected position
panel3.rotation.y = Math.PI / 2; // Corrected rotation
panel3.link = 'https://www.blender.org/';
room.add(panel3);
clickableObjects.push(panel3);

const panel4 = new THREE.Mesh(panelGeometry, panelMaterial4);
panel4.position.set(0, 5, 9.9); // Corrected position
panel4.rotation.y = Math.PI; // Corrected rotation
panel4.link = 'https://threejs.org/';
room.add(panel4);
clickableObjects.push(panel4);

document.addEventListener('click', onMouseClick);

document.addEventListener('keydown', (event) => {
    if (event.key === 't') {
        console.log('T key pressed');
    }
});

function onMouseClick(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(clickableObjects);

    if (intersects.length > 0) {
        window.open(intersects[0].object.link, '_blank');
    }
}

function animate() {
    requestAnimationFrame(animate);
    room.rotation.y += 0.005;
    controls.update();
    renderer.render(scene, camera);
}

animate();