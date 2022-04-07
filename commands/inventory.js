module.exports = {
    name: 'inventory',
    execute(bot, message, args, username)  {
        bot.inventory.slots.forEach((d) => console.log(d))
        //need fix this object
    }    
}


