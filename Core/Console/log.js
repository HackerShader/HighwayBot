const Vec3 = require('vec3').Vec3;
const data = require('../data/status.json');
/**
 * Log progress status
 * @param {String} blockName The block's name
 * @param {Vec3 | String} blockPos The block's position
 * @param {"dig" | "place" | "done" | "error" | String} status The status
 * @param {Boolean} clear Clear the console
 * @param percentage
 */
module.exports = (
    blockName,
    blockPos,
    status,
    clear,
    percentage,
) => {
    let name = blockName;
    let pos = blockPos;
    if (clear) console.clear();
    if (typeof blockPos === 'object') pos = `${blockPos.x} ${blockPos.y} ${blockPos.z}`;
    if (status.toLowerCase() === 'dig') status = `⛏ \x1b[33mDigging [${percentage}%]\x1b[0m`;
    if (status.toLowerCase() === 'place') status = '👇 \x1b[33mPlacing\x1b[0m';
    if (status.toLowerCase() === 'done') status = `✅ \x1b[32nDone [${percentage}%]\x1b[0m`;
    if (status.toLowerCase() === 'error') {
        status = '🔴 \x1b[31mError\x1b[0m';
        name = null;
        pos = null;
    }
    console.log(
        `[HighwayBot] Progress status\n` +
        `> Block: ${name}\n` +
        `> Position: ${pos}\n` +
        `> Status: ${status}\n` +
        `[HighwayBot] Info\n` +
        `> Total broken: ${data.mine}\n` +
        `> Total placed: ${data.place}\n` +
        `> Total error: ${data["place-err"]}\n` +
        `[HighwayBot] Pickaxe Status\n` +
        `> Current pickaxe durability: ${data.Pickaxe1.durability}\n` +
        `> Total broken pickaxe: ${(data["PickaxeBroken"]).length}`
    );
};