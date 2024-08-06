import * as THREE from 'three';
import * as CANNON from 'cannon-es'

function randInt(min, max){
    return Math.floor(Math.random() * (max-min+1)) + min
}

class controller{
    constructor(object, inputmanager = {}, id){
        this.object = object;
        this.inputmanager = inputmanager
        this.id = id;
    }

    assign(object){
        this.object = object;
        this.position = this.object.getPosition()

    }

    checkboundaries(boundaryX, boundaryZ){
        //console.log(this.object.body.position.x+","+this.object.body.position.z)
        // Check boundaries and update rotation state
        if (Math.abs(this.object.body.position.x) > boundaryX || Math.abs(this.object.body.position.z) > boundaryZ) {
            this.object.body.material.fixedRotation = false; // Allow rotation
        } else {
            this.object.body.material.fixedRotation = true; // Lock rotation
        }
    }

    // Move As a Vector3
    move(x,y,z){
        this.position = this.object.getPosition();
        let pos = new CANNON.Vec3(x+ this.position["x"], y+this.position["y"], z+this.position["z"]);
        this.object.setPosition(pos.x, pos.y, pos.z)
    }
    operate(controls, delta){
        const force = new CANNON.Vec3();
            const moveSpeed = 4* delta;
            if (controls.forward) force.z -= moveSpeed;
            if (controls.backward) force.z += moveSpeed;
            if (controls.left) force.x -= moveSpeed;
            if (controls.right) force.x += moveSpeed;

            this.move(force.x,force.y, force.z);
    }
}

class object {
    constructor(mesh, material,physicsmaterial, body) {
        this.mesh = mesh;
        this.material = material;
        this.physicsmaterial = physicsmaterial;
        this.body = body;
    }
    
    create(geometry, material, collider, body) {
        //Cosmetic
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;

        let noFrictionMaterial = new CANNON.Material();
        this.physicsmaterial = new CANNON.ContactMaterial(noFrictionMaterial, noFrictionMaterial, {
            friction: 0, // Set friction to 0
        });        

        //Physic
        this.body = body;
        this.body.material = noFrictionMaterial; // Assign the material with no friction
        this.body.addShape(collider);


    }
    
    setCanvas(parent, physics){
        parent.add(this.mesh);
        physics.addBody(this.body);
        physics.addContactMaterial(this.physicsmaterial);
    }

    resetCanvas(parent, physics){
        parent.remove(this.mesh);
        physics.removeBody(this.body);
        physics.addContactMaterial(this.physicsmaterial);
    }

    setPosition(x,y,z){
        this.body.position.set(x, y, z);
    }
    getPosition(){
        return this.body.position;
    }

    update = ()=> {
        this.mesh.position.copy(this.body.position);
        this.mesh.quaternion.copy(this.body.quaternion);
    }

}

export { randInt, object, controller};