/**
 * 
 * @param {array} matrixList matrix that has to be extended
 * @param {number} extensionLength fixed number of rows/columns that will be used to extend the matrix 
 */
export default async function (matrixList, extensionLength) {
    try {
        return matrixList.map(matrix => {
            // coloning array
            const tempMatrix = matrix.slice(0);

            for (var i = 0; i < tempMatrix.length; i++) {
                // add new columns
                tempMatrix[i] = '-'.repeat(extensionLength) + tempMatrix[i] + '-'.repeat(extensionLength);
            }

             // add new rows to the bottom of the matrix
            tempMatrix.unshift('-'.repeat(extensionLength + tempMatrix[0].length - 1));

            // add new rows at the top of the matrix
            tempMatrix.push('-'.repeat(extensionLength + tempMatrix[0].length - 1));

            return tempMatrix;
        });
    } catch (err) {
        console.log(err);
    }
}