module.exports = {
    name: "update",
    description: "Update the bot (Not recommended | Only for developers) (requires git)",
    aliases: ['up'],
    async execute() {
        await require('./update/update');
    }
};