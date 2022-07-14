const config = require(`../../config/${require('../../path.json').config}`);
const Movements = require('mineflayer-pathfinder').Movements;
const {GoalNear} = require('mineflayer-pathfinder').goals;
const Vec3 = require('vec3').Vec3;

module.exports = (bot, args, username) => {
    const mcData = require('minecraft-data')(bot.version);
    const defaultMove = new Movements(bot, mcData);
    const target = bot.players[username] ? bot.players[username].entity : null;
    if (!target) return bot.chat('I don\'t see you !');
    const TargetPlayer = target.position;
    bot.chat(`/msg ${config.username} [Baritone] Follow | Coord: ${(TargetPlayer.x).toFixed(0)}, ${(TargetPlayer.y).toFixed(0)}, ${(TargetPlayer.z).toFixed(0)}`);
    bot.pathfinder.setMovements(defaultMove);
    bot.pathfinder.setGoal(new GoalNear(TargetPlayer.x, TargetPlayer.y, TargetPlayer.z, 1));
    const positionrolate = new Vec3(TargetPlayer.x, TargetPlayer.y, TargetPlayer.z);
    bot.lookAt(positionrolate);
};