const Movements = require('mineflayer-pathfinder').Movements
const { GoalNear } = require('mineflayer-pathfinder').goals
const Vec3 = require('vec3').Vec3;
module.exports = {
    name: 'baritone',
    execute(bot, message, args, username)   {
        const mcData = require('minecraft-data')(bot.version)
        const defaultMove = new Movements(bot, mcData)
        const target = bot.players[username] ? bot.players[username].entity : null
        if (args[0] === `follow`) {
            if (!target) return bot.chat('I don\'t see you !')
            const p = target.position
            bot.chat(`/msg ${username} I see you, Coord: ${(p.x).toFixed(0)}, ${(p.y).toFixed(0)}, ${(p.z).toFixed(0)}`)
            bot.pathfinder.setMovements(defaultMove)
            bot.pathfinder.setGoal(new GoalNear(p.x, p.y, p.z, 1))
            const positionrolate = new Vec3(p.x, p.y, p.z)
            bot.lookAt(positionrolate)
        } else {
            bot.pathfinder.setMovements(defaultMove)
            bot.pathfinder.setGoal(new GoalNear(args[0], args[1], args[2], 1))
            bot.chat(`/msg ${username} Goto Coord: ${args[0]}, ${args[1]}, ${args[2]}`)
        }

    }
}