import React from "react";
import * as THREE from "three";

class ThreeCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.scale = 20;

    this.width = 600;
    this.height = 600;

    this.cols = this.width / this.scale;
    this.rows = this.height / this.scale;
  }

  componentDidMount() {
    // === THREE.JS CODE START ===
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
      90,
      this.width / this.height,
      0.1,
      1000
    );
    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(this.width, this.height);
    // Use the ref as a mount point of the Three.js scene;
    this.mount.appendChild(renderer.domElement);

    var geometry = new THREE.Geometry();

    geometry.vertices.push(new THREE.Vector3(600, 600, 0));
    geometry.vertices.push(new THREE.Vector3(0, 0, 0));

    var material = new THREE.LineBasicMaterial({ color: 0xffffff });

    var line = new THREE.Line(geometry, material);

    scene.add(line);

    camera.position.z = 1000;

    var animate = function() {
      requestAnimationFrame(animate);

      renderer.render(scene, camera);
    };
    animate();
    // === THREE.JS EXAMPLE CODE END ===
  }
  render() {
    return <div ref={ref => (this.mount = ref)}></div>;
  }
}

export default ThreeCanvas;
