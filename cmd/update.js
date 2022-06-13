const exec = require('child_process').exec
const fs = require('fs')
module.exports = {
    name: "update",
    description: "Update the bot",
    async execute() {
        require('./update/update')
    }
}