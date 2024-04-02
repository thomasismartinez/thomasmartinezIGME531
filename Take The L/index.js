import * as l from "./fractals.js";
import * as svgh from "./svg-helper.js";

let svg;

const randInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const createTreeRules = () => {
    let newRules = {};

    const branch = (branchDepth) => {
        let str = '';

        str = str.concat('[');
        for (let i = 0; i < randInt(1,2); i++) {

            // direction
            let n = randInt(0,10);
            if (n < 4) str = str.concat('-')
            else if (n < 8) str = str.concat('+')
            else if (n < 9) str = str.concat('+-')
            else if (n < 10) str = str.concat('-+')

            // F and/or X
            n = randInt(0,10);
            let charCount = randInt(1,branchDepth);
            for (let i = 0; i < charCount; i++) {
                if (n < 7) str = str.concat('F')
                else str = str.concat('X')
            }

            // branch further
            n = randInt(0,1);
            if (n === 0 && branchDepth-1 > 0) {
                str = str.concat(branch(branchDepth-1))        
            }
        }
        str = str.concat(']');

        return str;
    }

    let b = randInt(3,5);
    let xStr = 'F';
    for (let i = 0; i < b; i++) {
        xStr = xStr.concat(branch(3));
    }
    
    console.log(xStr);

    //newRules['X'] = 'F';
    //newRules['X'] = 'F[-F+XF-X][+FF][+-XF[+X]][-+F-X]';
    newRules['X'] = xStr;
    newRules['F'] = 'FF';

    return newRules;
}

const createForest = (cols, rows, iterations) => {
    let forrestSvgString = '';
    for (let i = 0; i < cols; i++) {
        for (let z = 0; z < rows; z++) {
            // individual tree rule
            let treeRules = createTreeRules();
            l.setTreeRule(treeRules);
            // get random X pos
            const xPos = (-100 + (i * (200 / cols))) + (Math.random() * 30) - 10;
            // get random Y pos
            const yPos = (z * 10) + (Math.random() * 10) - 5;
            forrestSvgString = forrestSvgString.concat(
                l.createTree(iterations, 'X', [xPos, yPos], (z / rows))
            );
        }
    }
    return forrestSvgString;
}

const drawScene = () => {
    let svgStr = '';
    svgStr = svgStr.concat(svgh.drawRect(-100,-100,200,200,'fill:hsl(195, 47%, 59%)'));
    svgStr = svgStr.concat(svgh.drawRect(-100,0,200,100,'fill:hsl(116, 47%, 26%)'));
    svgStr = svgStr.concat(createForest(10, 5, 5));
    svg.innerHTML = svgStr;
}

const init = () => {
    svg = document.querySelector('svg');
    drawScene();
}

init();