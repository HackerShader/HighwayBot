const editJsonFile = require('edit-json-file')
const fs = require('fs-extra')

module.exports = {
    name: "config",
    description: "Configure the HighwayBot config",
    async execute(args) {
        const package = require('./../package.json')
        //if (package.build === undefined) return console.log('[X] HighwayBot not installed]')
        //check value exists in default.json
        const defaultConfig = editJsonFile('./../config/default.json')
        const defaultConfigValues = Object.values(defaultConfig.data)


        if (!fs.existsSync('./config')) fs.mkdirSync('./config')
        if (!fs.existsSync('./config/default.json')) fs.writeFileSync('./config/default.json', '{\n}')
        console.log(args[1])
        console.log(defaultConfigValues)



        

    }
}
