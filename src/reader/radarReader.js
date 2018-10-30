import fs from 'fs';
import path from 'path';
const radarFolder = path.join(__dirname, '../', 'files/radar');

/**
 * Class used to read and transform file to matrix
 */
export default class InvadersReader {
    constructor() {
        this.radar = [];
        this.read();
    }

    read() {
        let files;
        try {
            files = fs.readdirSync(radarFolder);
            files.forEach(file => {
                // read file into array by spliting each row with new line
                const radarText = fs.readFileSync(`${radarFolder}/${file}`, 'utf8').toString().split("\n");
                this.radar.push(radarText);
            });
        } catch (err) {
            console.log(err);
        }
    }

    getRadar() {
        // returns clone of the array not the instance itself
        return this.radar.slice(0);
    }
}