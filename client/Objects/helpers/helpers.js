import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

class object {
    constructor(mesh, material, body) {
        this.mesh = mesh;
        this.material = material;
        this.body = body;
    }
    
    create(geometry, material, collider, body) {
        //Cosmetic
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;

        //Physic
        this.body = body;
        this.body.addShape(collider);
    }
    
    setCanvas(parent, physics){
        parent.add(this.mesh);
        physics.addBody(this.body);
    }

    setPosition(x,y,z){
        this.body.position.set(x, y, z);
    }

    update = ()=> {
        this.mesh.position.copy(this.body.position);
        this.mesh.quaternion.copy(this.body.quaternion);
    }
}



export { object};