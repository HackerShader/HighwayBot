module.exports = {
    name: "update",
    description: "Update the bot (only for developers) (requires git)",
    async execute() {
        require('./update/update')
    }
}       