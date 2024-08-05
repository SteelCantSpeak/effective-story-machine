import * as THREE from 'three';
import * as CANNON from 'cannon-es'
import * as ASS from './Objects/helpers/helpers.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

//Enviro
const group = new THREE.Group();
const lights = new THREE.Group();
let world = new CANNON.World();
//Asigner for Rendering
let blocks = [];


// Child function
function initialiseObjects() {
    // Physics world
    world.gravity.set(0, -9.82, 0);
    

    for (let x = 0; x < 5; x++){
        let block = new ASS.object;
        block.create(
            new THREE.BoxGeometry(),
            new THREE.MeshStandardMaterial({ color: 0xffff00 }),
            new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5)),
            new CANNON.Body({ mass: 1 }),
        );
        
        block.setCanvas(group, world);
        blocks.push(block);
        block.setPosition(0,2+x,0);
    }


    // Platform
    let platform = new ASS.object;
    platform.create(
            new THREE.BoxGeometry(4, 1, 4),
            new THREE.MeshStandardMaterial({ color: 0x808080}),
            new CANNON.Box(new CANNON.Vec3(2, 0.5, 2)),
            new CANNON.Body({ mass: 0 }),
        );
        
        platform.setCanvas(group, world);
        blocks.push(platform);
        platform.setPosition(0,-4.5,-1);

// Lights
const light = new THREE.DirectionalLight( 0xffffff, 1, 100 )
light.position.set(0, 4, 0);
light.castShadow = true;
lights.add(light);

const ambientLight = new THREE.AmbientLight(0xF3F3F3, 0.04); // Soft white light
lights.add(ambientLight);
}

function updateObjects(){
    // Update physics
    world.step(1 / 60);

    for (let i = 0; i < blocks.length; i++) {
        // code block to be executed
        blocks[i].update();
      }
    
}


  export { initialiseObjects, updateObjects, group, lights };