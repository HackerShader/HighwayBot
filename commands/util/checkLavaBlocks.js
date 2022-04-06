module.exports = (bot) => {
    let CheckLavaBoolean = Boolean
    bot.equip(87, 'hand')
    for (var x = 1; x <= 4; x++) {
        for (var y = 0; y <= 3; y++) {
            for (var z = -3; z <= 3; z++) {
                const target = bot.blockAt(bot.entity.position.offset(x, y, z))
                if (target.name == `lava`) {
                    try {
                        CheckLavaBoolean == true
                       // const lavablock = bot.blockAt(target.position.offset(-1, 0, 0))
                       // await bot.placeBlock(lavablock, new Vec3(1, 0, 0))
                    } catch (error) {
                        console.log(error)
                    }
                }
            }
        }
    }
    return CheckLavaBoolean
}