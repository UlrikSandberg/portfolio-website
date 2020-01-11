import MatrixError from "./MatrixError";
import { runInThisContext } from "vm";
import { thisExpression } from "@babel/types";

class Matrix {
  constructor(rows = 1, coloumns = 1) {
    this.rows = rows;
    this.coloumns = coloumns;
    this.matrix = [];
    for (let i = 0; i < rows; i++) {
      this.matrix.push(new Array(coloumns));
    }
  }

  initializeVectorFromArray = (arr, isRowVector = true) => {
    if (isRowVector) {
      this.rows = 1;
      this.coloumns = arr.length;
    } else {
      this.coloumns = 1;
      this.rows = arr.length;
    }
    this.matrix = [];
    for (let i = 0; i < this.rows; i++) {
      this.matrix.push(new Array(this.coloumns));
    }
    let index = 0;
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.coloumns; c++) {
        this.set(r, c, arr[index]);
        index++;
      }
    }
  };

  // Get value
  get = (row, coloumn) => {
    return this.matrix[row][coloumn];
  };

  // Set value
  set = (row, coloumn, value) => {
    if (row > this.rows) {
      throw new MatrixError(
        `Index out of bound exception, trying insert on row: ${row} while matrix only contains ${this.rows} rows`
      );
    }
    if (coloumn > this.coloumns) {
      if (row > this.rows) {
        throw new MatrixError(
          `Index out of bound exception, trying insert on coloumn: ${coloumn} while matrix only contains ${this.coloumns} coloumns`
        );
      }
    }
    this.matrix[row][coloumn] = value;
  };

  // Initialize all values in the matrix to zero
  zeroMatrix = () => {
    this.randomize(0, 0);
  };

  normalize = () => {
    let magnitude = this.vectorLength();

    if (magnitude !== 0.0) {
      this.divide(magnitude);
    }
  };

  size = () => {
    let size = 0;
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.coloumns; c++) {
        size++;
      }
    }
    return size;
  };

  scale = scalar => {
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.coloumns; c++) {
        this.matrix[r][c] *= scalar;
      }
    }
  };

  divide = scale => {
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.coloumns; c++) {
        this.matrix[r][c] /= scale;
      }
    }
  };

  dotProduct = vector => {
    if (!this.isVector() || !vector.isVector()) {
      throw new MatrixError(
        "Both matrixes must be vectors inorder to calculate the dot product"
      );
    }

    let aArray = this.toPackedArray();
    let bArray = vector.toPackedArray();

    if (aArray.length !== bArray.length) {
      throw new MatrixError(
        "Both matrixes must be of same size to compute the dot product"
      );
    }

    // Dot Product result
    let dotProduct = 0.0;

    for (let i = 0; i < aArray.length; i++) {
      dotProduct += aArray[i] * bArray[i];
    }
    return dotProduct;
  };

  isVector = () => {
    return this.rows === 1 || this.coloumns === 1;
  };

  toPackedArray = () => {
    let packedArray = [];
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.coloumns; c++) {
        packedArray.push(this.get(r, c));
      }
    }
    return packedArray;
  };

  // Initialize all values in the matrix to random values between min-max
  randomize = (min = 0, max = 100) => {
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.coloumns; c++) {
        this.set(r, c, Math.floor(Math.random() * (max - min)) + min);
      }
    }
  };

  vectorLength = () => {
    if (!this.isVector()) {
      throw new MatrixError(
        "Can only compute the length of a vector not multi dimensional matrixex"
      );
    }
    return Math.sqrt(this.dotProduct(this));
  };

  angleBetween = vector => {
    if (!this.isVector() || !vector.isVector()) {
      throw new MatrixError(
        "Can only compute the angle between two vectors not multidimensional matrixes"
      );
    }
    return Math.acos(
      this.dotProduct(vector) / (this.vectorLength() * vector.vectorLength())
    );
  };

  // Compute the dot product between respective coloumns
  coloumDotProduct = matrix => {
    if (matrix.rows !== this.rows || matrix.coloumns !== this.coloumns) {
      throw new MatrixError(
        "coloumDotProduct require matrixes of same dimensionality"
      );
    }
    let CDP = [];
    for (let c = 0; c < this.coloumns; c++) {
      let dotProduct = 0;
      for (let r = 0; r < this.rows; r++) {
        dotProduct += this.get(r, c) * matrix.get(r, c);
      }
      CDP.push(dotProduct);
    }
    return CDP;
  };

  // Print out a nice representation of the matrix
  print = () => {
    let stringBuilder = [];
    stringBuilder.push("\n");
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.coloumns; c++) {
        stringBuilder.push(`${this.get(r, c)}`);
        stringBuilder.push("\t");
      }
      stringBuilder.push("\n");
    }
    return stringBuilder.join("");
  };
}

export default Matrix;
