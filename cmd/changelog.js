const package = require('./../package.json')

module.exports = {
    name: "changelog",
    description: "See the changelog of highwaybot",
    execute() {
        console.log(
            `Change logs of ${package.version} ${package.build}` +
            `\n+ Improving command user interface` +
            `\n+ Rewrite ./util`);
            `\n+ New custom installer`
    }
}