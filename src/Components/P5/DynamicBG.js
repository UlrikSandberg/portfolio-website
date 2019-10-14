import React from "react";
import { thisExpression } from "@babel/types";

let windowWidth = 0;
let windowHeight = 0;

export default function(sketch) {
  let particleSystem = null;
  let lastFrameEnd = 0;
  let mousePos = new Vector2d(sketch.mouseX, sketch.mouseY);
  let readyCallback = () => {};

  sketch.setup = () => {
    sketch.createCanvas(windowWidth, windowHeight);
    readyCallback();
    sketch.windowResized();
    particleSystem = new ParticleSystem(20);
  };

  sketch.dispose = () => {
    sketch.remove();
  };

  sketch.pushResize = (width, height) => {
    windowWidth = width;
    windowHeight = height;
  };

  sketch.setReadyCallBack = cb => {
    readyCallback = cb;
  };

  sketch.windowResized = () => {
    sketch.resizeCanvas(windowWidth, windowHeight);
  };

  sketch.mouseClicked = () => {
    if (particleSystem) {
      particleSystem.spawnParticles(mousePos);
    }
  };

  sketch.draw = () => {
    mousePos = new Vector2d(sketch.mouseX, sketch.mouseY);
    let currentFrame = sketch._lastFrameTime; // <-- When did this frame start. This is based on the lastFrameTime
    let deltaT = (currentFrame - lastFrameEnd) / 1000; // <-- Calculate the change in time in millis
    if (deltaT > 1) {
      lastFrameEnd = sketch._lastFrameTime;
      return;
    }
    sketch.background(0, 0, 0, 0.0);
    sketch.clear(); // <-- Resets the background to a white color

    if (particleSystem) {
      particleSystem.process(deltaT, sketch, mousePos); // <-- Ask the particle system to process all particles with respect to the passed time deltaT
      particleSystem.draw(sketch); // <-- Ask the particle system to draw all particles provided the sketch parameter
    }
    lastFrameEnd = sketch._lastFrameTime; // <--- Record when this frame ended so we may calculate the passing of the next frame
  };
}

class ParticleSystem {
  constructor(numberOfParticles) {
    this.particles = [];
    for (let i = 0; i < numberOfParticles; i++) {
      this.particles[i] = new Particle(
        new Vector2d(randInt(0, windowWidth), randInt(0, windowHeight)),
        new Vector2d(
          randIntInRanges(-35, -10, 10, 35),
          randIntInRanges(-35, -10, 10, 35)
        ),
        randInt(2, 4),
        randInt(255, 255)
      );
    }
  }

  spawnParticles(position) {
    for (let i = 0; i < 3; i++) {
      this.particles.push(
        new Particle(
          new Vector2d(position.x, position.y),
          new Vector2d(
            randIntInRanges(35, -20, 20, 35),
            randIntInRanges(-35, -20, 20, 35)
          ),
          randInt(2, 4),
          randInt(255, 255)
        )
      );
    }
  }

  process(deltaT, sketch, mousePos) {
    // Process each particle

    for (let i = 0; i < this.particles.length; i++) {
      let part = this.particles[i];
      let distToMouse = part.distanceToParticle(mousePos);
      //Draw lines to mounts
      if (distToMouse < 200) {
        //sketch.stroke(255 * (1 - distToMouse / 200)); <-- For black values
        sketch.stroke(`rgba(255,255,255,${1 - distToMouse / 200})`);
        sketch.line(part.position.x, part.position.y, mousePos.x, mousePos.y);
        //Gravitate the particles slightly towards in the direction of the mouse
        let gravitationalDirection = mousePos.subtractCopy(part.position);
        // Normalize the direction vector to one
        gravitationalDirection.normalize();
        // Now scale the gravitational force accordingly to how close we are
        let magnitude = (1 - distToMouse / 200) * 35;
        gravitationalDirection.multiply(magnitude);
        //Apply the force to the particle
        part.applyForce(gravitationalDirection);
      }

      //Draw lines to other particles
      for (let j = i + 1; j < this.particles.length; j++) {
        let adjacentPart = this.particles[j];
        let distance = part.distanceToParticle(adjacentPart.position);
        if (distance < 100) {
          // Should draw a line between the two particles
          //sketch.stroke(255 * (1 - distance / 100)); <-- Black values
          sketch.stroke(`rgba(255,255,255,${1 - distance / 100})`);
          sketch.line(
            part.position.x,
            part.position.y,
            adjacentPart.position.x,
            adjacentPart.position.y
          );
        }
      }
    }

    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].process(deltaT);
    }
  }

  draw(sketch) {
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].draw(sketch);
    }
  }
}

class Vector2d {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(vector2d) {
    this.x += vector2d.x;
    this.y += vector2d.y;
  }

  subtract(vector2d) {
    this.x -= vector2d.x;
    this.y -= vector2d.y;

    return this;
  }

  subtractCopy(vector2d) {
    return this.copy().subtract(vector2d);
  }

  copy() {
    return new Vector2d(this.x, this.y);
  }

  weigthedAdd(vector2d, scale) {
    this.x += vector2d.x * scale;
    this.y += vector2d.y * scale;
  }

  multiply(scale) {
    this.x *= scale;
    this.y *= scale;
  }

  divide(scale) {
    if (scale === 0.0) {
      return;
    }
    this.x /= scale;
    this.y /= scale;
  }

  invert() {
    this.multiply(-1);
  }

  magnitude() {
    var absX = Math.abs(this.x);
    var absY = Math.abs(this.y);

    return Math.sqrt(absX * absX + absY * absY);
  }

  limit(max) {
    if (this.magnitude() > max) {
      this.normalize();
      this.multiply(max);
    }
  }

  normalize() {
    let magnitude = this.magnitude();
    if (magnitude !== 0.0) {
      this.divide(magnitude);
    }
  }
}

class Particle {
  constructor(position, velocity, radius, color) {
    this.position = position;
    this.velocity = velocity;
    this.acceleration = new Vector2d(0, 0);
    this.radius = radius;
    this.diameter = radius * 2;
    this.color = color;
  }

  process(deltaT) {
    this.velocity.weigthedAdd(this.acceleration, deltaT);
    this.position.weigthedAdd(this.velocity, deltaT);

    if (this.position.x < 0) {
      this.position.x = windowWidth;
    }
    if (this.position.x > windowWidth) {
      this.position.x = 0;
    }

    if (this.position.y > windowHeight) {
      this.position.y = 0;
    }

    if (this.position.y < 0) {
      this.position.y = windowHeight;
    }

    this.acceleration.multiply(0);
  }

  applyForce(vector2d) {
    this.acceleration.add(vector2d);
  }

  draw(sketch) {
    sketch.noStroke();
    sketch.fill(this.color, this.color, this.color);
    sketch.ellipse(
      this.position.x,
      this.position.y,
      this.diameter,
      this.diameter
    );
  }

  distanceToParticle(position) {
    return this.position.subtractCopy(position).magnitude();
  }
}

const randInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const randIntInRanges = (min, max, min2, max2) => {
  return Math.random() < 0.5 ? randInt(min, max) : randInt(min2, max2);
};
