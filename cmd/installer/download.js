const fs = require('fs');
const superagent = require('superagent');

//download file from url
superagent.get('https://api.github.com/repos/HackerShader/HighwayBot/releases/latest')
    .set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36')
    .end((err, res) => {
        const jsonres = JSON.parse(res.text);
        superagent.get(jsonres.zipball_url)
            .set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36')
            .end(async (err, res) => {
                if (err) return;
                await fs.writeFileSync('./HighwayBotResource.zip', res.body);
                require('./unzip')
            })
    });





