import getMatrixSize from './getMatrixSize';
import RadarReader from '../reader/radarReader';

export default async function (invader) {
    try {
        const radar = new RadarReader().getRadar();
        const radarSize = getMatrixSize(radar);
        const invaderSize = getMatrixSize([invader]);

        for (var i = 0; i < radarSize[0]['y']; i++) {
            radar[0][i] = '-'.repeat(invaderSize[0]['x'] - 1) + radar[0][i] + '-'.repeat(invaderSize[0]['x'] - 1);
        }

        for (var y = 0; y < (invaderSize[0]['y'] - 1); y++) {
            radar[0].unshift('-'.repeat(invaderSize[0]['x'] - 1) + '-'.repeat(radarSize[0]['x']) + '-'.repeat(invaderSize[0]['x'] - 1));
            radar[0].push('-'.repeat(invaderSize[0]['x'] - 1) + '-'.repeat(radarSize[0]['x']) + '-'.repeat(invaderSize[0]['x'] - 1));
        }

        return radar;
    } catch(err) {
        console.log(err);
    }
}