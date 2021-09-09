//Imports
import { render } from "@testing-library/react";
import React from "react";
import * as Three from "three";
import { AmbientLight } from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

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

  const renderer = new Three.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  camera.position.setZ(30);

  ///////////////////////////////////////

  //GEOMETRY
  const geometry = new Three.TorusGeometry(10, 3, 16, 100);
  const material = new Three.MeshStandardMaterial({
    color: 0xff6347,
  });
  const torus = new Three.Mesh(geometry, material);

  scene.add(torus);

  ///////////////////////////////////////

  //LIGHT
  const pointLight = new Three.PointLight(0xffffff, 0.5);
  pointLight.position.set(5, 5, 5);

  scene.add(pointLight);

  //SceneLight
  const light = new Three.HemisphereLight(0xffffbb, 0x080820, 1);
  scene.add(light);

  ///////////////////////////////////////

  //Controls
  const controls = new OrbitControls(camera, renderer.domElement);

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
