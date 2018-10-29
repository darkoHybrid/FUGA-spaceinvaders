import fs from 'fs';
import path from 'path';
const radarFolder = path.join(__dirname, '../', 'files/radar');

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
                const radarText = fs.readFileSync(`${radarFolder}/${file}`, 'utf8').toString().split("\n");
                const radarArr = [];
                radarText.forEach(text => {
                    radarArr.push(text.split(""));
                })
                this.radar.push(radarText);
            });
        } catch (err) {
            console.log(err);
        }
    }

    getRadar() {
        return this.radar.slice(0);
    }
}