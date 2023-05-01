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

const translate = {
    cmd: {
        welcome: () => `----- Chào mừng bạn đến với bộ điều khiển HighwayBot -----`,
        commands: () => `Nhập:\n` +
            `> 'help' để biết danh sách lệnh\n` +
            `> 'language <viết tắt của ngôn ngữ của bạn (như: 'en', 'vi',...)>' để đổi ngôn ngữ mặc định\n` +
            `> 'runbot' để chạy bot`,
        command: () => `Lệnh: `,
        command_not_found: (name: string) => `[Lệnh | Lỗi] Không tìm thấy lệnh '${name}'`,
        first_time_msg: () => `[Thông báo] Đây là lần đầu bạn dùng HighwayBot`,
        downloading: () => `[Thông báo] Đang tải các gói tài nguyên...`,
        download_err: (err: string) => `[Thông báo] Gặp lỗi khi tải gói tài nguyên:\n${err}`,
        download_done: () => '[Thông báo] Đã tải xong các gói tài nguyên.',
        first_time_guide: () =>
            `Để có thể chạy bot, vui lòng chạy các lệnh sau:\n` +
            `> 'config create': tạo 1 config rỗng tên 'default'\n` +
            `> 'config edit': chỉnh sửa các thông số của config vừa tạo.\n` +
            `> 'config load default' và 'config reload': dùng config vừa tạo\n` +
            `> 'runbot': để cho bot vào server nếu bạn đã làm theo các bước trên\n` +
            `Gõ 'help' để xem danh sách các lệnh\n` +
            `Gõ 'language <kí hiệu của các ngôn ngữ (ví dụ: vi, en, ...)>' để đổi ngôn ngữ đang dùng`
    },
    index: {
        miss_package: (_package: string) => `[MC-Bot | Lỗi] Thiếu gói tài nguyên ${_package}`,
        install: () => `[MC-Bot| Cài đặt] Bạn vui lòng nhập lệnh 'install' để tải toàn bộ bot`,
        miss_file: (file: string, config: boolean) => `[MC-Bot | Lỗi] Không thể tìm thấy file ${config == true ? 'cài đặt ' : ''}'${file}'`,
        launch: (info: LaunchInfo) =>
            `[HighwayBot] Đang khởi động bot...\n` +
            `             Version: ${info.version}\n` +
            `             Prefix: ${info.prefix}\n` +
            `             Server: ${info.server}\n` +
            `             Owner: ${info.owner}\n` +
            `             Bot's name: ${info.bot_name}\n` +
            `             Inventory: ${info.inventory_link}\n`,
        disconnect: (reason: string) => `[MC-Bot | Ngắt kết nối] Lý do: ${reason}`,
        spawn: () => `[MC-Bot | Đăng nhập] Bot đã vào server`,
        poisition: (poisition: string) => `[MC-Bot | Vị trí] Vị trí của bot: ${poisition}`,
        chat: (message: string) => `[MC-Bot | Tin nhắn] ${message}`
    },
    Core: {
        Baritone: {
            follow: {
                cant_see: () => `Bot không tìm thấy bạn!`,
                follow: (coord: string) => `[Baritone | Đi theo] Tọa độ: ${coord}`
            },
            goto: {
                err_miss_coord: () => `[Baritone | Lỗi | Đi đến] Thiếu tọa độ`,
                err_invalid_y: () => `[Baritone | Lỗi | Giá trị] Giá trị Y không hợp lệ (0 < Y < 255)`,
                goto: (coord: string) => `[Baritone | Đi đến] Tọa độ: ${coord}`
            }
        },
        Console: {
            log: {
                log: (info: LoggingStatus, data: LoggingData) =>
                    `[HighwayBot] Thông tin\n` +
                    `> Tên khối: ${info.name}\n` +
                    `> Vị trí: ${info.pos}\n` +
                    `> Tình trạng: ${info.status}\n` +
                    `[HighwayBot] Tiến độ\n` +
                    `> Tổng số khối đã đập: ${data.mine}\n` +
                    `> Tổng số khối đã đặt: ${data.place}\n` +
                    `> Tổng số lỗi: ${data["place-err"]}\n` +
                    `[HighwayBot] Tình trạng cúp\n` +
                    `> Độ bền đã dùng: NaN \n` + //${data.Pickaxe1.durability}
                    `> Tổng số cúp đã hư: ${(data["PickaxeBroken"]).length}`
            }
        },
        HighwayTunnel: {
            inventory: {
                item_saver: {
                    think: () => `Hmmm...Tôi không có cây cúp nào cả.`
                }
            },
            highwaybuildtool: {
                start: () => `[Highway] Bắt đầu quá trình đào`
            }
        }
    },
    commands: {
        baritone: {
            no_command: (commands: string) => `[Baritone] Toàn bộ lệnh: ${commands}`,
            command_invalid: (command: string) => `[Baritone | Lỗi] Không tìm thấy lệnh ${command}`,
            command_err: (error: string) => `[Baritone | Lỗi] ${error}`
        },
        help: {
            help: () => `Nếu bạn cần giúp đỡ, vui lòng vào cli và dùng lệnh 'help' hoặc truy cập 'https://highwaybot.tk/category/command'`
        },
        infoserver: {
            info: (ip: string, tps: number, players: number) => `[${ip}] TPS: ${tps} | Tổng số người chơi: ${players}`
        },
        mine: {
            stop: () => `[Highway] Đã dừng việc đào`
        },
    },
    cli: {
        not_install: () => `[X] Bạn chưa tải toàn bộ HighwayBot`,
        dev_description: () => `[!] Chỉ dành cho nhà phát triển thử nghiệm tính năng mới`,
        changelog: {
            description: () => `Các cập nhật mới của bot`,
            changelog: (log: string) => `Cập nhật từ commit mới nhất:\n${log}\nNhấn ENTER để tiếp tục...`
        },
        clear: {
            description: () => `Xóa toàn bộ console`,
            clear: () => `[✔] Đã xóa toàn bộ console`
        },
        config: {
            description: () => `Chỉnh sửa các cài đặt của HighwayBot`,
            miss_key: () =>
                `[Cài đặt] Cách dùng: config <tên cài đặt> <key>\n` +
                `Các 'key' hiện có\n` +
                `>  clone: Tạo bản sao của 1 cài đặt\n` +
                `>  create: Tạo cài đặt mới\n` +
                `>  delete: Xóa 1 cài đặt\n` +
                `>  edit: Chỉnh sửa cài đặt\n` +
                `>  list: Liệt kê toàn bộ cài đặt\n` +
                `>  load: Sử dụng cài đặt\n` +
                `>  reload: làm mới toàn bộ cài đặt\n` +
                `>  renane: Đổi tên cài đặt\n` +
                `>  show: Hiện 1 cài đặt`,
            key_not_found: (key: string) => `[Cài đặt | Lỗi] Không tìm thấy key ${key}`,
            error: (err: string) => `[Cài đặt | Lỗi] ${err}`
        },
        exit: {
            description: () => `Tắt bot`,
            exit: () => `[HighwayBot] Đã tắt`
        },
        help: {
            description: () => `Hiện toàn bộ hoặc thông tin của 1 lệnh`,
            no_description: () => `Không có mô tả`,
            no_aliases: () => `Không có tên khác`,
            command_not_found: (command: string) => `[Hỗ trợ | Lỗi] Không tìm thấy lệnh '${command}'`,
            command: (name: string, description: string, aliases: string) =>
                `Hỗ trợ của HighwayBot\n` +
                ` |  Thông tin về lệnh\n` +
                ` |  | Tên: ${name}\n` +
                ` |  | Mô tả: ${description || translate.cli.help.no_description()}\n` +
                ` |  | Tên khác: ${aliases || translate.cli.help.no_aliases()}`,
            all_commands: (commands: Array<CommandBuilder>) =>
                `Hỗ trợ của HighwayBot\n` +
                ` | Danh sách toàn bộ lệnh:\n` +
                commands.map(cmd => ` |  | ${cmd.name} - ${cmd.description || translate.cli.help.no_description()}`).join('\n') + `\n` +
                ` | \n` +
                ` | Các kênh truyền thông và hỗ trợ\n` +
                ` |  | Discord: https://discord.gg/YSZPRkKNzh\n` +
                ` |  | Github: https://github.com/HackerShader/HighwayBot`,
        },
        info: {
            description: () => `Thông tin về HighwayBot`,
            info: (info: {version: string, build: string, author: string, dir: string, license: string, main: string, uptime: string}) =>
                `@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@       @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ | HighwayBot ${info.version}\n` +
                `@@@@@@@@@@@@@@@@@@@@@@      @@@@@@@@@@@@@@@      @@@@@@@@@@@@@@@@@@@@@@ | Build: ${info.build}\n` +
                `@@@@@@@@@@@@@@@@@    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@    @@@@@@@@@@@@@@@@@ | Chủ sở hữu: ${info.author}\n` +
                `@@@@@@@@@@@@@@  &@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&  @@@@@@@@@@@@@@ | Cài đặt ở: ${info.dir}\n` +
                `@@@@@@@@@@@  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  @@@@@@@@@@@ | Giấy phép: ${info.license}\n` +
                `@@@@@@@@&  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  %@@@@@@@@ | File gốc: ${info.main}\n` +
                `@@@@@@@  @@@@@@@@@@@@@@@@@     **@@@@@@@@@@@*@@@@@@@@@@@@@@@@@  @@@@@@@ | THời gian online: ${info.uptime}\n` +
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
            description: () => `Khởi động quá trình tải bot`
        },
        language: {
            description: () => `Chỉnh sửa ngôn ngữ mặc định`,
            default: (language: string) => `[Ngôn ngữ] Ngôn ngữ đang sử dụng: ${language}`,
            how_to_use: () =>
                `[Ngôn ngữ] Nếu bạn muốn chỉnh ngôn ngữ mặc định, nhập: 'language <viết tắt của ngôn ngữ của bạn>'\n` +
                `Ví dụ:\n` +
                `'language en' cho tiếng Anh\n` +
                `'language vi' cho tiếng Việt\n` +
                //`'language ja' cho tiếng Nhật\n` +
                //`'language zh' cho tiếng Trung\n` +
                //`'language ko' cho tiếng Hàn\n` +
                //`'language fr' cho tiếng Pháp\n` +
                `Xem thêm tại: 'https://www.loc.gov/standards/iso639-2/php/code_list.php'`,
            invalid: () => `[Ngôn ngữ] Tên viết tắt không hợp lệ (chỉ gồm 2 chữ cái như: vi, en, ...)`,
            change: (language: string) => `[Ngôn ngữ] Đã chỉnh thành: ${language}`,
            restart: () => `[Ngôn ngữ] Vui lòng restrat bot.`
        },
        runbot: {
            description: () => `Chạy bot`
        },
        update: {
            description: () => `Cập nhật bot`
        },
        _config: {
            usage: (vi_command: string, en_command: string, usage: string) =>
                `[Cài đặt | ${vi_command[0].toUpperCase()}${vi_command.slice(1).toLowerCase()}] Cách dùng: config ${en_command.toLowerCase()} <tên cài đặt> ${!usage || usage.trim() == '' ? '' : `${usage}`}`,
            not_exist: (vi_command: string, config: string) =>
                `[Cài đặt | ${vi_command[0].toUpperCase()}${vi_command.slice(1).toLowerCase()} | Lỗi] Cài đặt '${config.toLowerCase()}' không tồn tại`,
            clone: {
                usage: () => translate.cli._config.usage('sao chép', 'clone', '<tên bản sao>'),
                not_exist: (config: string) => translate.cli._config.not_exist('sao chép', config),
                already_exist: (config: string) => `[Cài đặt | Sao chép | Lỗi] Cài đặt '${config}' đã tồn tại`,
                done: (base: string, clone: string) => `[Cài đặt | Sao chép | Hoàn thành] Đã tạo bản sao '${clone}' từ '${base}'`
            },
            create: {
                usage: () => translate.cli._config.usage('tạo', 'create', ''),
                already_exist: (config: string) => `[Cài đặt | Sao chép | Lỗi] Cài đặt '${config}' đã tồn tại`,
                done: (config: string) =>
                    `[Cài đặt | Tạo | Hoàn thành] Đã tạo cài đặt rỗng '${config}'\n` +
                    `[Cài đặt | Đề nghị] Bạn có thể dùng lệnh 'config edit ${config}' để chỉnh sửa`
            },
            delete: {
                usage: () => translate.cli._config.usage('xóa', 'delete', ''),
                not_exist: (config: string) => translate.cli._config.not_exist('xóa', config),
                done: (config: string) => `[Cài đặt | Xóa | Hoàn thành] Đã xóa cài đặt '${config}'`
            },
            edit: {
                usage: () =>
                    `${translate.cli._config.usage('chỉnh sửa', 'edit', '<key_1>:<giá_trị_1> <key_2>:<giá_trị_2> ...')}`,
                not_exist: (config: string) => translate.cli._config.not_exist('chỉnh sửa', config),
                note: (config: string) => `[Cài đặt | Chỉnh sửa | Ghi chú] Bạn có thể dùng 'config show ${config}' để biết các key và giá trị`,
                invalid_key: (key: string) => `[Cài đặt | Chỉnh sửa | Lỗi] Key '${key}' không tồn tại hoặc có nhiều lựa chọn`,
                invalid_number: (key: string) => `[Cài đặt | Chỉnh sửa | Lỗi] Key '${key}' phải là một con số`,
                invalid_string: (key: string) => `[Cài đặt | Chỉnh sửa | Lỗi] Key '${key}' phải là một chuỗi ký tự`,
                invalid_version: (version: string) => `[Cài đặt | Chỉnh sửa | Lỗi] Phiên bản '${version}' không hợp lệ (chỉ hỗ trợ từ 1.8 đến 1.18)`,
                done: (config: string) => `[Cài đặt | Chỉnh sửa | Hoàn thành] Đã chỉnh sửa cài đặt '${config}'`,
                edited: (array: Array<string>) =>
                    `Những thứ đã chỉnh sửa:\n` +
                    `>  ${array.join('\n>  ')}`
            },
            list: {
                list: (array: Array<string>, current: string) =>
                    `[Config | Thống kê] Danh sách các cài đặt:\n` +
                    `>  ${array.map(name => {
                        let n = name.replace('.json', '');
                        if (n + '.json' == current) n += ' (đang dùng)';
                        return n;
                    }).join('\n>  ')}`
            },
            load: {
                usage: () => translate.cli._config.usage('dùng', 'load', ''),
                not_exist: (config: string) => translate.cli._config.not_exist('dùng', config),
                done: (config: string) =>
                    `[Cài đặt | Tải | Hoàn thành] Đã tải cài đặt '${config}'\n`
                //`[Cài đặt | Đề nghị] Bạn có thể dùng 'config reload' để làm mới cài đặt`
            },
            reload: {
                done: () => `[Cài đặt | Làm mới] Đã làm mới toàn bộ cài đặt`,
                not_exist: (config: string) => `[Cài đặt | Làm mới | Lỗi] Cài đặt ${config} không còn tồn tại`,
                change: (config: string) => `[Cài đặt | Làm mới] Đã chuyển cài đặt thành '${config}'`
            },
            rename: {
                usage: () => translate.cli._config.usage('đổi tên', 'rename', '<tên mới>'),
                not_exist: (config: string) => translate.cli._config.not_exist('đổi tên', config),
                already_exist: (config: string) => `[Cài đặt | Đổi tên | Lỗi] Cài đặt '${config}' đã tồn tại`,
                done: (old_config: string, new_config: string) =>
                    `[Cài đặt | Đổi tên | Hoàn thành] Đã đổi tên '${old_config}' thành '${new_config}'`
            },
            show: {
                usage: () => translate.cli._config.usage('thống kê', 'show', ''),
                not_exist: (config: string) => translate.cli._config.not_exist('thống kê', config),
                keys: () => `Key`,
                values: () => `Giá trị`,
            }
        },
        installer: {
            download: {
                get_information: () => `[Thông báo] Đang lấy thông tin từ API của Github...`,
                downloading: () => `[Thông báo] Đang tải File từ Github...`,
                done: () => `[Thông báo] Đã tải xong.`
            },
            install: {
                installing: () => `[Thông báo] Đang tải HighwayBot...`,
                install_done: () =>
                    `[Thông báo] Đã tải toàn bộ HighwayBot\n` +
                    `[Thông báo] Vui lòng khởi động lại HighwayBot [node cmd | ./start.bat]`
            },
            prepair: {
                choices: () =>
                    `----- Chào mừng bạn đã đến bộ cài đặt của HighwayBot ----\n` +
                    `Bộ cài đặt này sẽ giúp bạn tải toàn bộ HighwayBot\n` +
                    `Chúng tôi cần một số thông tin trước khi cài đặt\n` +
                    `\n` +
                    //`Dự án HighwayBot vẫn đang trong quá trình phát triển.\n` +
                    `Ở đây sẽ có 2 lựa chọn cho bạn khi tải HighwayBot\n` +
                    `\n`,
                choice_1: () =>
                    `1. Tải từ trực tiếp từ Github của HighwayBot ([!] Chỉ dành cho các nhà phát triển) (Yêu cầu 'git')`,
                choice_2: () =>
                    `2. Tải từ trang cập nhật các phiên bản mới (Khuyến nghị cho các người dùng phổ thông)`,
                choice_3: () =>
                    `3. Thoát bộ cài đặt HighwayBot`,
                choose: () =>
                    `Vui lòng chọn các bạn muốn tải HighwayBot`,
                bad_choice: () =>
                    `[X] Lựa chọn không hợp lệ, vui lòng chọn các tải HighwayBot.`,
                method_1: {
                    notification: () =>
                        `Bạn đã chọn cách 1 (tải từ Github)\n` +
                        `Vui lòng chờ trong lúc HighwayBot đang tải xuống...`,
                    cloning: () =>
                        `[Thông báo] Đang tải...`,
                    done: () =>
                        `[Thông báo] Đã tải xong.`,
                    relaunch: () =>
                        `[Thông báo] Vui lòng khởi động lại HighwayBot [node cmd | ./start.bat]`
                },
                method_2: {
                    notification: () => `Bạn đã chọn cách 2 (tải từ trang cập nhật)`,
                },
                method_3: {
                    exit: () =>
                        `[X] Đã thoát trình tải xuống`,
                },
                confirm: {
                    confirm: () =>
                        `Bộ cài đặt này được tạo ra bởi đội lập trình của HighwayBot.\n` +
                        `Chúng tôi không chịu trách nhiệm cho bất kỳ thiệt hại nào do trình cài đặt này gây ra trong bản thử nghiệm\n` +
                        `Bạn có chắc chắn tiếp tục? (Y / N)`,
                    deny: () =>
                        `[X] Đã dừng việc tải\n` +
                        `Lý do: Bạn không đồng ý với các điều khoản`,
                    acccept: () =>
                        `Cảm ơn bạn đã hợp tác\n` +
                        `Đã khởi động quá trình tải xuống...`,
                    bad_choice: () =>
                        `[X] Lựa chọn không hợp lệ, vui lòng đồng ý hoặc từchoi61 việc tải HighwayBot.`
                }
            },
            unzip: {
                unzipping: () => `[Thông báo] Đang giải nén các File...`,
                unzip_done: () => `[Thông báo] Đã giải nén các File`,
            }
        },
        _update: {
            update_git: {
                cloning: () => `[Cập nhật | Đang tải] Bắt đầu cập nhật...`,
                cloned: () => `[Cập nhật | Hoàn thành] Đã tải xong repo`,
                replace: () => `[Cập nhật | Hoàn thành] Đã di chuyển các file`,
                applying_change: () => `[Cập nhật | Đang tải] Đang áp dụng các thay đổi...`,
                apply_done: (build: string) => `[Cập nhật | Hoàn thành] Đã cập nhật HighwayBot lên bản ${build}`,
                relaunch: () => `[Thông báo] Vui lòng restart HighwayBot [node ./cli.js | ./start.bat]`
            },
            update_release: {
                no_internet: () =>
                    `[!] Bạn đang ngoại tuyến.\n` +
                    `[#] Vui lòng kết nối internet và thử lại.`,
                downloading: () => `[-] Đang tải file zip`,
                download_done: () => `[#] Đã tải file zip`,
                unzipping: () => `[-] Đang giải nén`,
                unzip_done: () => `[#] Đã giải nén file`,
                moving: () => `[-] Đang chuyển file`,
                move_done: () => `[#] Đã chuyển file`,
                downloading_package: (packages: number) => `[-] Đang tải ${packages} gói tài nguyên`,
                download_package_done: () => `[#] Đã tải toàn bộ gói tài nguyên`,
                remove_temp: () => `[#] Đã xóa các file tạm thời`,
                restart_timer: () => `[-] Tự động thoát sau 10 giây`,
                shut_down: () => `[#] Đang thoát...`
            }
        }
    }
}

export { translate as default }