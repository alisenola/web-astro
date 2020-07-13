// Initialize sketchbook
let world = new Sketchbook.World();

// Load world geometry
LoadExampleWorld();

// Spawn player
let player = world.SpawnCharacter();
LoadBoxmanCharacterModel(player);
player.Control();

// Spawn Bob
let bob = world.SpawnCharacter();
LoadBoxmanCharacterModel(bob);
bob.setBehaviour(new Sketchbook.CharacterAI.FollowCharacter(player));

// Spawn John
let john = world.SpawnCharacter();
LoadBoxmanCharacterModel(john);
john.setBehaviour(new Sketchbook.CharacterAI.Random());



function LoadBoxmanCharacterModel(character) {
    // Default model
    let fbxLoader = new Sketchbook.FBXLoader();
    fbxLoader.load('./build/models/game_man/game_man.fbx', function (object) {

        object.traverse( function ( child ) {
            if ( child.isMesh ) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
            if( child.name == 'game_man') {
                child.material = new THREE.MeshLambertMaterial({
                    map: new THREE.TextureLoader().load('./build/models/game_man/game_man.png'),
                    skinning: true
                });
            }
        } );

        character.setModel(object);
        character.setModelOffset(new THREE.Vector3(0, -0.1, 0));
    } );
}

function LoadExampleWorld() {

    let fbxLoader = new Sketchbook.FBXLoader();
    
    // Ground
    world.createBoxPrimitive({
        mass: 0,
        position: new CANNON.Vec3(0, -1, 0),
        size: new CANNON.Vec3(5,1,5),
        friction:0.3
    });

    // Stuff
    world.createBoxPrimitive({
        mass: 10,
        position: new CANNON.Vec3(-4, 1, 0),
        size: new CANNON.Vec3(1,0.5,4),
        friction:0.3
    });
    world.createBoxPrimitive({
        mass: 10,
        position: new CANNON.Vec3(4, 2, 3),
        size: new CANNON.Vec3(1,2,1),
        friction:0.3
    });

    //planks 
    world.createBoxPrimitive({
        mass: 5,
        position: new CANNON.Vec3(0, 5, 3),
        size: new CANNON.Vec3(4,0.02,0.3),
        friction:0.3
    });
    world.createBoxPrimitive({
        mass: 5,
        position: new CANNON.Vec3(-1, 3, -3),
        size: new CANNON.Vec3(3,0.02,0.3),
        friction:0.3
    });

    fbxLoader.load('./build/models/credits_sign/sign.fbx', function ( object ) {

        object.traverse( function ( child ) {
            
            if ( child.isMesh ) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
            if(child.name == 'grass') {
                child.material = new THREE.MeshLambertMaterial({
                    map: new THREE.TextureLoader().load('./build/models/credits_sign/grass.png'),
                    transparent: true,
                    depthWrite: false,
                    side: THREE.DoubleSide
                });
                child.castShadow = false;
            }
            if(child.name == 'sign') {
                child.material = new THREE.MeshLambertMaterial({
                    map: new THREE.TextureLoader().load('./build/models/credits_sign/sign.png')
                });
            }
            if(child.name == 'sign_shadow') {
                child.material = new THREE.MeshLambertMaterial({
                    map: new THREE.TextureLoader().load('./build/models/credits_sign/sign_shadow.png'),
                    transparent: true,
                });
                child.renderOrder = -1;
            }
            if(child.name == 'credits') {
                child.material = new THREE.MeshLambertMaterial({
                    map: new THREE.TextureLoader().load('./build/models/credits_sign/credits2.png'),
                    transparent: true
                });
            }
        } );

        object.translateZ(4.5);
        object.translateX(-0.5);
        object.rotateY(Math.PI/2);
        world.graphicsWorld.add( object );
        world.createBoxPrimitive({
            mass: 0,
            position: new CANNON.Vec3(object.position.x, object.position.y + 0.45, object.position.z),
            size: new CANNON.Vec3(0.3, 0.45 ,0.1),
            friction: 0.3,
            visible: false
        });

        let object2 = object.clone();
        object2.scale.multiplyScalar(1.7);
        object2.traverse( function ( child ) {
            if(child.name == 'credits') {
                child.material = new THREE.MeshLambertMaterial({
                    map: new THREE.TextureLoader().load('./build/models/credits_sign/credits.png'),
                    transparent: true
                });
                child.translateZ(-0.2);
            }
            if(child.name == 'sign') {
                child.translateZ(-0.2);
            }
        });
        object2.translateZ(1);
        world.graphicsWorld.add(object2);
        world.createBoxPrimitive({
            mass: 0,
            position: new CANNON.Vec3(object2.position.x, object2.position.y + 0.58, object2.position.z),
            size: new CANNON.Vec3(0.4, 0.58 ,0.16),
            friction: 0.3,
            visible: false
        });
    });
}