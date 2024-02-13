import * as helper from './svg-helper.js';
import * as perl from './perlin.js';

const xDim = 35;
const yDim = 35;

let perlin;

const drawInterruptionsOriginal = (xCount,yCount) => {
    console.log('entering drawInterruptionsOriginal');
    let interruptions = '';
    for (let x = 100; x <= xCount * 100; x += 100) {
        for (let y = 100; y <= yCount * 100; y += 100) {
            let randRotate = Math.floor(Math.random() * 360);
            interruptions = interruptions.concat(
                helper.rotate(
                    x+50, y+50,
                    randRotate,
                    helper.drawLine(x,y,x+100,y+100,'fill: none; stroke: black; stroke-width: 6;'),
                )
            );
        }
    }
    return interruptions;
}

const drawInterruptionsVariant = (xCount,yCount) => {
    console.log('entering drawInterruptionsVariant');
    let interruptions = '';
    for (let y = 0; y < yCount; y++) {
        for (let x = 0; x < xCount; x++) {
            //let randRotate = Math.floor(Math.random() * 360);
            let orientation = ((y+x) / xCount+yCount) * 720;
            let randSkew = Math.floor(Math.random() * 50) - 25;
            let randRotate = orientation + randSkew;
            //let hue = Math.floor(Math.random() * 250);
            let hue = ((y+x) / xCount+yCount) * 250;
            //let hue = parseInt(perlin.get(x, y) * 250);
            console.log(hue);
            //let randRotate = parseInt(perlin.get(x, y) * 360);

            let X = (x * 100) + 100;
            let Y = (y * 100) + 100;

            interruptions = interruptions.concat(
                helper.rotate(
                    X+50, Y+50,
                    randRotate,
                    helper.drawLine(X,Y,X+100,Y+100,`fill: none; stroke: hsl(${hue}, 50%, 50%); stroke-width: 6;`),
                    //helper.drawLine(X,Y,X+100,Y+100,`fill: none; stroke: black; stroke-width: 6;`),
                )
            );
        }
    }
    return interruptions;
}

const createSVGs = (x,y) => {
    // original
    document.getElementById('original').innerHTML =
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${(x+2)*100} ${(y+2)*100}" width="1000">
            ${helper.drawRect(0,0,(x+2)*100,(y+2)*100,'fill: #e2e2e2')}
            ${drawInterruptionsOriginal(x,y)}
        </svg>`;
    
    // variant
    document.getElementById('variant').innerHTML =
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${(x+2)*100} ${(y+2)*100}" width="1000">
            ${helper.drawRect(0,0,(x+2)*100,(y+2)*100,'fill: #e2e2e2')}
            ${drawInterruptionsVariant(x,y)}
        </svg>`;
}

const init = () => {
    perlin = new perl.Perlin();
    createSVGs(xDim,yDim);
}

window.onload = init;