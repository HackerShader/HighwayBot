const fs = require('fs');
const superagent = require('superagent');

//download file from url
console.log('\n\x1b[33m[Notification] Getting info from github api...\x1b[0m');
superagent.get('https://api.github.com/repos/HackerShader/HighwayBot/releases/latest')
    .set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36')
    .end((err, res) => {
        console.log('\x1b[33m[Notification] Downloading resource...\x1b[0m');
        const json = JSON.parse(res.text);
        superagent.get(json.zipball_url)
            .set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36')
            .end(async (err, res) => {
                if (err) return;
                await fs.writeFileSync('./HighwayBotResource.zip', res.body);
                await console.log('\x1b[32m[Done] Downloaded resource\x1b[0m');
                require('./unzip');
            });
    });





