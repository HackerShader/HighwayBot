/**
 * 
 * @param {String} botPos 
 * @param {String} blockPos 
 * @param {String} status 
 * @param {Boolean} clear 
 */
module.exports = (botPos, blockPos, status, clear) => {
    const info = require('./status.json')
    if (clear) console.clear()
    console.log(`Position (X Y Z):\n> Bot: ${botPos}.\n> Progress: ${blockPos}.\nTotal block dug: ${info.mine}\nTotal block placed: ${info.place}\nStatus: ${status}`)
}