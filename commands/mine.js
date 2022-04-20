let stop = Boolean
const config = require('./../config.json')
const mineflayer = require('mineflayer');
const Vec3 = require('vec3').Vec3;


module.exports = {
    name: 'mine',
    /**
     * 
     * @param {mineflayer.Bot} bot 
     * @param {*} message 
     * @param {*} args 
     * @param {*} username 
     */
    async execute(bot, message, args, username) {
        const mine = require('../util/HighwayTunnel/break/mine')(bot)
        mine
    }
}


