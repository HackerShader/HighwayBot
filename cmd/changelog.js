const info = require('./../package.json');

module.exports = {
    name: "changelog",
    description: "See the changelog of HighwayBot",
    aliases: ['updateinfo'],
    execute() {
        if (info.version === undefined && info.build === undefined) return console.log('\x1b[0m[X] HighwayBot not installed!\x1b[0m');
        console.log(`\x1b[0m[Notification] HighwayBot changelog ${info.version} ${info.build}\x1b[0m` +
            '**Added/Improved:**\n' +
            '\n' +
            '> The Downloader of HighwayBot\n' +
            '> Improved HighwayBot dig algorithm\n' +
            '> Aliases command for CLI\n' +
            '> Improved Config system\n' +
            '> Added Velocity, AutoCrystal (might break), AutoTotem')
    }
};