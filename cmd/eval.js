module.exports = {
    name: 'eval',
    description: '!For developer testing only!',
    /**
     * 
     * @param {String[]} args 
     */
    async execute (args) {
        const fs = require('fs-extra')
        await eval(args.slice(1).join(' '))
    }
}