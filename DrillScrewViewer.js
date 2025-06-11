import * as THREE from 'https://esm.sh/three@0.160.0';
import { OrbitControls } from 'https://esm.sh/three@0.160.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://esm.sh/three@0.160.0/examples/jsm/loaders/GLTFLoader.js';

export class DrillScrewViewer {
  constructor(container) {
    this.container = container;
    this.screw = null;
    this.startHeight = 8;         
    this.screwDepthLimit = 0.3;   
    this.isScrewingIn = true;     

    this.initScene();
    this.loadModel();
    window.addEventListener('resize', () => this.onResize());
    this.animate();
  }

  initScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xf0f0f0);

    const { clientWidth: w, clientHeight: h } = this.container;
    this.camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    this.camera.position.set(0, 2, 25);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(w, h);
    this.container.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;

    const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
    this.scene.add(hemi);
    const dir = new THREE.DirectionalLight(0xffffff, 0.8);
    dir.position.set(5, 10, 7.5);
    this.scene.add(dir);

    // Wide wooden plank
    const woodGeometry = new THREE.BoxGeometry(12, 2, 6); 
    const woodMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    this.wood = new THREE.Mesh(woodGeometry, woodMaterial);
    this.wood.position.y = -1; 
    this.scene.add(this.wood);
  }

  loadModel() {
    const loader = new GLTFLoader();
    loader.load(
      'models/DrillScrew.gltf',
      gltf => {
        this.screw = gltf.scene;
        this.screw.scale.set(0.5, 0.5, 0.5);
        this.screw.rotation.z = Math.PI / 2; 
        this.screw.position.set(0, this.startHeight, 0);
        this.scene.add(this.screw);
      },
      xhr => console.log(`Loading: ${(xhr.loaded / xhr.total * 100).toFixed(1)}%`),
      err => console.error('Error loading model', err)
    );
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    if (this.screw) {
      
      // rotation motion
       if (this.screw.position.y > this.screwDepthLimit) {
        this.screw.rotation.y += 0.05; 
        this.screw.position.y -= 0.01; 
      }

      // Up/down screw motion
      if (this.isScrewingIn && this.screw.position.y > this.screwDepthLimit) {
        this.screw.position.y -= 0.01;
      } else if (!this.isScrewingIn && this.screw.position.y < this.startHeight) {
        this.screw.position.y += 0.01;
      }
    }

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  onResize() {
    const { clientWidth: w, clientHeight: h } = this.container;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  }
}
