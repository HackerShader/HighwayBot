module.exports = {
    cmd: {
        welcome: () => `----- Chào mừng bạn đến với bộ điều khiển HighwayBot -----`,
        commands: () => `Nhập:\n` +
            `> 'help' để biết danh sách lệnh` +
            `> 'language <kí hiệu ngôn ngữ của bạn (như: 'en', 'vi',...)>' để đổi ngôn ngữ mặc định` +
            `> 'runbot' để chạy bot`,
        command: () => `lệnh`,
        /**
         * @param {String} name Command name
         */
        command_err: (name) => `[Lệnh | Lỗi] Không tìm thấy lệnh '${name}'`,
        first_time_msg: () => `[Thông báo] Đây là lần đầu bạn dùng HighwayBot`,
        install_wait: () => `[Thông báo] Vui lòng chờ tải các gói tài nguyên...`,
        /**
         * @param {Number} progress Download progress
         * @param {String} package Package name
         */
        install_pacakge: (progress, package) => `[Thông báo] [${progress}%] Đang tải ${package}...`,
        install_done: () => '[Thông báo] Đã tải xong các gói tài nguyên.',
        /**
         * @param {String} package Package name
         * @param {String} err Error
         */
        install_err: (package, err) => `[Thông báo] Gặp lỗi khi tải gói tài nguyên '${package}':\n${err}`,
        first_time_guide: () =>
            `Để có thể vận hành bot vui lòng chạy các lệnh sau:\n` +
            `> 'config create default' để tạo cài đặt default\n` +
            `> 'config edit default' để chỉnh sửa cài đặt default\n` +
            `> 'config load default' để tải cài đặt default\n` +
            `> 'config reload' để tải lại file 'path.json'\n` +
            this.cmd.commands()
    },
    index: {
        /**
         * @param {String} package Package name
         */
        miss_package: (package) => `[MC-Bot | Lỗi] Thiếu gói tài nguyên ${package}`,
        install: () => `[MC-Bot| Cài đặt] Bạn vui lòng nhập lệnh 'install' để tải toàn bộ bot`,
        /**
         * @param {String} file File name
         * @param {Boolean} config Is that a config file
         */
        miss_file: (file, config) => `[MC-Bot | Lỗi] Không thể tìm thấy file ${config == true ? 'cài đặt ' : ''}'${file}'`,
        /**
         * @param {String} version Minecraft version
         * @param {String} prefix Bot's prefix
         * @param {String} server Bot's server IP
         * @param {String} owner Bot's owner
         * @param {String} bot_name Bot's name
         * @param {String} inventory_link Inventory viewer link
         */
        launch: (version, prefix, server, owner, bot_name, inventory_link) =>
            `[HighwayBot] Đang khởi động bot...\n` +
            `             Version: ${version}\n` +
            `             Prefix: ${prefix}\n` +
            `             Server: ${server}\n` +
            `             Owner: ${owner}\n` +
            `             Bot's name: ${bot_name}\n` +
            `             Inventory: ${inventory_link}\n`,
        /**
         * @param {String} reason Reason bot disconnect
         */
        disconnect: (reason) => `[MC-Bot | Ngắt kết nối] Lý do: ${reason}`,
        spawn: () => `[MC-Bot | Đăng nhập] Bot đã vào server`,
        /**
         * @param {String} poisition Bot's poisition
         */
        poisition: (poisition) => `[MC-Bot | Vị trí] Vị trí của bot: ${poisition}`,
        /**
         * @param {String} message Message
         */
        chat: (message) => `[MC-Bot | Tin nhắn] ${message}`
    }
}