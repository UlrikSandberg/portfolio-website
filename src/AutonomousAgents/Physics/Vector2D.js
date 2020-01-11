import react from "react";

export default class Vector2D {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  add = vector2D => {
    this.x += vector2D.x;
    this.y += vector2D.y;

    return this;
  };

  addScaled = (vector2D, scalar) => {
    this.x += vector2D.x * scalar;
    this.y += vector2D.y * scalar;
  };

  subtract = vector2D => {
    this.x -= vector2D.x;
    this.y -= vector2D.y;

    return this;
  };

  divide = scale => {
    if (scale === 0.0 || !scale) {
      return;
    }
    this.x /= scale;
    this.y /= scale;

    return this;
  };

  // Calculate the angel in radians from vertex(0,0) and a ray to the point(x,y) based on the positive x-axis
  heading = () => {
    return Math.atan2(this.y, this.x);
  };

  scale = scalar => {
    if (scalar === 0.0) {
      return;
    }
    this.x *= scalar;
    this.y *= scalar;

    return this;
  };

  limit = limit => {
    if (this.magnitude() > limit) {
      this.normalize();
      this.scale(limit);
    }
  };

  setMagnitude = magnitude => {
    this.normalize();
    this.scale(magnitude);
  };

  magnitude = () => {
    var absX = Math.abs(this.x);
    var absY = Math.abs(this.y);

    return Math.sqrt(absX * absX + absY * absY);
  };

  normalize = () => {
    var magnitude = this.magnitude();
    if (magnitude !== 0.0) {
      this.divide(magnitude);
    }
  };

  copy = () => {
    return new Vector2D(this.x, this.y);
  };
}

const vec2DSub = (vector1, vector2) => {
  return vector1.copy().subtract(vector2);
};

const radiToAngle = radians => {
  return radians * (180 / Math.PI);
};

const angleToRadi = angle => {
  return (angle * Math.PI) / 180;
};

const distance2D = (pos1, pos2) => {
  let absX = Math.abs(pos2.x - pos1.x);
  let absY = Math.abs(pos2.y - pos1.y);

  return absX * absX + absY * absY;
};

export { vec2DSub, radiToAngle, angleToRadi, distance2D };
