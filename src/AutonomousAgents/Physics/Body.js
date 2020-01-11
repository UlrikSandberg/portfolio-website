import React from "react";
import Vector2D from "./Vector2D";

export default class Body {
  constructor(x, y, mass = 0.0) {
    // Mass of this object
    this.mass = mass;

    // Initiliaze vectorss
    this.acceleration = new Vector2D(0, 0);
    this.velocity = new Vector2D(0, 0);
    this.position = new Vector2D(x, y);
  }

  process = deltaT => {
    // Add Acceleration to velocity
    this.velocity.addScaled(this.acceleration, deltaT);

    // Add velocity to position
    this.position.addScaled(this.velocity, deltaT);

    this.resetAcceleration();
  };

  getX = () => {
    return this.position.x;
  };

  getY = () => {
    return this.position.y;
  };

  applyForce = force => {
    // We account for newtons law of motion: A = F / M
    var f = force.copy();
    f.divide(this.mass);
    this.acceleration.add(f);
  };

  resetAcceleration = () => {
    this.acceleration = new Vector2D(0, 0);
  };
}
