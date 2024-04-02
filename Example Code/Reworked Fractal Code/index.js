/*
  # Modified from Demo code for L-systems
*/

import * as svghelper from './svg-helper.js';

let alphabet = ['Q', 'F', 'G', '+', '-'];
const axiom = 'Q';
const rules = {
  'Q': 'Q[-Q]Q[+Q]Q',
  'F': 'F+G',
  'G': 'F-G',
  '-': '-',
  '+': '+',
  'n': 'n',
};

const iterate_once = (lindenmayerString) => {
  let newString = '';
  for (let i = 0; i < lindenmayerString.length; i++) {
    const result = rules[lindenmayerString[i]];
    newString += result || lindenmayerString[i];
  }
  return newString;
}

const iterateNTimes = (n, lindenmayerString) => {
  let newString = lindenmayerString;
  for (let i = 0; i < n; i++) {
    newString = iterate_once(newString);
  }
  return newString;
};

const makeVisual = (options, lindenmayerString, iterations) => {
  let svgString = '';
  let lightness = 0;
  let width = 1;
  let depth = 1;
  
  // Basically constants
  let angle = (options.angle || 90) * Math.PI / 180;
  let startingPoint = options.startingPoint || [0, 0];
  let lineLength = options.lineLength || 10;

  let lastPoint;
  let branchPoints = [];
  let branchRotations = [];

  // State
  let rotation = Math.asin(-1);
  let points = [startingPoint];

  const moveForward = () => {
    lastPoint = points[points.length - 1];

    const dx = Math.cos(rotation) * lineLength;
    const dy = Math.sin(rotation) * lineLength;

    let newPoint = [lastPoint[0] + dx, lastPoint[1] + dy]

    points.push(newPoint);

    lightness = (depth / iterations) * 70;
    width = 1 - ((depth / iterations) * 0.7)

    svgString = svgString.concat(svghelper.drawLine(lastPoint[0], lastPoint[1], newPoint[0], newPoint[1], 
      `fill:none; stroke:hsl(100, 50%, ${lightness}%); stroke-width:${width}px`))
  };

  const enterBranch = () => {
    branchPoints.push(points[points.length - 1]);
    branchRotations.push(rotation);
    depth++;
  }

  const exitBranch = () => {
    points.push(branchPoints.pop());
    rotation = branchRotations.pop();
    depth--;
  }

  const whatToDo = {
    '[': () => {
      enterBranch();
    },
    ']': () => {
      exitBranch();
    },
    'Q': () => {
      return moveForward();
    },
    'F': () => {
      return moveForward();
    },
    'G': () => {
      return moveForward();
    },
    '+': () => {
      rotation = rotation - angle;
    },
    '-': () => {
      rotation = rotation + angle;
    },
    'n': () => {
      rotation = rotation + (Math.random() * .04) - .02;
    }
  };

  for (let i = 0; i < lindenmayerString.length; i++) {
    const toDo = whatToDo[lindenmayerString[i]];
    toDo();
  }

  // return a path moving through all the points
  //return `<polyline points="${points.join(' ')}" 
  //                  fill="none" stroke="black"
  //                  stroke-width="0.3px"/>`;

  return svgString;
};

const createTree = (iterations) => {
  const expanded = iterateNTimes(iterations, axiom);

  const result = makeVisual({
    lineLength: 4 / iterations,
    angle: 45,
    startingPoint: [0, 0]
  }, expanded, iterations);

  // get result into the svg in the dom
  const svg = document.querySelector('svg');
  svg.innerHTML = result;
}

createTree(3);

// let oneStep = iterate_once(axiom);
// debugger;