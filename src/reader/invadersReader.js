import fs from 'fs';
import path from 'path';
const invadersFolder = path.join(__dirname, '../', 'files/invaders');

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
                this.invaders.push(fs.readFileSync(`${invadersFolder}/${file}`, 'utf8').toString().split("\n"));
            });
        } catch (err) {
            console.log(err);
        }
    }

    getInvaders() {
        return this.invaders;
    }
}