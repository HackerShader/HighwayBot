const info = require('./../package.json')

module.exports = {
    name: "changelog",
    description: "See the changelog of HighwayBot",
    execute() {
        if (info.version === undefined && info.build === undefined) return console.log('[X] HighwayBot not installed')
        console.log(
            `Change logs of ${info.version} ${info.build}` +
            `\n+ Improving command user interface` +
            `\n+ Rewrite ./util` +
            `\n+ New custom installer`);
    }
}