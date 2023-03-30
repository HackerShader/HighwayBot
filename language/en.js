const translate = {
    cmd: {
        welcome: () => `----- Welcome to HighwayBot controller -----`,
        commands: () => `Type:\n` +
            `> 'help' to see a list of commands\n` +
            `> 'language <your language acronym (like: 'en', 'vi',...)>' to change the default language\n` +
            `> 'runbot' to run bot`,
        command: () => `Command: `,
        /**
         * @param {String} name Command name
         */
        command_not_found: (name) => `[CMD | Error] Command '${name}' not found`,
        first_time_msg: () => `[Notification] This is the first time you run translate program`,
        downloading: () => `[Notification] Downloading package(s)...`,
        /**
         * @param {String} err Error
         */
        download_err: (err) => `[Notification] Error while downloading package(s):\n${err}`,
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
        /**
         * @param {String} package Package name
         */
        miss_package: (package) => `[MC-Bot | Error] Missing package ${package}`,
        install: () => `[MC-Bot| Install] Please type 'install' for full bot installation`,
        /**
         * @param {String} file File name
         * @param {Boolean} config Is that a config file
         */
        miss_file: (file, config) => `[MC-Bot | Error] Can't find ${config == true ? 'config ' : ''}file '${file}'`,
        /**
         * @param {String} version Minecraft version
         * @param {String} prefix Bot's prefix
         * @param {String} server Bot's server IP
         * @param {String} owner Bot's owner
         * @param {String} bot_name Bot's name
         * @param {String} inventory_link Inventory viewer link
         */
        launch: (version, prefix, server, owner, bot_name, inventory_link) =>
            `[HighwayBot] Launching...\n` +
            `             Version: ${version}\n` +
            `             Prefix: ${prefix}\n` +
            `             Server: ${server}\n` +
            `             Owner: ${owner}\n` +
            `             Bot's name: ${bot_name}\n` +
            `             Inventory: ${inventory_link}\n`,
        /**
         * @param {String} reason Reason bot disconnect
         */
        disconnect: (reason) => `[MC-Bot | Disconnected] Reason: ${reason}`,
        spawn: () => `[MC-Bot | Login] Bot spawned!`,
        /**
         * @param {String} poisition Bot's poisition
         */
        poisition: (poisition) => `[MC-Bot | Poisition] Bot's poisition: ${poisition}`,
        /**
         * @param {String} message Message
         */
        chat: (message) => `[MC-Bot | Chat] ${message}`
    },
    Core: {
        Baritone: {
            follow: {
                cant_see: () => `Bot can't find you!`,
                /**
                 * @param {String} coord Coord
                 */
                follow: (coord) => `[Baritone | Follow] Coord: ${coord}`
            },
            goto: {
                err_miss_coord: () => `[Baritone | Error | Goto] Missing coord`,
                err_invalid_y: () => `[Baritone | Error | Arguments] Y coordinate must be between 0 and 255`,
                /**
                 * @param {String} coord Coord
                 */
                goto: (coord) => `[Baritone | Goto] Cord: ${coord}`
            }
        },
        Console: {
            log: {
                /**
                 * @param {{name: String, pos: String, status: String}} info Status
                 * @param {{mine: Number, place: Number, "place-err": Number, PickaxeBroken: Array}} data Data
                 */
                log: (info, data) =>
                    `[HighwayBot] Infomation\n` +
                    `> Block: ${info.name}\n` +
                    `> Poisition: ${info.pos}\n` +
                    `> Status: ${info.status}\n` +
                    `[HighwayBot] Status\n` +
                    `> Total broken: ${data.mine}\n` +
                    `> Total placed: ${data.place}\n` +
                    `> Total error: ${data["place-err"]}\n` +
                    `[HighwayBot] Pickaxe Status\n` +
                    `> Current pickaxe durability used: ${data.Pickaxe1.durability}\n` +
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
            /**
             * @param {String} commands Commands
             */
            no_command: (commands) => `[Baritone] Commands: ${commands}`,
            /**
             * @param {String} command Command
             */
            command_invalid: (command) => `[Baritone | Error] ${command}  is not a valid command`,
            /**
             * @param {String} error Error
             */
            command_err: (error) => `[Baritone | Error] ${error}`
        },
        help: {
            help: () => `If you need help, please go to cli and type 'mchelp' or visit https://highwaybot.tk/category/command`
        },
        infoserver: {
            /**
             * @param {String} ip Server's IP
             * @param {Number} tps TPS
             * @param {Number} players Players
             */
            info: (ip, tps, players) => `[${ip}] TPS: ${tps} | Players: ${players}`
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
            /**
             * @param {String} log Commit logs
             */
            changelog: (log) => `Update from latest commit:\n${log}\nPress ENTER to continue...`
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
            /**
             * @param {String} key Key
             */
            key_not_found: () => `[Config | Error] Can't find key`,
            /**
             * @param {String} err Error
             */
            error: (err) => `[Config | Error] ${err}`
        },
        exit: {
            description: () => `Exit the HighwayBot command line interface.`,
            exit: () => `[HighwayBot] Exited`
        },
        help: {
            description: () => `Displays information about one or more commands`,
            no_description: () => `No description`,
            no_aliases: () => `No alias`,
            /**
             * @param {String} command
             */
            command_not_found: (command) => `[Help | Error] Command '${command}' not found`,
            /**
             * @param {String} name 
             * @param {String} description 
             * @param {String} aliases 
             */
            command: (name, description, aliases) =>
                `HighwayBot helper\n` +
                ` |  Command infomation\n` +
                ` |  | Name: ${name}\n` +
                ` |  | Description: ${description || translate.no_description()}\n` +
                ` |  | Aliases: ${aliases || translate.no_aliases()}`,
            /**
             * @param {Array} commands
             */
            all_commands: (commands) =>
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
            /**
             * @param {{version: String, build: String, owner: String, dir: String, license: String, main: String, uptime: }} info 
             */
            info: (info) =>
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
            /**
             * @param {String} language Language
             */
            default: (language) => `[Language] Language in use: ${language}`,
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
            /**
             * @param {String} language Language
             */
            change: (language) => `[Language] Set default language to: ${language}`,
            restart: () => `[Language] Please restart HighwayBit to apply the change`
        },
        reload: {
            description: () => translate.cli.dev_description(),
            /**
             * @param {String} dir
             */
            reloading: (dir) => `Reloading ${dir}`,
            /**
             * @param {String} file File name
             */
            reloaded: (file) => `Reloaded ${file}`,
            done: () => `[Reload] Done`
        },
        runbot: {
            description: () => `Execute HighwayBot main file`
        },
        update: {
            description: () => `Update the bot`
        },
        _config: {
            /**
             * @param {String} en_command
             * @param {String} usage
             */
            usage: (en_command, usage) =>
                `[Config | ${en_command[0].toUpperCase()}${en_command.slice(1).toLowerCase()}] Usage: config ${en_command.toLowerCase()} <config name> ${!usage || usage.trim() == '' ? '' : `${usage}`}`,
            /**
             * @param {String} en_command
             * @param {String} config
             */
            not_exist: (en_command, config) =>
                `[Config | ${en_command[0].toUpperCase()}${en_command.slice(1).toLowerCase()} | Error] Config '${config.toLowerCase()}' does not exist`,
            clone: {
                usage: () => translate.cli._config.usage('clone', '<clone file name>'),
                /**
                 * @param {String} config Config name
                 */
                not_exist: (config) => translate.cli._config.not_exist('clone', config),
                /**
                 * @param {String} config Config name
                 */
                already_exist: (config) => `[Config | Clone | Error] Config '${config}' already exist`,
                /**
                 * @param {String} base Base config
                 * @param {String} clone Clone config
                 */
                done: (base, clone) => `[Config | Clone | Done] Config '${base}' cloned to '${clone}'`
            },
            create: {
                usage: () => translate.cli._config.usage('create'),
                /**
                 * @param {String} config Config name
                 */
                already_exist: (config) => `[Config | Clone | Error] Config '${config}' already exist`,
                /**
                 * @param {String} config Config name
                 */
                done: (config) =>
                    `[Config | Create | Done] Created empty config '${config}'\n` +
                    `[Config | Suggest] You can use command 'config edit ${config}' to edit`
            },
            delete: {
                usage: () => translate.cli._config.usage('delete'),
                /**
                 * @param {String} config Config name
                 */
                not_exist: (config) => translate.cli._config.not_exist('delete', config),
                /**
                * @param {String} config Config name
                */
                done: (config) => `[Config | Delete | Done] Deleted config '${config}'`
            },
            edit: {
                usage: () =>
                    `${translate.cli._config.usage('edit', '<key_1>:<value_1> <key_2>:<value_2> ...')}`,
                /**
                 * @param {String} config Config name
                 */
                not_exist: (config) => translate.cli._config.not_exist('edit', config),
                /**
                 * @param {String} config Config name
                 */
                note: (config) => `[Config | Edit | Note] Use the 'config list ${config}' command to find out what the key is.`,
                /**
                 * @param {String} key Key
                 */
                invalid_key: (key) => `[Config | Edit | Error] Key '${key}' does not exist or have multiple option`,
                /**
                 * @param {String} key Key
                 */
                invalid_number: (key) => `[Config | Edit | Error] Key '${key}' must be a number`,
                /**
                 * @param {String} key Key
                 */
                invalid_string: (key) => `[Config | Edit | Error] Key '${key}' must be a string`,
                /**
                 * @param {String} version Minecraft version
                 */
                invalid_version: (version) => `[Config | Edit | Error] Invalid version: '${version}' (only support from 1.8 tp 1.18)`,
                /**
                 * @param {String} config Config name 
                 */
                done: (config) => `[Config | Edit | Done] Edited config '${config}'`,
                /**
                 * @param {String[]} array Array of string
                 */
                edited: (array) =>
                    `Edited things:\n` +
                    `>  ${array.join('\n>  ')}`
            },
            list: {
                /**
                 * @param {String[]} array Array of config
                 * @param {Stirng} current Current config
                 */
                list: (array, current) =>
                    `[Config | List] List of config files:\n` +
                    `>  ${array.map(name => {
                        let n = name.replace('.json', '');
                        if (n + '.json' == current) n += ' (current)';
                        return n;
                    }).join('\n>  ')}`
            },
            load: {
                usage: () => translate.cli._config.usage('load', ''),
                /**
                 * @param {String} config Config name
                 */
                not_exist: (config) => translate.cli._config.not_exist('load', config),
                /**
                 * @param {String} config Config name
                 */
                done: (config) =>
                    `[Config | Load | Done] Used config '${config}'\n`
                //`[Config | Suggest] You can use 'config reload' to reload the config`
            },
            reload: {
                done: () => `[Config | Reload] Reloaded all configs`,
                /**
                 * @param {String} config Config name
                 */
                not_exist: (config) => `[Config | Reload | Error] Config ${config} no longer exist`,
                /**
                 * @param {String} config Config name
                 */
                change: (config) => `[Config | Làm mới] Changed to '${config}'`
            },
            rename: {
                usage: () => translate.cli._config.usage('rename', '<new file name>'),
                /**
                 * @param {String} config Config name
                 */
                not_exist: (config) => translate.cli._config.not_exist('rename', config),
                /**
                 * @param {String} config Config name
                 */
                already_exist: (config) => `[Config | Rename | Error] Config '${config}' already exist`,
                /**
                 * @param {String} old_config Old config name
                 * @param {String} new_config New config name
                 */
                done: (old_config, new_config) =>
                    `[Config | Rename | Done] Renamed '${old_config}' to '${new_config}'`
            },
            show: {
                usage: () => translate.cli._config.usage('show'),
                /**
                 * @param {String} config Config name
                 */
                not_exist: (config) => translate.cli._config.not_exist('show', config),
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
                /**
                 * @param {String} build 
                 */
                apply_done: (build) => `[Update | Done] HighwayBot updated to build ${build}`,
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
                /**
                 * @param {Number} packages
                 */
                downloading_package: (packages) => `[-] Downloading ${packages} package(s)`,
                download_package_done: () => `[#] Downloaded package(s)`,
                remove_temp: () => `[#] Removed temporary file.`,
                restart_timer: () => `[-] Shut down after 10s to apply change`,
                shut_down: () => `[#] Shutting down...`
            }
        }
    }
}

module.exports = translate