module.exports = {
    name: "update",
    description: "Update the bot (Not recommended | Only for developers) (requires git)",
    aliases: ['up'],
    async execute(args) {
        if(!args[1]) return;
        if (args[1] === `updaterl`) {
            require('./')
        } 

    }
};