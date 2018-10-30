/**
 * 
 * @param {*} blockCord invader coridinates and other info like, position in matrix, starting and ending points, noise, junk, etc.
 * @param {*} invader invider matrix
 * 
 * since we need to extend radar matrix for edge cases, after we finish search for the ships
 * we need to get them back to their real X, Y positions
 */
export default function(blockCord, invader) {
    blockCord.startX -= (blockCord.invaderWidth - 1);
    blockCord.startY -= (blockCord.invaderHeight - 1);
    blockCord.endX -= (blockCord.invaderWidth - 1);
    blockCord.endY -= (blockCord.invaderHeight - 1);

    return { blockCord, invader };
}