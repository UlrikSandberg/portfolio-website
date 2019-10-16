import React from "react";

import style from "./p5Wrapper.css";

class P5Wrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seed: props.seed,
      width: 0,
      height: 0
    };
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    this.canvas = new window.p5(this.state.seed, "sketch-p5");
    this.canvas.setReadyCallBack(this.resizeCanvas);

    window.addEventListener("resize", this.resizeCanvas);
    this.forceResize();
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeCanvas);
    this.canvas.dispose();
  }

  forceResize = () => {
    this.resizeCanvas();
  };

  resizeCanvas = () => {
    this.canvas.pushResize(
      this.canvasRef.current.clientWidth,
      this.canvasRef.current.clientHeight
    );
  };

  render() {
    return (
      <div
        style={{
          backgroundImage: `${this.props.linearBackground}`
        }}
        className="p5Canvas"
        ref={this.canvasRef}
        id="sketch-p5"
      ></div>
    );
  }
}

export default P5Wrapper;
