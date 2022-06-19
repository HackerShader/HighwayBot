module.exports = async (bot) => {
    let thing = {
        check: false,
    }
    for (let x = -1; x <= 4; x++) {
        for (let y = -1; y <= 4; y++) {
            for (let z = -3; z <= 3; z++) {
                const target = bot.blockAt(bot.entity.position.offset(x, y, z));
                if (target.name !== `lava`) continue;
                thing.check = true;
            }
        }
    }
    return thing;
}