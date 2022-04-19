import React, { Component } from "react";

const defaultConfig = {
  particles: [],
  cpanel: true,
  bgColorLeft: "#57484c",
  bgColorRight: "#10101c",
  particleColors: ["#FEFFAC", "#372627", "#FFFFFF"],
  particleSpeed: 1,
  particleMax: 200,
  particleDelay: 50,
  particleSize: 7,
};

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = defaultConfig;
    this.updateAnimationState = this.updateAnimationState.bind(this);
    this.timeLast = Date.now();

    this.colorVariation = 0;
  }

  componentDidMount() {
    this.rAF = requestAnimationFrame(this.updateAnimationState);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rAF);
  }

  particleColor(color) {
    function hexToRgb(hex) {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : null;
    }

    const rgbColor = hexToRgb(color);

    return {
      r: Math.round(
        Math.random() * this.colorVariation -
          this.colorVariation / 2 +
          rgbColor.r
      ),
      g: Math.round(
        Math.random() * this.colorVariation -
          this.colorVariation / 2 +
          rgbColor.g
      ),
      b: Math.round(
        Math.random() * this.colorVariation -
          this.colorVariation / 2 +
          rgbColor.b
      ),
      a: 0,
      m: 1,
      s: Math.random(),
    };
  }

  updateAnimationState() {
    let particlesCurrent = this.state.particles;

    if (particlesCurrent.length > 0) {
      particlesCurrent = particlesCurrent.filter((p) => {
        return (
          p.x > -10 &&
          p.x < window.innerWidth + 10 &&
          p.y > -10 &&
          p.y < window.innerHeight + 10
        );
      });
    }

    if (particlesCurrent.length < this.state.particleMax) {
      const timeCurrent = Date.now();
      if (timeCurrent - this.timeLast > this.state.particleDelay) {
        particlesCurrent.push({
          x: Math.round(Math.random() * window.innerWidth),
          y: Math.round(
            (Math.random() * window.innerHeight) / 2 + window.innerHeight / 4
          ),
          r: Math.ceil(Math.random() * this.state.particleSize),
          c: this.particleColor(
            this.state.particleColors[
              Math.floor(Math.random() * this.state.particleColors.length)
            ]
          ),
          s: Math.random() * 2,
          d: Math.round(Math.random() * 360),
        });
        this.timeLast = timeCurrent;
      }
    }

    if (particlesCurrent.length > 0) {
      particlesCurrent.map((p) => {
        const n = 180 - (p.d + 90);
        if (p.c.a > 0.9) {
          p.c.m = -1;
        } else if (p.c.a < 0.1) {
          p.c.m = 1;
        }
        p.c.a += 0.05 * p.c.m * p.c.s;

        if (p.d > 0 && p.d < 180) {
          p.x +=
            (Math.sin(p.d) / Math.sin(1)) *
            (this.state.particleSpeed * p.s) *
            0.1;
        } else {
          p.x -=
            (Math.sin(p.d) / Math.sin(1)) *
            (this.state.particleSpeed * p.s) *
            0.1;
        }
        if (p.d > 90 && p.d < 270) {
          p.y +=
            (Math.sin(n) / Math.sin(1)) *
            (this.state.particleSpeed * p.s) *
            0.1;
        } else {
          p.y -=
            (Math.sin(n) / Math.sin(1)) *
            (this.state.particleSpeed * p.s) *
            0.1;
        }
        return p;
      });
    }

    this.setState({ particles: particlesCurrent });
    this.rAF = requestAnimationFrame(this.updateAnimationState);
  }

  render() {
    return (      
        <CanvasItem state={this.state} />         
      
    );
  }
}

class CanvasItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.canvasRef = React.createRef();
  }

  componentDidUpdate() {
    const state = this.props.state;
    const particles = state.particles;
    const colorGradientLeft = state.bgColorLeft;
    const colorGradientRight = state.bgColorRight;

    const canvas = this.canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    ctx.save();

    let gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, colorGradientLeft);
    gradient.addColorStop(1, colorGradientRight);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    particles.forEach((p) => {
      ctx.beginPath();
      ctx.fillStyle =
        "rgba(" + p.c.r + "," + p.c.g + "," + p.c.b + "," + p.c.a + ")";
      ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI, false);
      ctx.fill();
      ctx.closePath();
    });

    ctx.restore();
  }

  render() {
    return <canvas ref={this.canvasRef}></canvas>;
  }
}

export default Canvas;
