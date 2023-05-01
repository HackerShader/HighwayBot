import * as Mineflayer from 'mineflayer'

type Awaitable<T> = T | PromiseLike<T>

interface CommandBuilderOption {
    name: string;
    aliases: Array<string>;
    description: string;
    subcommands: Array<string>;
    run: (args: Array<string>, cmd: Array<CommandBuilder>) => Awaitable<void | any>
}
export class CommandBuilder {
    name: string;
    aliases: Array<string>;
    description: string;
    subcommands: Array<string>;
    run: (args: Array<string>, cmd: Array<CommandBuilder>) => Awaitable<void | any>
    constructor(option?: CommandBuilderOption) {
        this.name = option?.name ?? 'name'
        this.aliases = option?.aliases ?? []
        this.description = option?.description ?? 'No description'
        this.subcommands = option?.subcommands ?? []
        this.run = option?.run ?? function () { }
    }
    setName(name: string): CommandBuilder { this.name = name; return this }
    setDescription(description: string): CommandBuilder { this.description = description; return this }
    setAliases(aliases: Array<string>): CommandBuilder { this.aliases = aliases; return this }
    setSubcommands(subcommands: Array<string>): CommandBuilder { this.subcommands = subcommands; return this }
    setRun(run: (args: Array<string>, cmd: Array<CommandBuilder>) => Awaitable<void | any>): CommandBuilder { this.run = run; return this }
}

interface EventBuilderOption {
    name: string;
    once: boolean;
    run: (bot: Mineflayer.Bot, ...args: Array<any>) => Awaitable<void | any>
}
export class EventBuilder {
    name: string;
    once: boolean
    run: (bot: Mineflayer.Bot, ...args: Array<any>) => Awaitable<void | any>
    constructor(option?: EventBuilderOption) {
        this.name = option?.name ?? 'name'
        this.once = option?.once ?? false
        this.run = option?.run ?? function () { }
    }
    setName(name: string): EventBuilder { this.name = name; return this }
    setOnce(once: boolean): EventBuilder { this.once = once; return this }
    setRun(run: (bot: Mineflayer.Bot, ...args: Array<any>) => Awaitable<void | any>): EventBuilder { this.run = run; return this }
}