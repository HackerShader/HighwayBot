module.exports = {
    name: 'mine',
    async execute(bot) {
        await require('./../Core/HighwayTunnel/check/check')(bot);
    }
}


