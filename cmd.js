const prompt = require('prompt')
const fs = require('fs')
const package = require('./package.json')
const command = require("./cmd/help");
const child_process = require('child_process').exec

console.log(`Welcome to HighwayBot controller\nHighwayBot version: ${package.version}\nType \'help\' to see a list of commands\n`)

function promptcallback() {
    prompt.start()
    prompt.get('commands', function (err, result) {
        try {
            if(!result.commands) return promptcallback();
            const command = require(`./cmd/${result.commands}.js`)
            command.exec()
            promptcallback()
        } catch (err) {
            if(!result) return;
            console.log(`${result.commands}: Command not found`)
            promptcallback()
        }

    })
}
promptcallback()