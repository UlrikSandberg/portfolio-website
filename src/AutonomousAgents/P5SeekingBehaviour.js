import React from "react";
import { thisExpression } from "@babel/types";
import { number } from "prop-types";
import Vector2D from "./Physics/Vector2D";
import Body from "./Physics/Body";
import { vec2DSub, radiToAngle, distance2D } from "./Physics/Vector2D";

let windowWidth = 0;
let windowHeight = 0;

export default function(sketch) {
  let particleSystem = null;
  let lastFrameEnd = 0;

  let mousePos = new Vector2D(sketch.mouseX, sketch.mouseY);
  let readyCallback = () => {};

  sketch.setup = () => {
    sketch.createCanvas(windowWidth, windowHeight);
    readyCallback();
    sketch.windowResized();
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

  var vehicle = new Vehicle(50, 50, 750, 50000);

  sketch.draw = () => {
    mousePos = new Vector2D(sketch.mouseX, sketch.mouseY);
    let currentFrame = sketch._lastFrameTime; // <-- When did this frame start. This is based on the lastFrameTime
    let deltaT = (currentFrame - lastFrameEnd) / 1000; // <-- Calculate the change in time in millis
    if (deltaT > 1) {
      lastFrameEnd = sketch._lastFrameTime;
      return;
    }

    sketch.background(0, 0, 0);

    // Mouse is an ellipse
    // sketch.ellipse(mousePos.x, mousePos.y, 45, 45);

    //vehicle.seek(mousePos);
    vehicle.arrive(mousePos);
    vehicle.process(deltaT);
    vehicle.draw(sketch);

    lastFrameEnd = sketch._lastFrameTime; // <--- Record when this frame ended so we may calculate the passing of the next frame
  };
}

class Vehicle {
  constructor(x, y, maxSpeed, maxForce) {
    this.body = new Body(x, y);
    this.maxSpeed = maxSpeed;
    this.maxForce = maxForce;
    this.r = 6;
  }

  process = deltaT => {
    this.body.process(deltaT);
  };

  // Seek a desired position <-- This has no regards about stopping at the target
  seek = target => {
    let desiredVelocity = vec2DSub(target, this.body.position);

    // Normalize desired and scale to maximum speed
    desiredVelocity.normalize();
    desiredVelocity.scale(this.maxSpeed);
    // Find the steering force based on the desired velocity and limit it to the max steering force.
    let steeringForce = vec2DSub(desiredVelocity, this.body.velocity);
    steeringForce.limit(this.maxForce);

    this.body.applyForce(steeringForce);
  };

  // Arrive at target location, compared to seek, that is we are calculating to be standing still when arriving
  arrive = target => {
    let desiredVelocity = vec2DSub(target, this.body.position);
    let distanceToTarget = desiredVelocity.magnitude();

    if (distanceToTarget < 100) {
      let arrivalSpeed = this.maxSpeed * (distanceToTarget / 100);
      desiredVelocity.setMagnitude(arrivalSpeed);
    } else {
      desiredVelocity.setMagnitude(this.maxSpeed);
    }

    // Steering = desired - velocity
    let steeringForce = vec2DSub(desiredVelocity, this.body.velocity);
    steeringForce.limit(this.maxForce);

    this.body.applyForce(steeringForce);
  };

  draw = sketch => {
    // Color of fill, line and thickness of line
    sketch.fill(255);
    sketch.stroke(0);
    sketch.strokeWeight(1);
    // Calculate rotation of vertex coordinates based on the current velocity heading
    var theta = this.body.velocity.heading() + 0.5 * Math.PI;
    // Push matrix - The matrix stack holds coordinates, this can then be used to translate all coordinates inside the matrix
    sketch.push();
    //  Translate coordinates from origin
    sketch.translate(this.body.getX(), this.body.getY());
    sketch.rotate(theta);
    // Draw the respective shape
    sketch.beginShape();
    sketch.vertex(0, -this.r * 2);
    sketch.vertex(-this.r, this.r * 2);
    sketch.vertex(this.r, this.r * 2);
    sketch.endShape(sketch.CLOSE);
    sketch.pop();
  };
}
