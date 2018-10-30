import extendMatrix from '../utils/extendMatrix';
import { MATCH_CHAR } from '../const';

/**
 * 
 * @param {*} block takes matrix substracted block
 * @param {*} invader invider matrix
 * @param {*} blockCord data related to the invider that has to be extended with noise and junk number
 */
export default function(block, invader, blockCord) {
    let noise = 0, junk = 0;

    /**
     * extend block and invader matrix with the same number of rows and columns
     * so that we always check all top, bottom, left and right sides of the each dot 
     */
    extendMatrix([block, invader], 1).then(newMatrixList => {
        const extendedBlock = newMatrixList[0]
        const extendedInvader = newMatrixList[1];

        for (let i = 0; i < extendedBlock.length; i++) {

            for (let y = 0; y < extendedBlock[i].length; y++) {
                // limit to finind only important character in the matrix
                if (extendedBlock[i][y] === 'o') {
                    // check for noise or junk only if the current dot is not part of the invader matrix
                    if (extendedBlock[i][y] !== extendedInvader[i][y]) {
                        // check for the top position
                        if (extendedInvader[i - 1][y] === MATCH_CHAR) {
                            noise += 1;
                        }
                        // check for the top left position
                        else if (extendedInvader[i - 1][y - 1] === MATCH_CHAR) {
                            noise += 1;
                        }
                        // check for the top right position
                        else if (extendedInvader[i - 1][y + 1] === MATCH_CHAR) {
                            noise += 1;
                        }
                        // check for the left position
                        else if (extendedInvader[i][y - 1] === MATCH_CHAR) {
                            noise += 1;
                        }
                        // check for the right position
                        else if (extendedInvader[i][y + 1] === MATCH_CHAR) {
                            noise += 1;
                        }
                        // check for the bottom position
                        else if (extendedInvader[i + 1][y] === MATCH_CHAR) {
                            noise += 1;
                        }
                        // check for the bottom left position
                        else if (extendedInvader[i + 1][y - 1] === MATCH_CHAR) {
                            noise += 1;
                        }
                        // check for the bottom right position
                        else if (extendedInvader[i + 1][y + 1] === MATCH_CHAR) {
                            noise += 1;
                        } 
                        // if the dot is not next to the ship then it is a junk
                        else {
                            junk += 1;
                        }
                    }
                }
            }
        }

        blockCord.noise = noise;
        blockCord.junk = junk;

    });
}