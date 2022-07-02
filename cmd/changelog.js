const info = require('./../package.json');

module.exports = {
    name: "changelog",
    description: "See the changelog of HighwayBot",
    execute() {
        if (info.version === undefined && info.build === undefined) return console.log('\x1b[0m[X] HighwayBot not installed!\x1b[0m');
        console.log(
            `Change logs of ${info.version} ${info.build}` +
            `\x1b` + `\n[32mAdded/Improved:` +
            `\n\t> New custom installer` +
            `\n\t> New custom console/commandline interface` +
            `\n\t> Improved dig tunnel algorithm` +
            `\n\t> Improved item saver` +
            `\n\t> Improved Highway scaffold` + `\x1b[0m` +
            `\x1b[33m` + `\nModified:` +
            `\n\t> Reconstructed ./Core` +
            `\n\t> Console log of mine.js` + `\x1b[0m`
        );
    }
};