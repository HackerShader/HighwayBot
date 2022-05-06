/**
 * 
 * @param {String} botPos 
 * @param {String} blockPos 
 * @param {String} status 
 * @param {Boolean} clear 
 */
module.exports = (botPos, blockPos, status, clear) => {
    if (clear) console.clear()
    console.log(`Position (X Y Z):\n> Bot: ${botPos}.\n> Block: ${blockPos}.\nStatus: ${status}`)
}