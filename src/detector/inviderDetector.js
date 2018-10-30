import blockPositionNormalizer from '../normalizer/blockPositionNormalizer';
import noiseAndJunkDetector from './noiseAndJunkDetector';

/**
 * @param {*} block substracted block matrix from radar image
 * @param {*} blockCord invader coridinates and other info like, position in matrix, starting and ending points, noise, junk, etc.
 * @param {*} invader invader matrix
 * @param {*} invaderDotsNumber summarized number of dots for the invader
 */
export default async function(block, blockCord, invader, invaderDotsNumber) {
    let numberOfMatchingDots = 0;
    let matchPercentage = 0;
    const match = process.env.npm_config_match || 80; 

    // loop trough the invader matrix
    for (let i = 0; i < invader.length; i++) {
        for (let y = 0; y < invader[0].length; y++) {
            if (invader[i][y] === 'o') {
                invader[i][y] === block[i][y] ? numberOfMatchingDots += 1 : numberOfMatchingDots;
            }
        }
    }

    if (numberOfMatchingDots) {
        matchPercentage = (numberOfMatchingDots * 100) / invaderDotsNumber;
        if (matchPercentage >= match) {
            noiseAndJunkDetector(block, invader, blockCord);
            return blockPositionNormalizer(blockCord, invader);
        }
    }

    return false;
}