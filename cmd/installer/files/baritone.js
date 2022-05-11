const fs = require('fs');
fs.readdirSync('commands')
fs.writeFileSync('commands/baritone.js', 'const Movements = require(\'mineflayer-pathfinder\').Movements\n' +
    'const { GoalNear } = require(\'mineflayer-pathfinder\').goals\n' +
    'const Vec3 = require(\'vec3\').Vec3;\n' +
    'module.exports = {\n' +
    '    name: \'baritone\',\n' +
    '    execute(bot, message, args, username) {\n' +
    '        const mcData = require(\'minecraft-data\')(bot.version);\n' +
    '        const defaultMove = new Movements(bot, mcData);\n' +
    '        const target = bot.players[username] ? bot.players[username].entity : null;\n' +
    '        if (args[0] !== `follow`) {\n' +
    '            bot.pathfinder.setMovements(defaultMove)\n' +
    '            bot.pathfinder.setGoal(new GoalNear(args[0], args[1], args[2], 1))\n' +
    '            bot.chat(`/msg ${username} Goto Coord: ${args[0]}, ${args[1]}, ${args[2]}`)\n' +
    '            return;\n' +
    '        }\n' +
    '        if (!target) return bot.chat(\'I don\\\'t see you !\')\n' +
    '        const p = target.position\n' +
    '        bot.chat(`/msg ${username} I see you, Coord: ${(p.x).toFixed(0)}, ${(p.y).toFixed(0)}, ${(p.z).toFixed(0)}`)\n' +
    '        bot.pathfinder.setMovements(defaultMove)\n' +
    '        bot.pathfinder.setGoal(new GoalNear(p.x, p.y, p.z, 1))\n' +
    '        const positionrolate = new Vec3(p.x, p.y, p.z)\n' +
    '        bot.lookAt(positionrolate);\n' +
    '    }\n' +
    '}')