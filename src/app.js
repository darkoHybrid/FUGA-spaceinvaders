import lodash from 'lodash';

import InvadersReader from './reader/invadersReader';
import RadarReader from './reader/radarReader';

import getMatrixSize from './utils/getMatrixSize';
import extendRadarImage from './utils/extendRadarImage';
import extendMatrix from './utils/extendMatrix';
import countInvaderDots from './utils/countInvaderDots';

const MATCH_CHAR = 'o';

class App {
    constructor() {
        this.invaders = new InvadersReader().getInvaders();
        this.radar = new RadarReader().getRadar();
        this.invadersMatrixSize = getMatrixSize(this.invaders);
        this.shipsToColorInRadar = {};
    }

    moveTroughRadar(radar, startX, startY, invaderX, invaderY, invader, invaderDotsNumber) {
        let endY = startY + invaderY;
        let endX = startX + invaderX;
        let block = [];
        const that = this;

        if (endY > this.radarMatrixSize[0]['y'] || endX > this.radarMatrixSize[0]['x']) {
            return false;
        }

        for (let i = startY; i < endY; i++) {
            let row = '';

            for (let y = startX; y < endX; y++) {
                row += radar[0][i][y];
            }

            block.push(row);
        }

        this.matchInvaderWithRadarBlock(block, { startX, startY, endX, endY, invaderX, invaderY }, invader, invaderDotsNumber).then(ship => {
            if (ship) {
                if (that.shipsToColorInRadar[JSON.stringify(ship.invader)]) {
                    that.shipsToColorInRadar[JSON.stringify(ship.invader)].push(Object.assign({}, ship.blockCord, {block}))
                } else {
                    that.shipsToColorInRadar[JSON.stringify(ship.invader)] = [];
                    that.shipsToColorInRadar[JSON.stringify(ship.invader)].push(Object.assign({}, ship.blockCord, {block}))
                }
            }
            if (endX >= this.radarMatrixSize[0]['x']) {
                startX = 0;
            } else {
                startX = startX + 1;
            }

            if (endY > this.radarMatrixSize[0]['y']) {
                return false;
            } else {
                if (startX === 0) {
                    startY = startY + 1;
                }
            }

            this.moveTroughRadar(radar, startX, startY, invaderX, invaderY, invader, invaderDotsNumber);
        });
    }

    async matchInvaderWithRadarBlock(block, blockCord, invader, invaderDotsNumber) {
        let numberOfMatchingDots = 0;

        for (let i = 0; i < invader.length; i++) {
            for (let y = 0; y < invader[0].length; y++) {
                if (invader[i][y] === 'o') {
                    invader[i][y] === block[i][y] ? numberOfMatchingDots += 1 : numberOfMatchingDots;
                }
            }
        }

        if (numberOfMatchingDots > 39) {
            this.checkForNoiceOrJunk(block, invader, blockCord);
            return this.normalizeInvaderPosition(blockCord, invader);
        }

        return false;
    }

    normalizeInvaderPosition(blockCord, invader) {
        blockCord.startX -= (blockCord.invaderX - 1);
        blockCord.startY -= (blockCord.invaderY - 1);
        blockCord.endX -= (blockCord.invaderX - 1);
        blockCord.endY -= (blockCord.invaderY - 1);

        return { blockCord, invader };
    }

    checkForNoiceOrJunk(block, invader, blockCord) {
        let noise = 0, junk = 0;

        extendMatrix([block, invader], 1).then(newMatrixList => {
            const extendedBlock = newMatrixList[0]
            const extendedInvader = newMatrixList[1];

            //console.log(extendedBlock, extendedInvader);

            for (let i = 0; i < extendedBlock.length; i++) {
                //const numberOfDots = extendedBlock[i].match(/o/g).length || 0;

                for (let y = 0; y < extendedBlock[i].length; y++) {
                    if (extendedBlock[i][y] === 'o') {
                        if (extendedBlock[i][y] !== extendedInvader[i][y]) {
                            // check for top
                            if (extendedInvader[i - 1][y] === MATCH_CHAR) {
                                noise += 1;
                            }
                            else if (extendedInvader[i - 1][y - 1] === MATCH_CHAR) {
                                noise += 1;
                            }
                            else if (extendedInvader[i - 1][y + 1] === MATCH_CHAR) {
                                noise += 1;
                            }
                            else if (extendedInvader[i][y - 1] === MATCH_CHAR) {
                                noise += 1;
                            }
                            else if (extendedInvader[i][y + 1] === MATCH_CHAR) {
                                noise += 1;
                            }
                            else if (extendedInvader[i + 1][y] === MATCH_CHAR) {
                                noise += 1;
                            }
                            else if (extendedInvader[i + 1][y - 1] === MATCH_CHAR) {
                                noise += 1;
                            }
                            else if (extendedInvader[i + 1][y + 1] === MATCH_CHAR) {
                                noise += 1;
                            } else {
                                junk += 1;
                            }
                        }
                    }
                }
            }

            blockCord.noise = noise;
            blockCord.junk = junk;

        });

        return;
    }

    getInfoOfFoundShips() {
        if (Object.keys(this.shipsToColorInRadar).length) {
            Object.keys(this.shipsToColorInRadar).forEach(index => {
                console.log('\n');
                console.log('-'.repeat(50));
                console.log('\n');
                console.log('For ship: ');
                console.log(JSON.parse(index));
                console.log('\n');
                console.log('Cordinates are:');
                console.log('-'.repeat(20));
                this.shipsToColorInRadar[index].forEach(invider => {
                    console.log(invider);
                });
            });
        } else {
            console.log('There are no results for the criteria selected')
        }
    }

    run() {
        for (let i = 0; i < this.invaders.length; i++) {
            extendRadarImage(this.invaders[i]).then((radar) => {
                this.radarMatrixSize = getMatrixSize(radar);
                this.moveTroughRadar(
                    radar,
                    0, //starting point x cord
                    0, //starting point y cord
                    this.invadersMatrixSize[i]['x'], //x size of the radar image
                    this.invadersMatrixSize[i]['y'], //y size of the radar image
                    this.invaders[i], //current invader 
                    countInvaderDots(this.invaders[i]) //current invader number of dots
                );
            }).catch(err => console.log(err));
        }

        setTimeout(() => {
            //console.log(this.radar);
            this.getInfoOfFoundShips();
        });

    }
}

const mainApp = new App();
mainApp.run();