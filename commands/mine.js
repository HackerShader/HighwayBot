module.exports = {
    name: 'mine',
    async execute(bot, message, args, username) {
        const mine = require('../util/HighwayTunnel/break/mine')(bot)
        mine
    }
}


