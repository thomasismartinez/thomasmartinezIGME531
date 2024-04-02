/*
  # Modified from Demo code for L-systems
*/

import * as svghelper from './svg-helper.js';

//let alphabet = ['Q', 'F', 'G', '+', '-'];
//'Q[+Q]Q[-Q]Q'
//const axiom = 'T';
let rules = {
  'X': 'X',
  'F': 'F',
  'G': 'F-G',
  '-': '-',
  '+': '+',
  'n': 'n',
};

export const setTreeRule = (newRules) => {
  rules['F'] = newRules['F'];
  rules['X'] = newRules['X'];
}

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

const makeVisual = (options, lindenmayerString, iterations, satMod) => {
  let svgString = '';
  let light = 0;
  let width = 1;
  let depth = 1;
  let sat = 50;
  
  // Basically constants
  let angle = (options.angle || 90) * Math.PI / 180;
  let startingPoint = options.startingPoint || [0, 0];
  let lineLength = options.lineLength || 10;

  let lastPoint;
  let branchPoints = [];
  let branchRotations = [];

  // deepestBranch
  let totalDepth = getDeepestBranch(iterations);
  console.log(totalDepth);

  // State
  let rotation = Math.asin(-1);
  let points = [startingPoint];

  const moveForward = () => {
    lastPoint = points[points.length - 1];

    const dx = Math.cos(rotation) * lineLength;
    const dy = Math.sin(rotation) * lineLength;

    let newPoint = [lastPoint[0] + dx, lastPoint[1] + dy]

    points.push(newPoint);

    light = (depth / totalDepth) * 100;
    let widthMod = 0.1 * totalDepth;
    width = widthMod - ((depth / totalDepth));
    //width = (width > 0) ? width : 0.1;
    sat = 20 + (30 * satMod);

    svgString = svgString.concat(`<!-- depth:${depth}, iteration:${iterations}, lightness:${light}, width:${width} -->`)
    svgString = svgString.concat(
      svghelper.drawLine(
        lastPoint[0], lastPoint[1], // from
        newPoint[0], newPoint[1], // to
        //`fill:none; stroke:hsl(100, 50%, 50%); stroke-width:1px`)) // style
        `fill:none; stroke:hsl(100, ${sat}%, ${light}%); stroke-width:${width}px`)) // style
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
    'X': () => {
      return;
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

const getDeepestBranch = (iterations) => {
  const ruleStr = rules['X'];
  let currentDepth = 0;
  let deepestBranch = 0;
  for (let i = 0; i < ruleStr.length - 1; i++) {
      if (ruleStr[i] === '[') {
          currentDepth++;
          if (currentDepth > deepestBranch) {
              deepestBranch = currentDepth;
          }
      }
      else if (ruleStr[i] === ']') {
          currentDepth--;
      }
  }

  return deepestBranch * iterations;
}

export const createTree = (iterations, axiom, pos, satMod) => {
  const expanded = iterateNTimes(iterations, axiom);

  const result = makeVisual({
    lineLength: 3 / iterations,
    angle: 20,
    startingPoint: pos
  }, expanded, iterations, satMod);

  // get result into the svg in the dom
  //const svg = document.querySelector('svg');
  //svg.innerHTML = result;
  return result;
}

//createTree(4,'T');


// let oneStep = iterate_once(axiom);
// debugger;