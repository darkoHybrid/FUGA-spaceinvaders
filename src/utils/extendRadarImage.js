import getMatrixSize from './getMatrixSize';

/**
 * 
 * @param {array} radarRaw original radar image that will be extended
 * @param {array} invader invader wich width and height will be used to extend radar matrix
 */
export default async function (radarRaw, invader) {
    try {
        // clone radar matrix
        const radarMatrix = radarRaw[0].slice(0);
        // get radar width and height
        const radarSize = getMatrixSize([radarMatrix]);
        // get invader width and height
        const invaderSize = getMatrixSize([invader]);

        for (var i = 0; i < radarSize[0]['y']; i++) {
            // add new columns defined by invaderSize (width - 1)
            radarMatrix[i] = '-'.repeat(invaderSize[0]['x'] - 1) + radarMatrix[i] + '-'.repeat(invaderSize[0]['x'] - 1);
        }

        for (var y = 0; y < (invaderSize[0]['y'] - 1); y++) {
            // add new rows defined by invaderSize (height - 1) to the bottom of the matrix
            radarMatrix.unshift('-'.repeat(invaderSize[0]['x'] - 1) + '-'.repeat(radarSize[0]['x']) + '-'.repeat(invaderSize[0]['x'] - 1));
            // add new rows defined by invaderSize (height - 1) at the top of the matrix
            radarMatrix.push('-'.repeat(invaderSize[0]['x'] - 1) + '-'.repeat(radarSize[0]['x']) + '-'.repeat(invaderSize[0]['x'] - 1));
        }

        return [radarMatrix];
    } catch(err) {
        console.log(err);
    }
}