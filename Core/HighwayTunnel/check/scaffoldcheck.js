module.exports = async (bot) => {
    let scaffold = {
        check: false,
    }
    for (let z = -1; z <= 1; z++) {
        const target = bot.blockAt(bot.entity.position.offset(2, -1, z));
        if (target.name !== `air`) continue;
        scaffold.check = true;
    }
    return scaffold.check;
}