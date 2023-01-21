//const config = require(`./../../`);

module.exports = async (bot) => {
    bot._client.on('entity_velocity', v => {
        if (bot.entity.id !== v.entityId) return;
        bot.entity.velocity.x = 0;
        bot.entity.velocity.y = 0;
        bot.entity.velocity.z = 0;
    });
};
