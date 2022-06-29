const info = require('./../package.json')

module.exports = {
    name: "changelog",
    description: "See the changelog of HighwayBot",
    execute() {
        if (info.version === undefined && info.build === undefined) return console.log('[X] HighwayBot not installed')
        console.log(
            `Change logs of ${info.version} ${info.build}` +
            `\nAdded/Improved:` +
            `\n\t> New custom installer` +
            `\n\t> New custom console/commandline interface` +
            `\n\t> Improved dig tunnel algorithm` +
            `\n\t> Improved item saver` +
            `\n\t> Improved Highway scaffold` +
            `\nModified:` +
            `\n\t> Reconstructed ./Core` +
            `\n\t> console log of mine.js`
        )
    }
}