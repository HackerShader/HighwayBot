const string = require('../language/translate')

module.exports = {
    name: "help",
    description: string('cli.help.description'),
    aliases: ['h', 'commands', 'cmds', 'cmd', 'command', 'cmdlist'],
    /**
     * 
     * @param {String[]} args 
     * @param {Array} cmds 
     */
    async execute(args, cmds) {
        if (args[0]) {
            const command = cmds.find(cmd => cmd.name === args[0])
                || cmds.find(
                    cmd =>
                        cmd.aliases != null && Array.isArray(cmd.aliases)
                            ? cmd.aliases.includes(args[0])
                            : false
                );
            if (!command) console.log(string('cli.help.command_not_found', args[0]));
            console.log(string('cli.help.command', command.name, command.description, command.aliases?.join(', ')))
        } else {
            console.log(string('cli.help.all_commands', cmds))
        }
    }
};