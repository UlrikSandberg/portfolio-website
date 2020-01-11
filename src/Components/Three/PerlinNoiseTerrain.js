import React from "react";
import * as THREE from "three";
import OrbitControls from "three-orbitcontrols";
import { Vector3, Geometry } from "three";
import SimplexNoise from "simplex-noise";
import Matrix from "../../AutonomousAgents/Physics/Matrix";
import map from "../../Utility/ValueMap";

import style from "./threeCanvas.css";
import ThreeCanvas from "./ThreeCanvas";
import { vec2DSub } from "../../AutonomousAgents/Physics/Vector2D";
import { ThreeSixtySharp } from "@material-ui/icons";

class PerlinNoiseTerrain extends React.Component {
  constructor(props) {
    super(props);
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.renderer = null;
    this.camera = null;
  }

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
    let scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      90,
      this.width / this.height,
      1,
      2500
    );
    this.camera.position.y = -910;
    this.camera.position.x = 0.57;
    this.camera.position.z = 407;
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setClearAlpha(0);
    // Use the ref as a mount point of the Three.js scene;
    this.mount.appendChild(this.renderer.domElement);

    //Add controls
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
    controls.autoRotate = true;
    controls.keys = {
      LEFT: 37, //left arrow
      UP: 38, // up arrow
      RIGHT: 39, // right arrow
      BOTTOM: 40 // down arrow
    };

    // We have 50 rows and 50 coloums of points and a size of 30 between each point
    let tileGenerator = new TileGenerator(40, 100, 50, scene);
    tileGenerator.start();

    const animate = () => {
      // Que the next frame
      requestAnimationFrame(animate);

      this.camera.position.y += 7.5;
      //console.log(this.camera.position);
      tileGenerator.update(this.camera.position);

      // Call a render of the scene
      this.renderer.render(scene, this.camera);
    };
    animate();
  }

  render() {
    return (
      <div
        className="threeBackgroundBlack"
        ref={ref => (this.mount = ref)}
      ></div>
    );
  }
}

class TileGenerator {
  constructor(rows, cols, spacing, scene) {
    this.rows = rows;
    this.cols = cols;
    this.spacing = spacing;
    this.simplex = new SimplexNoise();
    this.activeTiles = [];
    this.scene = scene;
    this.tileNumber = 0;
    this.tileSize = rows * spacing;
    this.flying = 0;
  }

  start() {
    this.spawnTile();
    this.spawnTile();
    this.spawnTile();
  }

  update(cameraPosition) {
    if (cameraPosition.y > this.tileSize * (this.tileNumber - 2)) {
      this.spawnTile();
      let disposableTile = this.activeTiles.shift();
      this.scene.remove(disposableTile.getMesh());
    }
  }

  spawnTile() {
    let tile = new Tile(
      this.rows,
      this.cols,
      this.spacing,
      0,
      this.tileSize * this.tileNumber
    );
    this.flying = tile.createTerrain(
      this.simplex,
      this.flying,
      this.activeTiles[this.activeTiles.length - 1]
    );
    console.log(this.activeTiles.length - 1);
    this.scene.add(tile.getMesh());
    this.activeTiles.push(tile);
    this.tileNumber += 1;
  }
}

class Tile {
  constructor(rows, cols, spacing, x, y) {
    this.rows = rows;
    this.cols = cols;
    this.terrain = new Matrix(cols + 1, rows + 1);
    this.terrain.zeroMatrix();

    this.planeGeometry = new THREE.PlaneGeometry(
      cols * spacing,
      rows * spacing,
      cols,
      rows
    );
    this.material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      side: THREE.DoubleSide,
      wireframe: true
    });
    this.mesh = new THREE.Mesh(this.planeGeometry, this.material);
    this.mesh.position.x = x;
    this.mesh.position.y = y;
  }

  createTerrain(simplex, flying, previousTile) {
    let yOffset = flying;
    for (let y = this.rows; y >= 0; y--) {
      let xOffset = 0;
      for (let x = this.cols; x >= 0; x--) {
        let noiseValue = map(
          simplex.noise2D(xOffset, yOffset),
          -1,
          1,
          -200,
          200
        );
        if (noiseValue < -100) {
          noiseValue = -100;
        }
        this.terrain.set(x, y, noiseValue);
        xOffset += 0.05;
      }
      yOffset += 0.05;
    }
    let vertices = this.mesh.geometry.vertices;
    for (let y = 0; y < this.rows + 1; y++) {
      for (let x = 0; x < this.cols + 1; x++) {
        vertices[y * (this.cols + 1) + x].z = this.terrain.get(x, y);
      }
    }
    this.mesh.geometry.verticesNeedUpdate = true;

    if (previousTile) {
      let synchronizers = [];
      for (let i = 0; i < this.cols + 1; i++) {
        synchronizers.push(previousTile.getMesh().geometry.vertices[i]);
      }
      let synchronize = [];
      for (
        let i = vertices.length - (this.cols + 1);
        i <= vertices.length - 1;
        i++
      ) {
        synchronize.push(vertices[i]);
      }
      for (let i = 0; i < synchronize.length; i++) {
        synchronize[i].z = synchronizers[i].z;
      }
    }

    return yOffset;
  }

  getMesh = () => {
    return this.mesh;
  };
}

export default PerlinNoiseTerrain;
