export default function (invader) {
    let counter = 0;

    for (let i = 0; i < invader.length; i++) {
        if (invader[i].match(/o/g).length) {
            counter += invader[i].match(/o/g).length;
        }
    }

    return counter;
}