import React from "react";
import * as THREE from "three";
import OrbitControls from "three-orbitcontrols";
import { Vector3 } from "three";

import style from "./threeCanvas.css";

class ThreeCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.scale = 20;

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.mouseX = 0;
    this.mouseY = 0;

    this.renderer = null;
    this.camera = null;
  }

  getMouseCanvasInfo = event => {
    let canvasBoundingRect = this.mount.children[0].getBoundingClientRect();
    let mouseX = event.clientX - canvasBoundingRect.x;
    let mouseY = event.clientY - canvasBoundingRect.y;
    let isMouseEntryInvalidated = false;

    if (
      mouseX < 0 ||
      mouseX > canvasBoundingRect.x + canvasBoundingRect.width ||
      mouseY < 0 ||
      mouseY > canvasBoundingRect.y + canvasBoundingRect.height
    ) {
      isMouseEntryInvalidated = true;
    }

    return {
      x: mouseX,
      y: mouseY,
      isMouseEntryInvalidated: isMouseEntryInvalidated
    };
  };

  mouseMoveHandler = event => {
    let mouseInfo = this.getMouseCanvasInfo(event);
    if (!mouseInfo.isMouseEntryInvalidated) {
      this.mouseX = mouseInfo.x;
      this.mouseY = mouseInfo.y;
    }
  };

  mouseStartClickHandler = event => {
    let mouseInfo = this.getMouseCanvasInfo(event);

    if (!mouseInfo.isMouseEntryInvalidated) {
      this.mouseX = mouseInfo.x;
      this.mouseY = mouseInfo.y;
    }
  };

  resizeCanvas = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeCanvas);
    this.canvas.dispose();
  }

  componentDidMount() {
    // === THREE.JS CODE START ===
    window.addEventListener("resize", this.resizeCanvas);
    var scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      90,
      this.width / this.height,
      1,
      10000
    );
    this.camera.position.y = 265;
    this.camera.position.x = 3685;
    this.camera.position.z = 4217;
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setClearAlpha(0);
    // Use the ref as a mount point of the Three.js scene;
    this.mount.appendChild(this.renderer.domElement);

    //Add controls
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.keys = {
      LEFT: 37, //left arrow
      UP: 38, // up arrow
      RIGHT: 39, // right arrow
      BOTTOM: 40 // down arrow
    };

    // We have 50 rows and 50 coloums of points and a size of 30 between each point
    var rows = 50;
    var coloumn = 50;
    var spacing = 100;
    var sceneMidddle = new Vector3(
      (coloumn * spacing) / 2,
      0,
      (rows * spacing) / 2
    );

    // Positions is a float array. The data should be perceived as triplets of x, y ,z vector data.
    var positions = new Float32Array(rows * coloumn * 3);
    // Array that holds a float number,
    var scales = new Float32Array(rows * coloumn);

    var tripletStart = 0,
      iy = 0;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < coloumn; j++) {
        positions[tripletStart] = i * spacing;
        positions[tripletStart + 1] = 0;
        positions[tripletStart + 2] = j * spacing;

        scales[iy] = 3;

        tripletStart += 3;
      }
    }

    // Describes the geometry with a BufferGeometry
    var buffGeometry = new THREE.BufferGeometry();
    // Add the buffer geometry attribute position and sets it equal to the positions array and indicates that it each position is indicated by a triplet of coordinates
    buffGeometry.addAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    // Add the buffer geometry attribute scale and set it equal to the scales array.
    buffGeometry.addAttribute("scale", new THREE.BufferAttribute(scales, 1));

    // Pass down a object for material configuring
    var material = new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color(0xffffff) }
      },
      vertexShader: `attribute float scale;

	  void main() {

		  vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );

		  gl_PointSize = scale * ( 300.0 / - mvPosition.z );

		  gl_Position = projectionMatrix * mvPosition;

	  }`,
      fragmentShader: `
	  uniform vec3 color;

	  void main() {

		  if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.475 ) discard;

		  gl_FragColor = vec4( color, 1.0 );

	  }`
    });

    var particles = new THREE.Points(buffGeometry, material);

    scene.add(particles);

    // The animation frame loop

    var amplitude = 60;
    var scaleAmplitude = 16;
    var ticks = 0;
    var smoothingFactor = 0.05;

    var animate = () => {
      // Que the next frame
      requestAnimationFrame(animate);

      // Calculate the difference in mouseY and this.cameraY move this.camera by that amount and multiply a smoothing factor
      this.camera.position.y +=
        ((this.mouseY - window.innerHeight / 2 - 273) * -1 -
          this.camera.position.y) *
        smoothingFactor;

      this.camera.position.x +=
        (this.mouseX - window.innerWidth / 2 + 3685 - this.camera.position.x) *
        smoothingFactor;

      this.camera.lookAt(sceneMidddle);

      // ** DO ALL ANIMATION LOOP LOGIC HERE!
      var vertPosition = particles.geometry.attributes.position.array;
      var vertScale = particles.geometry.attributes.scale.array;

      var i = 0;

      for (let ix = 0; ix < coloumn; ix++) {
        for (let iy = 0; iy < rows; iy++) {
          let xAngle = (ix + ticks) * 0.3;
          let yAngle = (iy + ticks) * 0.5;

          // Set y position of vertices part of triplet i, seeing as it is a triplet the y coordinate will be located dat i + 1 in the triplet x, y ,z
          vertPosition[i + 1] =
            Math.sin(xAngle) * amplitude + Math.sin(yAngle) * amplitude;
          vertScale[ix * coloumn + iy] =
            Math.sin(xAngle) * scaleAmplitude +
            1 +
            Math.sin(yAngle) * scaleAmplitude +
            1;
          i += 3;
        }
      }

      particles.geometry.attributes.position.needsUpdate = true;
      particles.geometry.attributes.scale.needsUpdate = true;
      // Call a render of the scene
      this.renderer.render(scene, this.camera);
      ticks += 0.1;
    };
    animate();
    // === THREE.JS EXAMPLE CODE END ===
  }
  render() {
    return (
      <div
        className="threeBackground"
        onMouseMove={event => this.mouseMoveHandler(event)}
        onMouseDown={event => this.mouseStartClickHandler(event)}
        ref={ref => (this.mount = ref)}
      ></div>
    );
  }
}

export default ThreeCanvas;
