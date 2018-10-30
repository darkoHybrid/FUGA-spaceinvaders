import InvadersReader from './reader/invadersReader';
import RadarReader from './reader/radarReader';

import getMatrixSize from './utils/getMatrixSize';
import extendRadarImage from './utils/extendRadarImage';
import countInvaderDots from './utils/countInvaderDots';
import printInfoOfFoundShips from './printer/printResults';
import inviderDetector from './detector/inviderDetector';

class App {
    constructor() {
        this.invaders = new InvadersReader().getInvaders();
        this.radar = new RadarReader().getRadar();
        this.invadersMatrixSize = getMatrixSize(this.invaders);
        this.foundShipsOnRadar = {};
    }

    moveTroughRadar(radar, startX, startY, invaderWidth, invaderHeight, invader, invaderDotsNumber) {
        let endY = startY + invaderHeight; // calculate Y starting point and invader height
        let endX = startX + invaderWidth; // calculate X starting point and invader width
        let block = [];
        const radarMatrixSize = getMatrixSize(radar); // returns matrix width and height

        // if we are out of boundaries, stop!
        if (endY > this.radarMatrixSize[0]['y'] || endX > this.radarMatrixSize[0]['x']) {
            return false;
        }

        // loop trough the radar matrix and take the block in same size as invader is.
        for (let i = startY; i < endY; i++) {
            let row = '';

            for (let y = startX; y < endX; y++) {
                row += radar[0][i][y];
            }

            block.push(row);
        }

        // before we continue going trough the radar matrix, lets check if we can find some ship in the selected block
        inviderDetector(block, { startX, startY, endX, endY, invaderWidth, invaderHeight }, invader, invaderDotsNumber).then(ship => {
            if (ship) {
                // check if the ship exist 
                if (this.foundShipsOnRadar[JSON.stringify(ship.invader)]) {
                    this.foundShipsOnRadar[JSON.stringify(ship.invader)].push(Object.assign({}, ship.blockCord, { block }))
                } 
                // if not lets create new array element for it
                else {
                    this.foundShipsOnRadar[JSON.stringify(ship.invader)] = [];
                    this.foundShipsOnRadar[JSON.stringify(ship.invader)].push(Object.assign({}, ship.blockCord, { block }))
                }
            }

            // if there is no enough space to move on the right for the hole block,
            // reset posoition to "0"
            if (endX >= this.radarMatrixSize[0]['x']) {
                startX = 0;
            } 
            // if there is enough space continue moving on the right
            else {
                startX = startX + 1;
            }

            // if we reach to the end of the matrix, stop and exit
            if (endY > this.radarMatrixSize[0]['y']) {
                return false;
            } 
            // if the "startX" cordinate is reset to "0"
            // then we know that we reached to the end of the line
            // so move one row below
            else {
                if (startX === 0) {
                    startY = startY + 1;
                }
            }

            this.moveTroughRadar(radar, startX, startY, invaderWidth, invaderHeight, invader, invaderDotsNumber);
        });
    }

    run() {
        // loop trough all the invader ships
        for (let i = 0; i < this.invaders.length; i++) {
            // extend radar image for the selected invader ship
            extendRadarImage(this.radar, this.invaders[i]).then((radar) => {
                this.radarMatrixSize = getMatrixSize(radar);
                this.moveTroughRadar(
                    radar, //extended all sides of radar image with size of the selected invader
                    0, //starting point x cord
                    0, //starting point y cord
                    this.invadersMatrixSize[i]['x'], //x size of the radar image
                    this.invadersMatrixSize[i]['y'], //y size of the radar image
                    this.invaders[i], //current invader 
                    countInvaderDots(this.invaders[i]) //current invader number of dots
                );
            }).catch(err => console.log(err));
        }

        // it will push execution to the end of stack
        setTimeout(() => {
            console.log(this.radar);
            printInfoOfFoundShips(this.foundShipsOnRadar)
        });

    }
}

const mainApp = new App();
mainApp.run();