/// <reference path="Libraries/three.js" />

//import { Mesh } from "./Libraries/three";

//Author: Xiaoliang Wang
//Date:   January 16, 2020
//filename: 01-basic-scene.js


//declare recurring variables
let scene;
let renderer;
let camera;

let ring;
let sphere;
let cube;
let control;

function init() {
    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xaaffaa);
    document.body.appendChild(renderer.domElement);
}

//createCameraAndLights
function createCameraAndLights() {
    //create the camera
    camera = new THREE.PerspectiveCamera(
        45,                                     //camera angle
        window.innerWidth / window.innerHeight, //shape of the output
        0.1,                                    //near point
        1000                                     //far point
    );
    camera.position.set(-30, 40, 30);
    camera.lookAt(scene.position);
}

//createGeometry
function createGeometry() {
    let axes = new THREE.AxesHelper(10);
    axes.position.set(0,-10,0);
    scene.add(axes);

    //box 
    var boxGeo = new THREE.BoxGeometry(3,3,3,1,1,1);
    var boxmaterial = new THREE.MeshBasicMaterial({ color: 0xFFaa00, wireframe: true });
    cube = new THREE.Mesh(boxGeo, boxmaterial);
    cube.position.set(10, 10, 10);
    scene.add(cube);

    var sphereGeo = new THREE.SphereGeometry(4, 15, 15,4);
    var sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x0012bb, wireframe: true });
     sphere = new THREE.Mesh(sphereGeo, sphereMaterial);
    sphere.position.set(-10, 20, 8);
    scene.add(sphere);


    var ringGeo= new THREE.TorusGeometry(8, 3, 16, 50);
    var ringMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffee });
     ring = new THREE.Mesh(ringGeo, ringMaterial);
    ring.position.set(0, -10, -20);
    scene.add(ring);

}

function setupDatGui() {
    //the object that is used bu dat.GUI
    control = new function () {
        this.deltaX = 0;
    };
    let gui = new dat.GUI();
    gui.add(control, 'deltaX', -5, 5);
}

//render
function render() {
    requestAnimationFrame(render);
    sphere.position.y = control.deltaX;
    ring.position.x = control.deltaX;
    cube.position.z = control.deltaX;
    renderer.render(scene, camera);
}

window.onload = function () {
    this.init();
    this.createCameraAndLights();
    this.createGeometry();
    this.setupDatGui();
    this.render();
}