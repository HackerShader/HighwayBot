module.exports = async (bot) => {
    for (var x = 1; x <= 4; x++) {
        for (var y = 0; y <= 3; y++) {
            let checkLavaInFront = Boolean
            for (var z = -3; z <= 3; z++) {
                const target = bot.blockAt(bot.entity.position.offset(x, y, z))
                if (target.name == `lava`) checkLavaInFront = true
                else checkLavaInFront = false
                console.log(checkLavaInFront)
            } 
            return checkLavaInFront
        }
    }
}