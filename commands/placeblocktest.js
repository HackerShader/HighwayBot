const Vec3 = require('vec3').Vec3;
module.exports = {
    async execute(bot, message, args, username) {
        bot.equip(87, 'hand')
        const x = bot.entity.position.x
        const y = bot.entity.position.y
        const z = bot.entity.position.z
        async function CheckLavaBLocks(x, y, z) {
            for (var x = 1; x <= 4; x++) {
                for (var y = 0; y <= 3; y++) {
                    for (var z = -3; z <= 3; z++) {
                        const target = bot.blockAt(bot.entity.position.offset(x, y, z))
                        if(target.name == `lava`) {
                            try {
                                const lavablock = bot.blockAt(target.position.offset(0,0,0))
                                if(target.name == `netherrack`) return
                                else bot.placeBlock(lavablock, new Vec3(x, y, z))
                            } catch (error) {
                                console.log(error)
                            }
                            
                        }
                    }
                }
            }
        }
        CheckLavaBLocks(x, y, z)
    }
}