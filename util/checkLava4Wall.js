module.exports = async (bot) => {
    let thing = {
        check: false,
        position: []
    }
    for (var x = 1; x <= 4; x++) {
        for (var y = 0; y <= 4; y++) {
            for (var z = -3; z <= 3; z++) {
                const target = bot.blockAt(bot.entity.position.offset(x, y, z))
                if (target.name == `lava`) {
                    thing.check = true
                    await thing.position.push(x + y + z)
                }
            } 
        }
    }
    return thing
}