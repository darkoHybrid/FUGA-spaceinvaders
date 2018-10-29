export default async function (matrixList, extensionLength) {
    try {
        return matrixList.map(matrix => {
            const tempMatrix = matrix.slice(0);

            for (var i = 0; i < tempMatrix.length; i++) {
                tempMatrix[i] = '-'.repeat(extensionLength) + tempMatrix[i] + '-'.repeat(extensionLength);
            }

            tempMatrix.unshift('-'.repeat(extensionLength + tempMatrix[0].length - 1));
            tempMatrix.push('-'.repeat(extensionLength + tempMatrix[0].length - 1));

            return tempMatrix;
        });
    } catch (err) {
        console.log(err);
    }
}