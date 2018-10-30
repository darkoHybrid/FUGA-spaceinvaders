/**
 * 
 * @param {array} matrix 
 * 
 * function will return width and height of the matrix
 */
export default function (matrix) {
    const matrixSize = [];
    matrix.forEach(el => {
        matrixSize.push({ x: el[0].length, y: el.length });
    });
    return matrixSize;
}