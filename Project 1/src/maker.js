import * as helper from './svg-helper.js';

const xDim = 10;
const yDim = 10;

const bigStyle = 'fill:none;stroke:red;stroke-width:6;';
const smallStyle = 'fill:none;stroke:black;stroke-width:6';
const triangleStyleA = 'fill:skyblue;stroke:none;';
const triangleStyleB = 'fill:none;stroke:none;';

const init = () => {
    createSVGs(xDim,yDim);
}

const drawTile = (x,y,w,h) => {
    let rotate = (Math.floor(Math.random() * 4) + 1) * 90;
    console.log(rotate);
    return helper.translate( x, y, 
        helper.rotate( 50, 50, rotate,
            helper.groupShapes([
                //M0 0-70 70A99 99 0 0 1-70-70
                //helper.drawRect(0,0, 100, 100, 'fill:none;stroke:rgba(10,10,10,0.1);'),

                // small lines
                helper.drawPath(['M 0 75', 'Q 25 75 25 0'], 'fill:none;stroke:green;stroke-width:4'),
                //M 0 25 C 42 28 61 46 46 53 C 42 54 37 46 46 38 C 64 26 75 10 75 0
                helper.drawPath(['M 0 25', 'C 42 25 61 46 46 53', 'C 42 54 37 46 46 38', 'C 64 26 75 10 75 0'], smallStyle),
                //M 25 100 C 25 75 37 67 43 67 C 49 67 51 78 54 78 C 57 78 57 71 60 71 C 61 71 62 72 64 72 C 68 72 70 59 76 59 C 78 59 81 62 84 69 C 87 74 89 75 100 75
                helper.drawPath(['M 25 100', 'C 25 75 37 67 43 67', 'C 49 67 51 78 54 78', 'C 57 78 57 71 60 71', 'C 61 71 62 72 64 72', 'C 68 72 70 59 76 59', 'C 78 59 81 62 84 69', 'C 87 74 89 75 100 75'], smallStyle),
                //M 100 25 C 92 25 89 28 89 33 C 89 40 91 43 91 50 C 91 66 74 79 75 100
                helper.drawPath(['M 100 25', 'C 92 25 89 28 89 33', 'C 89 40 91 43 91 50', 'C 91 66 74 79 75 100'], smallStyle),

                // big lines
                helper.drawPath(['M 0 50', 'C 25 50 50 75 50 100'], bigStyle),
                helper.drawPath(['M 50 0', 'C 50 25 75 50 100 50'], bigStyle),
            ]) 
        )
    )
}

const drawTriangleTile = (x,y,w,h) => {
    //let rotate = (Math.floor(Math.random() * 4) + 1) * 90;
    return helper.translate( x, y, 
        helper.groupShapes([
            drawTriangleA(w,h),
            drawTriangleB(w,h),
        ]) 
    )
}

const drawTriangleA = (w,h) => {
    let tile = '';
    tile = tile.concat(helper.drawPolygon(`0,${h} ${w},0 0,0`,triangleStyleA));

    let randomTileNumber = Math.floor(Math.random() * 100);

    if (randomTileNumber < 10) {
        tile = tile.concat(aKnubTop(w,h));
        tile = tile.concat(aKnubLeft(w,h));
        tile = tile.concat(aKnubSlant(w,h));
    }
    else if (randomTileNumber < 40) {
        tile = tile.concat(aKnubTop(w,h));
        tile = tile.concat(aLineCenterLeft(w,h));
    }
    else if (randomTileNumber < 70) {
        tile = tile.concat(aKnubLeft(w,h));
        tile = tile.concat(aLineTopCenter(w,h));
    }
    else {
        tile = tile.concat(aKnubSlant(w,h));
        tile = tile.concat(aLineTopLeft(w,h));
    }

    //switch (randomTileNumber) {
    //    case 0:
    //        tile = tile.concat(aKnubTop(w,h));
    //        tile = tile.concat(aKnubLeft(w,h));
    //        tile = tile.concat(aKnubSlant(w,h));
    //        break;
    //    case 1:
    //        tile = tile.concat(aKnubTop(w,h));
    //        tile = tile.concat(aLineCenterLeft(w,h));
    //        break;
    //    case 2:
    //        tile = tile.concat(aKnubLeft(w,h));
    //        tile = tile.concat(aLineTopCenter(w,h));
    //        break;
    //    case 3:
    //        tile = tile.concat(aKnubSlant(w,h));
    //        tile = tile.concat(aLineTopLeft(w,h));
    //        break;
    //}

    return tile;
}

const drawTriangleB = (w,h) => {
    let tile = '';

    let randomTileNumber = Math.floor(Math.random() * 100);

    if (randomTileNumber < 10) {
        tile = tile.concat(bKnubBottom(w,h));
        tile = tile.concat(bKnubRight(w,h));
        tile = tile.concat(bKnubSlant(w,h));
    }
    else if (randomTileNumber < 40) {
        tile = tile.concat(bKnubBottom(w,h));
        tile = tile.concat(bLineRightCenter(w,h));
    }
    else if (randomTileNumber < 70) {
        tile = tile.concat(bKnubRight(w,h));
        tile = tile.concat(bLineBottomCenter(w,h));
    }
    else {
        tile = tile.concat(bKnubSlant(w,h));
        tile = tile.concat(bLineBottomRight(w,h));
    }

    //switch (randomTileNumber) {
    //    case 0:
    //        tile = tile.concat(bKnubBottom(w,h));
    //        tile = tile.concat(bKnubRight(w,h));
    //        tile = tile.concat(bKnubSlant(w,h));
    //        break;
    //    case 1:
    //        tile = tile.concat(bKnubBottom(w,h));
    //        tile = tile.concat(bLineRightCenter(w,h));
    //        break;
    //    case 2:
    //        tile = tile.concat(bKnubRight(w,h));
    //        tile = tile.concat(bLineBottomCenter(w,h));
    //        break;
    //    case 3:
    //        tile = tile.concat(bKnubSlant(w,h));
    //        tile = tile.concat(bLineBottomRight(w,h));
    //        break;
    //}

    return tile;
}

const aKnubLeft = (w,h) => {
    return helper.groupShapes([
        helper.drawLine(0,50,15,50,smallStyle),
        helper.drawCircle(15,50,3,smallStyle)
    ])
}

const aKnubTop = (w,h) => {
    return helper.groupShapes([
        helper.drawLine(50,0,50,15,smallStyle),
        helper.drawCircle(50,15,3,smallStyle)
    ])
}

const aKnubSlant = (w,h) => {
    return helper.groupShapes([
        helper.drawLine(50,50,40,40,smallStyle),
        helper.drawCircle(40,40,3,smallStyle)
    ],smallStyle)
}

const aLineTopLeft = (w,h) => {
    return helper.drawLine(50,0,0,50,smallStyle)
}

const aLineTopCenter = (w,h) => {
    return helper.drawLine(50,0,50,50,smallStyle)
}

const aLineCenterLeft = (w,h) => {
    return helper.drawLine(50,50,0,50,smallStyle)
}

const bKnubBottom = (w,h) => {
    return helper.groupShapes([
        helper.drawLine(50,100,50,85,smallStyle),
        helper.drawCircle(50,85,3,smallStyle)
    ])
}

const bKnubRight = (w,h) => {
    return helper.groupShapes([
        helper.drawLine(100,50,85,50,smallStyle),
        helper.drawCircle(85,50,3,smallStyle)
    ])
}

const bKnubSlant = (w,h) => {
    return helper.groupShapes([
        helper.drawLine(50,50,60,60,smallStyle),
        helper.drawCircle(60,60,3,smallStyle)
    ],smallStyle)
}

const bLineBottomRight = (w,h) => {
    return helper.drawLine(100,50,50,100,smallStyle)
}

const bLineBottomCenter = (w,h) => {
    return helper.drawLine(50,100,50,50,smallStyle)
}

const bLineRightCenter = (w,h) => {
    return helper.drawLine(100,50,50,50,smallStyle)
}

const drawTiling = (xCount, yCount) => {
    console.log('entering drawTiling');
    let tiles = '';
    for (let x = 100; x <= xCount*100; x += 100) {
        //console.log('x looping' + x)
        for (let y = 100; y <= yCount*100; y += 100) {
            //console.log('y looping' + y)
            tiles = tiles.concat(drawTriangleTile(x,y,100,100))
        }
    }
    return tiles;
}

const createSVGs = (x,y) => {
    // original
    document.getElementById('svg').innerHTML =
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${(x+2)*100} ${(y+2)*100}" width="1000">
            ${drawTiling(x,y)}
        </svg>`;
}

window.onload = init;