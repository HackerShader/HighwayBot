const Vec3 = require('vec3').Vec3;
/**
 * Log progress status
 * @param {"dig" | "place" | "done" | "error" | String} blockName The block's name
 * @param {Vec3 | String} blockPos The block's position
 * @param {String} status The status
 * @param {Boolean} clear Clear the console
 */
module.exports = (
    blockName,
    blockPos,
    status,
    clear
) => {
    if (clear) console.clear();
    if (typeof blockPos == 'object') blockPos = `${blockPos.x} ${blockPos.y} ${blockPos.z}`;
    if (status.toLowerCase() == 'dig') status = '⛏ \x1b[33mDigging\x1b[0m';
    if (status.toLowerCase() == 'place') status = '👇 \x1b[33mPlacing\x1b[0m';
    if (status.toLowerCase() == 'done') status = '✅ \x1b[32Done\x1b[0m';
    if (status.toLowerCase() == 'error') status = '🔴 \x1b[31mError\x1b[0m';
    console.log(
        `[HighwayBot] Progress status\n` +
        `> Block: ${blockName}\n` +
        `> Position: ${blockPos}\n` +
        `> Status: ${status}`
    );
};