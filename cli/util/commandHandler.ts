import { readdirSync, lstatSync } from 'node:fs'
import { CommandBuilder } from '../../module'

export default function (): Array<CommandBuilder> {
    let cmd_array: Array<CommandBuilder> = []
    readdirSync('./cli/commands/')
        .filter(file => lstatSync(`./cli/commands/${file}`).isFile() && (file.endsWith('.js') || file.endsWith('.ts')))
        .forEach(async (file) => {
            const cmd: CommandBuilder = await import(`../commands/${file}`)
            if (!cmd.name || !cmd.run) return console.error(`file 'cli/command/${file}' missing name or run function`)
            if (!!cmd_array.find(command => command.name == cmd.name) || !!cmd_array.find(command => command.aliases.includes(cmd.name))) console.error(`command '${cmd.name} already exist'`)
            cmd_array.push(cmd)
        })
    return cmd_array
}