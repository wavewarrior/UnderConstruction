import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


        var canvas = document.getElementById('canvas');

        const loadingManager= new THREE.LoadingManager();
        const loader = new GLTFLoader(loadingManager);
        const clock = new THREE.Clock();


        // Set up scene
        const scene = new THREE.Scene();
        var mixer = new THREE.AnimationMixer();
        scene.background = new THREE.Color("rgb(15,15,15)");

        const directLight = new THREE.DirectionalLight(0xffffff, 0.5);
        const ambientLight = new THREE.AmbientLight(0xfffffff,0.5);
        scene.add(directLight);
        scene.add(ambientLight);

        // Set up camera
        const camera = new THREE.PerspectiveCamera(30, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
        camera.position.z = 5;

        // Set up renderer
        const renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setSize(canvas.clientWidth-20, canvas.clientHeight-20);
        canvas.appendChild(renderer.domElement);

        
        // Load 3D model
        loader.load('/UnderConstruction.glb', function (gltf) {
            var model = gltf.scene;
           
            mixer = new THREE.AnimationMixer( model );
            var action = mixer.clipAction(gltf.animations[0]);
            action.play();
            scene.add(model);
        });

        // Set up controls
        const controls = new OrbitControls( camera, renderer.domElement );

        // Handle window resize
        window.addEventListener('resize', function () {
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(canvas.clientWidth-20, canvas.clientHeight-20);
        }, false);

        loadingManager.onLoad = () => {


        }
        
        // Update the mixer on each frame
        // function update () {
        //     mixer.update( deltaSeconds );
        // }


        // Animation loop
        function animate() {
            var deltaSeconds = clock.getDelta();
            requestAnimationFrame(animate);
            mixer.update( deltaSeconds );
            controls.update();
            renderer.render(scene, camera);
        }

        animate();