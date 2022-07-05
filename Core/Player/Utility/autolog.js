module.exports = async (bot) => {
    function quit() {
        bot.quit('low health');
    }

    bot.on('health', () => {
        console.log(`Health: ${bot.health}, Food: ${bot.food}`);
        if (bot.health < 5) {
            quit();
        }
    });
    setInterval(() => {
        bot.nearestEntity((entity) => {
            if (entity.name === 'ender_crystal') quit();
        });
    }, 50);
};