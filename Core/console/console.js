module.exports = (botPos, blockPos, status, clear) => {
    const info = require('./status.json')
    if (clear) console.clear()
    console.log(`[HighwayBot]\n> Current: ${botPos}.\n> Progress: ${blockPos}.\nTotal block dug: ${info.mine}\nTotal block placed: ${info.place}\nStatus: ${status}`)
}