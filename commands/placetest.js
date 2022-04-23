const {Vec3} = require("vec3");

module.exports = {
    name: "placetest",
    async execute(bot) {
        const target = bot.blockAt(bot.entity.position.offset(2, 0, 0))
        try {
            await bot.placeBlock(target, new Vec3(1, 0, 0))
        } catch (error) {
            console.log(error)
        }
    }
}
