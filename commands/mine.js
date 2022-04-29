module.exports = {
    name: 'mine',
    async execute(bot) {
        const mine = require('../util/HighwayTunnel/break/mine')(bot);
        mine
    }
}


