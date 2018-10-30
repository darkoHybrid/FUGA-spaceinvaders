/**
 * 
 * @param {array} invader 
 * 
 * function that takse invader matrix as parameter
 * and returns number of dots found in the matrix
 */
export default function (invader) {
    let counter = 0;

    for (let i = 0; i < invader.length; i++) {
        // try to find dots character in each line
        const match = invader[i].match(/o/g);
        if (match && match.length) {
            counter += match.length;
        }
    }

    return counter;
}