export const drawRect = (x,y,w,h,style,transform='') => {
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" style="${style}" transform="${transform}" />`
}

export const drawCircle = (x,y,r,style) => {
    return `<circle cx="${x}" cy="${y}" r="${r}" style="${style}" />`
}

export const drawEllipse = (cx,cy,rx,ry,style) => {
    return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" style="${style}" />`
}

export const drawPolygon = (points, style) => {
    return `<polygon points="${points}" style="${style}" />`
}

export const drawPolyline = (points, style, transform) => {
    return `<polyline points="${points}" style="${style}" transform="${transform}" />`
}

export const drawLine = (x1,y1,x2,y2,style) => {
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" style="${style}" />`
}

// takes paths as list of strings for ex: ['M 10 80', 'Q 95 10 180 80']
export const drawPath = (paths,style) => {
    const stringifyPaths = () => {
        let str = '';
        console.log(str);
        paths.forEach(path => {
            str = str.concat(path + " ");
        })
        return str;
    }
    return `<path d="${stringifyPaths()}" style=${style} />`
}

export const groupShapes = (shapes) => {
    //console.log(shapes);
    let shapesStr = '';
    shapes.forEach(shape => {
        shapesStr = shapesStr.concat(shape);
        //console.log(shapesStr);
    });
    return `<g>${shapesStr}</g>`;
}

export const rotate = (x,y,degrees,shape) => {
    return `<g transform='rotate(${degrees},${x},${y})'>${shape}</g>`;
}

export const translate = (x,y,shape) => {
    return `<g transform='translate(${x},${y})'>${shape}</g>`;
}

export const scale = (x,y) => {
    return `<g transform='scale(${x},${y ? y : x})'>${shape}</g>`;
}