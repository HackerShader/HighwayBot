const info = require('./../package.json');

module.exports = {
    name: "changelog",
    description: "See the changelog of HighwayBot",
    aliases: ['updateinfo'],
    execute() {
        if (info.version === undefined && info.build === undefined) return console.log('\x1b[0m[X] HighwayBot not installed!\x1b[0m');
        console.log(
        `\x1b[0m[\x1b[32mHighwayBot Changelog\x1b[0m]\x1b[0m` 
        );
    }
};