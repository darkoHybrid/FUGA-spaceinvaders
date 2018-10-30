/**
 * 
 * @param {array} shipsFoundOnRadar list of the ships found
 * 
 * function prints all ships and its info like, position in radar matrix,
 * starting position in matrix,
 * end position in matrix,
 * width and height of the invider,
 * noise number of dots found,
 * junk number of dots found,
 * substracted "block" (matrix) from radar image mathing the invader
 */
export default function(shipsFoundOnRadar) {
    if (Object.keys(shipsFoundOnRadar).length) {
        Object.keys(shipsFoundOnRadar).forEach(index => {
            console.log('\n');
            console.log('-'.repeat(50));
            console.log('\n');
            console.log('For ship: ');
            console.log(JSON.parse(index));
            console.log('\n');
            console.log('Cordinates are:');
            console.log('-'.repeat(20));
            shipsFoundOnRadar[index].forEach(invider => {
                console.log(invider);
            });
        });
    } else {
        console.log('There are no results for the criteria selected')
    }
}