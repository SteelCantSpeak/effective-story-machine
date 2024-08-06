import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/addons/libs/stats.module.js';
import * as Objects from './runtime.js'

document.getElementById('resetButton').addEventListener('click', resetScene);
let scene, camera, renderer, controls, clock, stats;


//Create Scene. 
function init(){
    
    //Create Visuals
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.y = 5;
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    Objects.initialiseObjects();

    clock = new THREE.Clock();
    
    controls = new OrbitControls( camera, renderer.domElement );
				controls.listenToKeyEvents( window ); // optional

				//controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

				controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
				controls.dampingFactor = 0.05;

				controls.screenSpacePanning = false;

				controls.minDistance = 10;
				controls.maxDistance = 20;

				controls.maxPolarAngle = Math.PI / 2;
    
                // Create cube
    

stats = new Stats();
				document.body.appendChild( stats.dom );


                scene.add( Objects.group );
                scene.add( Objects.lights );
renderer.setAnimationLoop( animate );
}

// Render loop
function animate() {
    const delta = Math.max(0.00001,clock.getDelta());
	//group.rotation.y += 0.25 * delta;
    Objects.updateObjects( delta);

    controls.update( delta );
    stats.update();
    renderer.render(scene, camera);
}
function resetScene() {
    console.log("Resetting");
    Objects.resetObjects();
  }


// Resize handling
window.addEventListener('resize', function() {
    const aspect = window.innerWidth / window.innerHeight;
    camera.aspect = aspect;
    camera.updateProjectionMatrix();
    
    renderer.setSize(window.innerWidth, window.innerHeight);
});


try {
    init();
  }
  catch(err) {
    console.error("Try again Later, Nerd"+ err);
  }