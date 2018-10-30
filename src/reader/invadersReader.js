import fs from 'fs';
import path from 'path';
const invadersFolder = path.join(__dirname, '../', 'files/invaders');

/**
 * Class that reads all invaders from files
 */
export default class InvadersReader {
    constructor() {
        this.invaders = [];
        this.read();
    }

    read() {
        let files;
        try {
            files = fs.readdirSync(invadersFolder);
            files.forEach(file => {
                // read file into array by spliting each row with new line
                this.invaders.push(fs.readFileSync(`${invadersFolder}/${file}`, 'utf8').toString().split("\n"));
            });
        } catch (err) {
            console.log(err);
        }
    }

    getInvaders() {
        // returns clone of the array not the instance itself
        return this.invaders.slice(0);
    }
}