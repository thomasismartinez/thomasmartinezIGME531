import * as helper from './svg-helper.js';

const xDim = 5;
const yDim = 5;

const init = () => {
    createSVGs(xDim,yDim);
}

const drawTile = () => {

}

const drawTiling = () => {
    
}

const createSVGs = (x,y) => {
    // original
    document.getElementById('original').innerHTML =
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${(x+2)*100} ${(y+2)*100}" width="1000">
            ${helper.drawRect(0,0,(x+2)*100,(y+2)*100,'fill: #eee')}
            ${drawTiling(x,y)}
        </svg>`;
}

window.onload = init;