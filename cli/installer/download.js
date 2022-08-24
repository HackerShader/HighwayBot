const fs = require('fs');
const superagent = require('superagent');
const consolelog = require('./../util/translate')
const color = require('./../util/colorcode')

//download file from url

async function download() {
await consolelog(color.code.yellow,'[Notification] Getting info from github api...');
await superagent.get('https://api.github.com/repos/HackerShader/HighwayBot/releases/latest')
    .set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36')
    .end(async (err, res) => {
        consolelog(color.code.yellow, '[Notification] Downloading resource...');
        const json = JSON.parse(res.text);
        await superagent.get(json.zipball_url)
            .set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36')
            .end(async (err, res) => {
                if (err) return;
                await fs.writeFileSync('./HighwayBotResource.zip', res.body);
                await consolelog(color.code.green,'[Done] Downloaded resource');
                await require('./unzip');
            });
    });
}
download()







