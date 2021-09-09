//Imports
import React from "react";
import * as Three from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { LightProbeGenerator } from "three/examples/jsm/lights/LightProbeGenerator";

import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

//CSS
import "./scene.css";

type sceneProps = {
  style?: React.CSSProperties;
};

const Scene: React.FC<sceneProps> = () => {
  //Basics
  const scene = new Three.Scene();

  const camera = new Three.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const renderer = new Three.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  camera.position.setZ(10);

  // tone mapping
  renderer.toneMapping = Three.NoToneMapping;
  renderer.outputEncoding = Three.sRGBEncoding;

  ///////////////////////////////////////

  //GEOMETRY

  const torusGeo = new Three.TorusGeometry(10, 3, 16, 100);
  const torusMat = new Three.MeshStandardMaterial({ color: 0xff6347 });
  const torusMesh = new Three.Mesh(torusGeo, torusMat);

  ///////////////////////////////////////

  //LIGHT
  const pointLight = new Three.PointLight(0xffffff, 1);
  pointLight.position.set(5, 5, 5);
  //scene.add(pointLight);

  //Light
  const ambientLight = new Three.AmbientLight(0xffffff, 0.1);
  //scene.add(ambientLight);

  //PROBE
  const lightProbe = new Three.LightProbe();
  //scene.add(lightProbe);

  //ENV MAP
  new RGBELoader().setPath("assets/hdri/").load(
    "fondo.hdr",
    function (texture) {
      const loader = new GLTFLoader();
      loader.load(
        "assets/object/scene.gltf",
        function (gltf) {
          scene.add(gltf.scene);
        },
        undefined,
        function (error) {
          console.error(error);
        }
      );

      texture.mapping = Three.EquirectangularReflectionMapping;

      scene.background = texture;
      scene.environment = texture;
    },
    function (load) {
      console.log(load);
    },
    function (error) {
      console.error(error);
    }
  );

  ///////////////////////////////////////

  //Controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 8;
  controls.maxDistance = 10;
  controls.enablePan = false;

  //Function that reload
  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }
  animate();

  return <></>;
};

export default Scene;
