import * as THREE from 'three';
import * as CANNON from 'cannon-es'
import * as ASS from './Objects/helpers.js';


//Enviro
let group = new THREE.Group();
let lights = new THREE.Group();
let world = new CANNON.World();
//Asigner for Rendering
let blocks = [];
let ctr = new ASS.controller();


// Keyboard controls
let controls = {
    forward: false,
    backward: false,
    left: false,
    right: false
};

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'w': controls.forward = true; break;
        case 's': controls.backward = true; break;
        case 'a': controls.left = true; break;
        case 'd': controls.right = true; break;
    }
});

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'w': controls.forward = false; break;
        case 's': controls.backward = false; break;
        case 'a': controls.left = false; break;
        case 'd': controls.right = false; break;
    }
});

function resetObjects(){

    for (let index = 0; index < blocks.length; index++) {
        blocks[index].resetCanvas(group, world)
     }
     blocks = [];
    lights = new THREE.Group();

    console.log("Resset");
    initialiseObjects();
}

// Child function
function initialiseObjects() {
    // Physics world
    world.gravity.set(0, -9.82, 0);
    
        let block = new ASS.object;
        block.create(
            new THREE.BoxGeometry(),
            new THREE.MeshStandardMaterial({ color: 0xffff00 }),
            new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5)),
            new CANNON.Body({ 
                mass: 50,
                linearDamping: 0.1, // Add linear damping to prevent excessive velocity
                angularDamping: 0.1  // Add angular damping to prevent excessive spinning
             }),
        );
        
        block.setCanvas(group, world);
        blocks.push(block);
        block.setPosition(0,2,0);

        //Rando Blocks
        for (let i = 0; i < 5; i++){
            let block = new ASS.object;
        block.create(
            new THREE.BoxGeometry(),
            new THREE.MeshStandardMaterial({ color: 0xff0000 }),
            new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5)),
            new CANNON.Body({ 
                mass: 1,
             }),
        );
        
        block.setCanvas(group, world);
        blocks.push(block);
        let x = ASS.randInt(-4, 4);
        let y = ASS.randInt(-4, 4);
        console.log("X:"+x + "Y:" +y);
        block.setPosition(x, 2, y);
        }

    // Platform
    let platform = new ASS.object;
    platform.create(
            new THREE.BoxGeometry(10, 1, 10),
            new THREE.MeshStandardMaterial({ color: 0x808080}),
            new CANNON.Box(new CANNON.Vec3(5, 0.5, 5)),
            new CANNON.Body({ mass: 0 }),
        );
        
    platform.setCanvas(group, world);
    blocks.push(platform);
    platform.setPosition(0,-0.5,-1);
    ctr.assign(block);
        

// Lights
const light = new THREE.DirectionalLight( 0xffffff, 1, 100 )
light.position.set(0, 4, 0);
light.castShadow = true;
lights.add(light);

const ambientLight = new THREE.AmbientLight(0xF3F3F3, 0.5); // Soft white light
lights.add(ambientLight);
}

function updateObjects(delta){
    // Update physics
    world.step(1/60);

    for (let i = 0; i < blocks.length; i++) {
        // code block to be executed
        blocks[i].update();
        if (blocks[i].getPosition().y < -5){
            if(blocks[i] == ctr.object){
                resetObjects()
            } else{
                blocks[i].resetCanvas(group, world)
            }
        }
    }
    
      ctr.operate(controls, Math.max(delta,0.00001));
      ctr.checkboundaries(2,2);

}

  export { initialiseObjects,resetObjects, updateObjects, group, lights };