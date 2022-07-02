const {Vec3} = require("vec3");

module.exports = {
    name: "placetest",
    async execute(bot) {
        const target = bot.blockAt(bot.entity.position.offset(2, 0, 0));
        try {
            bot.equip(87, 'hand');
            await bot.lookAt(new Vec3(target.position.x, target.position.y, target.position.z + 0.5));
            await bot.placeBlock(target, new Vec3(0, -1, 0));
        } catch (error) {
            console.log(error);
        }
    }
};
