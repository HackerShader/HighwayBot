const fs = require('fs-extra');
fs.readdirSync('commands');
fs.writeFileSync('commands/baritone.js',
    'const Movements = require(\'mineflayer-pathfinder\').Movements\n' +
    'const { GoalNear } = require(\'mineflayer-pathfinder\').goals\n' +
    'const Vec3 = require(\'vec3\').Vec3;\n' +
    'module.exports = {\n' +
    '    name: \'baritone\',\n' +
    '    execute(bot, args, username) {\n' +
    '        const mcData = require(\'minecraft-data\')(bot.version);\n' +
    '        const defaultMove = new Movements(bot, mcData);\n' +
    '        const target = bot.players[username] ? bot.players[username].entity : null;\n' +
    '        if (args[1] === `goto`) {\n' +
    '            bot.pathfinder.setMovements(defaultMove)\n' +
    '            bot.pathfinder.setGoal(new GoalNear(args[1], args[2], args[3], 1))\n' +
    '            bot.chat(`/msg HackerShader Goto Coord: ${args[1]}, ${args[2]}, ${args[3]}`)\n' +
    '        }\n' +
    '    }\n' +
    '}'
);