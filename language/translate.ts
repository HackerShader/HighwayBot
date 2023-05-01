import * as tranlateAPI from '@vitalets/google-translate-api'
import fs from 'node:fs'

export default async function (path: string, ...args: any[]): Promise<string> {
    const lang: string = fs.existsSync('./setting.json') ? (await import('../setting.json')).lang : 'en'
    const module: any = lang == 'vi' ? await import('./vi') : await import('./en')
    let index: any = module;
    path.split('.').forEach((param) => {
        if (!index[param]) console.error(`invalid path: ${lang}.${path}`)
        else index = index[param]
    })
    const text: string = index(...args)
    if (lang == 'en' || lang == 'vi') return <string>text
    else return new Promise(async (res, rej) => 
        Promise.resolve(tranlateAPI.translate(text, { from: 'en', to: lang }))
            .then(callback => res(callback.text))
            .catch(rej)
    )
}