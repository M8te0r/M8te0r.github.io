import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.181.2/build/three.webgpu.js';
import { Fn, color, mx_worley_noise_float, time } from 'https://cdn.jsdelivr.net/npm/three@0.181.2/build/three.tsl.js';
import { PLYLoader } from 'https://cdn.jsdelivr.net/npm/three@0.181.2/examples/jsm/loaders/PLYLoader.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.181.2/examples/jsm/controls/OrbitControls.js';

let renderer, scene, camera;

let projectorLight, lightHelper;

const manager = new THREE.LoadingManager();

// --------------------
// 所有资源加载完成
// --------------------
manager.onLoad = function () {

    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.classList.add('hidden');

    // 等遮罩 fade-out 完成后开始渲染
    setTimeout(() => {
        renderer.setAnimationLoop(animate);
    }, 800);
};

init();

function init() {

    // -------------------
    // Renderer
    // -------------------
    renderer = new THREE.WebGPURenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.NeutralToneMapping;
    renderer.toneMappingExposure = 1;


    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(7, 4, 1);


    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 2;
    controls.maxDistance = 10;
    controls.maxPolarAngle = Math.PI / 2;
    controls.target.set(0, 1, 0);
    controls.update();


    // -------------------
    // Textures / Models 使用同一个 LoadingManager
    // -------------------
    const texLoader = new THREE.TextureLoader(manager).setPath('assets/');


    // Lights
    const causticEffect = Fn(([projectorUV]) => {
        const waterLayer0 = mx_worley_noise_float(projectorUV.mul(10).add(time));
        const caustic = waterLayer0.mul(color(0x5abcd8)).mul(2);
        return caustic;
    });

    const ambient = new THREE.HemisphereLight(0xffffff, 0x8d8d8d, 0.15);
    scene.add(ambient);

    projectorLight = new THREE.ProjectorLight(0xffffff, 100);
    projectorLight.colorNode = causticEffect;
    projectorLight.position.set(2.5, 5, 2.5);
    projectorLight.angle = Math.PI / 6;
    projectorLight.penumbra = 1;
    projectorLight.decay = 2;
    projectorLight.distance = 0;

    projectorLight.castShadow = true;
    projectorLight.shadow.mapSize.set(1024, 1024);
    projectorLight.shadow.camera.near = 1;
    projectorLight.shadow.camera.far = 10;
    projectorLight.shadow.focus = 1;
    projectorLight.shadow.bias = -0.003;
    scene.add(projectorLight);

    lightHelper = new THREE.SpotLightHelper(projectorLight);
    scene.add(lightHelper);


    // Plane
    const planeGeo = new THREE.PlaneGeometry(200, 200);
    const planeMat = new THREE.MeshLambertMaterial({ color: 0xbcbcbc });
    const planeMesh = new THREE.Mesh(planeGeo, planeMat);
    planeMesh.position.set(0, -1, 0);
    planeMesh.rotation.x = -Math.PI / 2;
    planeMesh.receiveShadow = true;
    scene.add(planeMesh);


    // Model (using LoadingManager)
    new PLYLoader(manager).load('assets/Lucy100k.ply', (geometry) => {
        geometry.scale(0.0024, 0.0024, 0.0024);
        geometry.computeVertexNormals();

        const material = new THREE.MeshLambertMaterial();
        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.y = -Math.PI / 2;
        mesh.position.y = 0.8;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        scene.add(mesh);
    });

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {

    const t = performance.now() / 3000;

    projectorLight.position.x = Math.cos(t) * 2.5;
    projectorLight.position.z = Math.sin(t) * 2.5;

    lightHelper.update();

    renderer.render(scene, camera);
}