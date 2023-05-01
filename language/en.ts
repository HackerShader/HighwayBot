import { CommandBuilder } from '../module'

interface LaunchInfo {
    version: string;
    prefix: string;
    server: string;
    owner: string;
    bot_name: string;
    inventory_link: string
}
interface LoggingStatus {
    name: string;
    pos: string;
    status: string
}
interface LoggingData {
    mine: number;
    place: number;
    "place-err": number;
    PickaxeBroken: Array<any>
}
interface BotInfo {
    version: string;
    build: string;
    author: string;
    dir: string;
    license: string;
    main: string;
    uptime: string
}

const translate = {
    cmd: {
        welcome: () => `----- Welcome to HighwayBot controller -----`,
        commands: () => `Type:\n` +
            `> 'help' to see a list of commands\n` +
            `> 'language <your language acronym (like: 'en', 'vi',...)>' to change the default language\n` +
            `> 'runbot' to run bot`,
        command: () => `Command: `,
        command_not_found: (name: string) => `[CMD | Error] Command '${name}' not found`,
        first_time_msg: () => `[Notification] This is the first time you run translate program`,
        downloading: () => `[Notification] Downloading package(s)...`,
        download_err: (err: string) => `[Notification] Error while downloading package(s):\n${err}`,
        download_done: () => '[Notification] Downloaded package(s)',
        first_time_guide: () =>
            `To start using the bot, please do the following:\n` +
            `> Run 'config create' command to create empty 'deafult' config\n` +
            `> Run 'config edit' to edit the newly created empty 'default' config.\n` +
            `> Run 'config load default' and 'config reload' to load config\n` +
            `> Run 'runbot' to let the bot into the server if you have done all the steps above\n` +
            `Type 'help' to see a list of commands\n` +
            `Type 'language <your language symbol (like: vi, pl, en, ...)>' to use`
    },
    index: {
        miss_package: (_package: string) => `[MC-Bot | Error] Missing package ${_package}`,
        install: () => `[MC-Bot| Install] Please type 'install' for full bot installation`,
        miss_file: (file: string, config: boolean) => `[MC-Bot | Error] Can't find ${config == true ? 'config ' : ''}file '${file}'`,
        launch: (info: LaunchInfo) =>
            `[HighwayBot] Launching...\n` +
            `             Version: ${info.version}\n` +
            `             Prefix: ${info.prefix}\n` +
            `             Server: ${info.server}\n` +
            `             Owner: ${info.owner}\n` +
            `             Bot's name: ${info.bot_name}\n` +
            `             Inventory: ${info.inventory_link}\n`,
        disconnect: (reason: string) => `[MC-Bot | Disconnected] Reason: ${reason}`,
        spawn: () => `[MC-Bot | Login] Bot spawned!`,
        poisition: (poisition: string) => `[MC-Bot | Poisition] Bot's poisition: ${poisition}`,
        chat: (message: string) => `[MC-Bot | Chat] ${message}`
    },
    Core: {
        Baritone: {
            follow: {
                cant_see: () => `Bot can't find you!`,
                follow: (coord: string) => `[Baritone | Follow] Coord: ${coord}`
            },
            goto: {
                err_miss_coord: () => `[Baritone | Error | Goto] Missing coord`,
                err_invalid_y: () => `[Baritone | Error | Arguments] Y coordinate must be between 0 and 255`,
                goto: (coord: string) => `[Baritone | Goto] Cord: ${coord}`
            }
        },
        Console: {
            log: {
                log: (info: LoggingStatus, data: LoggingData) =>
                    `[HighwayBot] Infomation\n` +
                    `> Block: ${info.name}\n` +
                    `> Poisition: ${info.pos}\n` +
                    `> Status: ${info.status}\n` +
                    `[HighwayBot] Status\n` +
                    `> Total broken: ${data.mine}\n` +
                    `> Total placed: ${data.place}\n` +
                    `> Total error: ${data["place-err"]}\n` +
                    `[HighwayBot] Pickaxe Status\n` +
                    `> Current pickaxe durability used: NaN \n` + //${data.Pickaxe1.durability}
                    `> Total broken pickaxe: ${(data["PickaxeBroken"]).length}`
            }
        },
        HighwayTunnel: {
            inventory: {
                item_saver: {
                    think: () => `Thinking... I didn't have any pickaxe`
                }
            },
            highwaybuildtool: {
                start: () => `[Highway] Digging tasks started`
            }
        }
    },
    commands: {
        baritone: {
            no_command: (commands: string) => `[Baritone] Commands: ${commands}`,
            command_invalid: (command: string) => `[Baritone | Error] ${command}  is not a valid command`,
            command_err: (error: string) => `[Baritone | Error] ${error}`
        },
        help: {
            help: () => `If you need help, please go to cli and type 'mchelp' or visit https://highwaybot.tk/category/command`
        },
        infoserver: {
            info: (ip: string, tps: number, players: number) => `[${ip}] TPS: ${tps} | Players: ${players}`
        },
        mine: {
            stop: () => `[Highway] Digging tasks stopped`
        },
    },
    cli: {
        not_install: () => `[X] You haven't downloaded the full HighwayBot`,
        dev_description: () => `[!] For developers to test new features only!`,
        changelog: {
            description: () => `New updates of bots`,
            changelog: (log: string) => `Update from latest commit:\n${log}\nPress ENTER to continue...`
        },
        clear: {
            description: () => `Clear the console`,
            clear: () => `[✔] Cleared the entire console`
        },
        config: {
            description: () => `Configure the HighwayBot config`,
            miss_key: () =>
                `[Config] Usage: config <name of config> <key>\n` +
                `Available keys:\n` +
                `>  clone: Make a copy of an existing config\n` +
                `>  create: Create a new config\n` +
                `>  delete: Delete an existing config\n` +
                `>  edit: Edit an existing config\n` +
                `>  list: List all config\n` +
                `>  load: Load an existing config\n` +
                `>  reload: Reload all configs\n` +
                `>  renane: Rename an existing config\n` +
                `>  show: Show an existing config`,
            key_not_found: () => `[Config | Error] Can't find key`,
            error: (err: string) => `[Config | Error] ${err}`
        },
        exit: {
            description: () => `Exit the HighwayBot command line interface.`,
            exit: () => `[HighwayBot] Exited`
        },
        help: {
            description: () => `Displays information about one or more commands`,
            no_description: () => `No description`,
            no_aliases: () => `No alias`,
            command_not_found: (command: string) => `[Help | Error] Command '${command}' not found`,
            command: (name: string, description: string, aliases: string) =>
                `HighwayBot helper\n` +
                ` |  Command infomation\n` +
                ` |  | Name: ${name}\n` +
                ` |  | Description: ${description || translate.cli.help.no_description()}\n` +
                ` |  | Aliases: ${aliases || translate.cli.help.no_aliases()}`,
            all_commands: (commands: Array<CommandBuilder>) =>
                `HighwayBot helper\n` +
                ` | Commands list\n` +
                commands.map(cmd => ` |  | ${cmd.name} - ${cmd.description || translate.cli.help.no_description()}`).join('\n') + `\n` + // cái cli.help tồn tại nó nói undefined
                ` | \n` +
                ` | Social / Contact\n` +
                ` |  | Discord: https://discord.gg/YSZPRkKNzh\n` +
                ` |  | Github: https://github.com/HackerShader/HighwayBot`,
        },
        info: {
            description: () => `HighwayBot Information`,
            info: (info: BotInfo) =>
                `@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@       @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ | HighwayBot ${info.version}\n` +
                `@@@@@@@@@@@@@@@@@@@@@@      @@@@@@@@@@@@@@@      @@@@@@@@@@@@@@@@@@@@@@ | Build: ${info.build}\n` +
                `@@@@@@@@@@@@@@@@@    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@    @@@@@@@@@@@@@@@@@ | Owner: ${info.author}\n` +
                `@@@@@@@@@@@@@@  &@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&  @@@@@@@@@@@@@@ | Installed at: ${info.dir}\n` +
                `@@@@@@@@@@@  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  @@@@@@@@@@@ | License: ${info.license}\n` +
                `@@@@@@@@&  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  %@@@@@@@@ | Main file: ${info.main}\n` +
                `@@@@@@@  @@@@@@@@@@@@@@@@@     **@@@@@@@@@@@*@@@@@@@@@@@@@@@@@  @@@@@@@ | Uptime: ${info.uptime}\n` +
                `@@@@@  @@@@@@@@@@@@@@@@@@                       @@@@@@@@@@@@@@@@  @@@@@ | \n` +
                `@@@@  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@            @@@@@@@@@@@@@@@@@@  @@@@ | \n` +
                `@@@  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@           &@@@@@@@@@@@@@@@  @@@ | \n` +
                `@@  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@      @        @@@@@@@@@@@@@@  @@ | \n` +
                `@  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#     @@@@@@@      @@@@@@@@@@@@@  @ | \n` +
                `@  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@     @@@@@@@@@@@@*    @@@@@@@@@@@  @ | \n` +
                `@ @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*     @@@@@@@@@@@@@@@@   @@@@@@@@@@@ @ | \n` +
                `@ @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@     @@@@@@@@@@@@@@@@@@@@  @@@@@@@@@@ @ | \n` +
                `@ @@@@@@@@@@@@@@@@@@@@@@@@@@@@@     @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ @ | \n` +
                `@  @@@@@@@@@@@@@@@@@@@@@@@@@@     #@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  @ | \n` +
                `@  @@@@@@@@@@@@@@@@@@@@@@@@#     @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  @ | \n` +
                `@@  @@@@@@@@@@@@@@@@@@@@@@      @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  @@ | \n` +
                `@@@  @@@@@@@@@@@@@@@@@@@@     @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  @@@ | \n` +
                `@@@@  @@@@@@@@@@@@@@@@@     /@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  @@@@ | \n` +
                `@@@@@  @@@@@@@@@@@@@@@     @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  @@@@@ | \n` +
                `@@@@@@@  @@@@@@@@@@@&    .@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  @@@@@@@ | \n` +
                `@@@@@@@@@  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  @@@@@@@@@ | \n` +
                `@@@@@@@@@@@  ,@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@,  @@@@@@@@@@@ | \n` +
                `@@@@@@@@@@@@@@   @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@   @@@@@@@@@@@@@@ | \n` +
                `@@@@@@@@@@@@@@@@@,   @@@@@@@@@@@@@@@@@@@@@@@@@@@@@    @@@@@@@@@@@@@@@@@ | \n` +
                `@@@@@@@@@@@@@@@@@@@@@@      /@@@@@@@@@@@@@/      @@@@@@@@@@@@@@@@@@@@@@ | `
        },
        install: {
            description: () => `Start bot's installation`
        },
        language: {
            description: () => `Edit default language`,
            default: (language: string) => `[Language] Language in use: ${language}`,
            how_to_use: () =>
                `[Language] If you want to change the default language, type: 'language <your language acronym>'\n` +
                `Example:\n` +
                `'language en' for English\n` +
                `'language vi' for Vietnamese\n` +
                //`'language ja' cho tiếng Nhật\n` +
                //`'language zh' cho tiếng Trung\n` +
                //`'language ko' cho tiếng Hàn\n` +
                //`'language fr' cho tiếng Pháp\n` +
                `More info: 'https://www.loc.gov/standards/iso639-2/php/code_list.php'`,
            invalid: () => `[Language] Invalid language acronym (language acronym consisting of only 2 letters such as vi, en, ...)`,
            change: (language: string) => `[Language] Set default language to: ${language}`,
            restart: () => `[Language] Please restart HighwayBit to apply the change`
        },
        reload: {
            description: () => translate.cli.dev_description(),
            reloading: (dir: string) => `Reloading ${dir}`,
            reloaded: (file: string) => `Reloaded ${file}`,
            done: () => `[Reload] Done`
        },
        runbot: {
            description: () => `Execute HighwayBot main file`
        },
        update: {
            description: () => `Update the bot`
        },
        _config: {
            usage: (en_command: string, usage?: string) =>
                `[Config | ${en_command[0].toUpperCase()}${en_command.slice(1).toLowerCase()}] Usage: config ${en_command.toLowerCase()} <config name> ${!usage || usage.trim() == '' ? '' : usage}`,
            not_exist: (en_command: string, config: string) =>
                `[Config | ${en_command[0].toUpperCase()}${en_command.slice(1).toLowerCase()} | Error] Config '${config.toLowerCase()}' does not exist`,
            clone: {
                usage: () => translate.cli._config.usage('clone', '<clone file name>'),
                not_exist: (config: string) => translate.cli._config.not_exist('clone', config),
                already_exist: (config: string) => `[Config | Clone | Error] Config '${config}' already exist`,
                done: (base: string, clone: string) => `[Config | Clone | Done] Config '${base}' cloned to '${clone}'`
            },
            create: {
                usage: () => translate.cli._config.usage('create'),
                already_exist: (config: string) => `[Config | Clone | Error] Config '${config}' already exist`,
                done: (config: string) =>
                    `[Config | Create | Done] Created empty config '${config}'\n` +
                    `[Config | Suggest] You can use command 'config edit ${config}' to edit`
            },
            delete: {
                usage: () => translate.cli._config.usage('delete'),
                not_exist: (config: string) => translate.cli._config.not_exist('delete', config),
                done: (config: string) => `[Config | Delete | Done] Deleted config '${config}'`
            },
            edit: {
                usage: () =>
                    `${translate.cli._config.usage('edit', '<key_1>:<value_1> <key_2>:<value_2> ...')}`,
                not_exist: (config: string) => translate.cli._config.not_exist('edit', config),
                note: (config: string) => `[Config | Edit | Note] Use the 'config list ${config}' command to find out what the key is.`,
                invalid_key: (key: string) => `[Config | Edit | Error] Key '${key}' does not exist or have multiple option`,
                invalid_number: (key: string) => `[Config | Edit | Error] Key '${key}' must be a number`,
                invalid_string: (key: string) => `[Config | Edit | Error] Key '${key}' must be a string`,
                invalid_version: (version: string) => `[Config | Edit | Error] Invalid version: '${version}' (only support from 1.8 tp 1.18)`,
                done: (config: string) => `[Config | Edit | Done] Edited config '${config}'`,
                edited: (array: Array<string>) =>
                    `Edited things:\n` +
                    `>  ${array.join('\n>  ')}`
            },
            list: {
                list: (array: Array<string>, current: string) =>
                    `[Config | List] List of config files:\n` +
                    `>  ${array.map(name => {
                        let n = name.replace('.json', '');
                        if (n + '.json' == current) n += ' (current)';
                        return n;
                    }).join('\n>  ')}`
            },
            load: {
                usage: () => translate.cli._config.usage('load', ''),
                not_exist: (config: string) => translate.cli._config.not_exist('load', config),
                done: (config: string) =>
                    `[Config | Load | Done] Used config '${config}'\n`
                //`[Config | Suggest] You can use 'config reload' to reload the config`
            },
            reload: {
                done: () => `[Config | Reload] Reloaded all configs`,
                not_exist: (config: string) => `[Config | Reload | Error] Config ${config} no longer exist`,
                change: (config: string) => `[Config | Làm mới] Changed to '${config}'`
            },
            rename: {
                usage: () => translate.cli._config.usage('rename', '<new file name>'),
                not_exist: (config: string) => translate.cli._config.not_exist('rename', config),
                already_exist: (config: string) => `[Config | Rename | Error] Config '${config}' already exist`,
                done: (old_config: string, new_config: string) =>
                    `[Config | Rename | Done] Renamed '${old_config}' to '${new_config}'`
            },
            show: {
                usage: () => translate.cli._config.usage('show'),
                not_exist: (config: string) => translate.cli._config.not_exist('show', config),
                keys: () => `Keys`,
                values: () => `Values`,
            }
        },
        installer: {
            download: {
                get_information: () => `[Notification] Getting information from Github API...`,
                downloading: () => `[Notification] Downloading file(s) from Github...`,
                done: () => `[Notification] Finished dowloading file(s).`
            },
            install: {
                installing: () => `[Notification] Installing...`,
                install_done: () =>
                    `[Notification] Installed HighwayBot\n` +
                    `[Notification] Please launch the bot again to apply the changes [node cmd | ./start.bat]`
            },
            prepair: {
                choices: () =>
                    `----- Welcome to HighwayBot's installer ----\n` +
                    `This installer will help you to download the entire HighwayBot\n` +
                    `We need some information before installation\n` +
                    `\n` +
                    //`Dự án HighwayBot vẫn đang trong quá trình phát triển.\n` +
                    `Here there will be 2 options for you to install HighwayBot\n` +
                    `\n`,
                choice_1: () =>
                    `1. Download from HighwayBot's Github directly ([!] For devolopers only) (Required 'git')`,
                choice_2: () =>
                    `2. Download from the release page (Recommended for general users)`,
                choice_3: () =>
                    `3. Exit HighwayBot's installation`,
                choose: () =>
                    `Please choose the way you want to install HighwayBot.`,
                bad_choice: () =>
                    `[X] Bad choice, please choose the way you want to install HighwayBot.`,
                method_1: {
                    notification: () =>
                        `You choose to install HighwayBot from the official GitHub repository.\n` +
                        `Please wait while we are downloading the repository...`,
                    cloning: () =>
                        `[Notification] Cloning the repository...`,
                    done: () =>
                        `[Notification] Cloned the HighwayBot repository`,
                    relaunch: () =>
                        `[Notification] Please launch the bot again to apply the changes [node cmd | ./start.bat]`
                },
                method_2: {
                    notification: () => `You choose to install HighwayBot from the release page.`
                },
                method_3: {
                    exit: () =>
                        `[X] Exited the Installation`,
                },
                confirm: {
                    confirm: () =>
                        `This installer was created by HighwayBot's devoloper team.\n` +
                        `We are not responsible for any damage caused by translate installer in the beta.\n` +
                        `Are you sure to continue? (Y/N)`,
                    deny: () =>
                        `[X] Installer has been terminated.\n` +
                        `Reason: You did not agree to the terms and conditions`,
                    acccept: () =>
                        `Thank you for your cooperation\n` +
                        `Please wait for the installation process...`,
                    bad_choice: () =>
                        `[X] Bad choice, please confirm to install HighwayBot.`
                }
            },
            unzip: {
                unzipping: () => `[Notification] Extracting HighwayBot archive...`,
                unzip_done: () => `[Notification] Extracted`,
            }
        },
        _update: {
            update_git: {
                cloning: () => `[Update | Pending] Starting update...`,
                cloned: () => `[Update | Done] Cloned repo`,
                applying_change: () => `[Update | Pending] Applying change(s)...`,
                replace: () => `[Update | Done] Replaced the files`,
                apply_done: (build: string) => `[Update | Done] HighwayBot updated to build ${build}`,
                relaunch: () => `[Notification] Please launch the bot again to apply the changes [node ./cli.js | ./start.bat]`
            },
            update_release: {
                no_internet: () =>
                    `[!] You are not connected to the internet.\n` +
                    `[#] Please connect to the internet and try again.`,
                downloading: () => `[-] Downloading zip file`,
                download_done: () => `[#] Downloaded zip file`,
                unzipping: () => `[-] Unzipping file`,
                unzip_done: () => `[#] Unzipped file`,
                moving: () => `[-] Moving files`,
                move_done: () => `[#] Moved files`,
                downloading_package: (packages: number) => `[-] Downloading ${packages} package(s)`,
                download_package_done: () => `[#] Downloaded package(s)`,
                remove_temp: () => `[#] Removed temporary file.`,
                restart_timer: () => `[-] Shut down after 10s to apply change`,
                shut_down: () => `[#] Shutting down...`
            }
        }
    }
}

export { translate as default }