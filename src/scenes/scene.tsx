//Imports
import React from "react";
import * as Three from "three";

//CSS
import "./scene.css";

type sceneProps = {
  style?: React.CSSProperties;
};

const Scene: React.FC<sceneProps> = () => {
  const scene = new Three.Scene();

  const camera = new Three.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const renderer = new Three.WebGLRenderer({
    canvas: document.getElementById("#bg"),
  });

  return <canvas id="bg"></canvas>;
};

export default Scene;
