const config = require(`../../config/${require('../../path.json').config}`);
const Movements = require('mineflayer-pathfinder').Movements;
const {GoalNear} = require('mineflayer-pathfinder').goals;

module.exports = (bot, args) => {
    const mcData = require('minecraft-data')(bot.version);
    const defaultMove = new Movements(bot, mcData);
    if (!args[2] || !args[3] || !args[4]) return bot.chat('/msg HackerShader [Baritone] Goto | Error: Missing arguments [x, y, z]');
    if (Number(args[3]) > 255 || Number(args[3]) < 0) return bot.chat('/msg HackerShader [Baritone] Goto | Error: Y coordinate must be between 0 and 255');
    bot.pathfinder.setMovements(defaultMove);
    bot.pathfinder.setGoal(new GoalNear(args[2], args[3], args[4], 1));
    bot.chat(`/msg ${config.username} [Baritone] Goto | Coord: ${args[2]}, ${args[3]}, ${args[4]}`);
};