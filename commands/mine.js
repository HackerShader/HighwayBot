module.exports = {
    name: 'mine',
    async execute(bot) {
        await require('../util/HighwayTunnel/break/mine')(bot)
    }
}


