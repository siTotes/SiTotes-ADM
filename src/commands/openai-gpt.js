//━━━[ untuk memanggil code yang di luar folder ini ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\
const home = (path) => __base + path
require(home('./src/options/settings'))

//━━━[ ALL MODULE ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\
const fs = require('fs')
const moment = require("moment-timezone")

//━━━[ @SITOTES LIB ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\
const svdata = () => fs.writeFileSync(home(`/src/.sitotes/data/database.json`), JSON.stringify(db, null, 2))

const lang = require(home('./src/options/lang_id'))


//━━━[ OpenAi Chat Gpt ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\
const { OpenAI } = require('openai');

const apia = JSON.parse(fs.readFileSync(home('./lib/.api/.openai-gpt.json')))
const openai = new OpenAI({
  apiKey: apia[0] + apia[1],
});

//━━━[ DATA BASE ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\

//━━━[ If user chat download-media ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\
module.exports = onic = async (onic, m, command, mek) => {
    await onic.presence(3)
    try {
        var body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') && m.message.buttonsResponseMessage.selectedButtonId ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') && m.message.listResponseMessage.singleSelectReply.selectedRowId ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') && m.message.templateButtonReplyMessage.selectedId ? m.message.templateButtonReplyMessage.selectedId : (m.mtype == 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ""
        var budy = (typeof m.text == 'string' ? m.text : '')
        const type = Object.keys(mek.message)[0];
        const isCmd = mek.key.fromMe ? /^[$]/.test(body) : /^[°•π÷×¶∆£¢€¥®™�✓_=|~!?#/$%^&.+-,\\\©^]/.test(body)
        const prefix = isCmd ? budy[0] : ''
        const salam = moment(Date.now()).tz(timezone).locale('id').format('a')
        const pushname = m.pushName || "No Name"
        const args = body.trim().split(/ +/).slice(1)
        const text = q = args.join(" ")
        const nrgs = args[0]
        
        const reply = onic.reply
        const replyEmo = onic.replyEmo
        const react = onic.react

        switch (command) {
            case 'bot':
            case 'ai':{
                await react('⏳')
                if(!text) return replyEmo(command + ' apa kak ?', '❌')
                if(text.length < 10) return replyEmo('Coba yang lebih jelas lagi contoh:\nGambarkan kuda terbang di langit', '❌')
                
                await onic.sendPresenceUpdate('composing', m.chat)
                let completion = await openai.chat.completions.create({
                    messages: [{ role: 'user', content: text }],
                    model: 'gpt-3.5-turbo',
                });
                completion = completion.choices[0].message.content
                
                
            
                await reply(completion)
                await onic.sendPresenceUpdate('available', m.chat) 
                await react('✅')
                
            }
            break
            case 'rate':{
                await react('⌛')
                // await reply(`*Rate:* ${text} (${Math.floor(Math.random() * 101)}%)`);
const dataRekayasa = [
  {
    nama1: "saiful",
    nama2: "bila",
    outPersen: 60
  },
  {
    nama1: "anam",
    nama2: "bila",
    outPersen: 60
  },
  {
    nama1: "saipul",
    nama2: "bila",
    outPersen: 60
  },
  {
    nama1: "yoga",
    nama2: "monic",
    outPersen: 60
  },
  {
    nama1: "yoga",
    nama2: "onichiwa",
    outPersen: 80
  },
  {
    nama1: "yoga",
    nama2: "oniciwa",
    outPersen: 80
  },
  {
    nama1: "yoga",
    nama2: "monika",
    outPersen: 60
  },
  {
    nama1: "yoga",
    nama2: "monik",
    outPersen: 60
  },
  {
    nama1: "akbar",
    nama2: "adist",
    outPersen: 60
  },
  {
    nama1: "akbar",
    nama2: "adis",
    outPersen: 60
  },
  {
    nama1: "maul",
    nama2: "adis",
    outPersen: 60
  }
]

for(let i = 0; i<dataRekayasa.length; i++){
    if (text.toLowerCase().includes(dataRekayasa[i].nama1) && text.toLowerCase().includes(dataRekayasa[i].nama2)) {
        let rating = Math.floor(Math.random() * 41) + dataRekayasa[i].outPersen;
        await reply(`Rate: ${text} (${rating}%)`)
        break
    } else {
        if(i === dataRekayasa.length - 1){
            let rating = Math.floor(Math.random() * 101)
            await reply(`Rate: ${text} (${rating}%)`)
            break
        }
    }
}





                await react('✅')
            }
            break
        }
        
    } catch (err) {
        /**/console.log(err)
        await m.reply('*Terjadi kesalahan, tolong bagikan ke owner:*\n\n```' + err + '```')
    } finally {
        await onic.presence(1)
        // onic.endProsMsg()
        /**/console.log(__filename.replace('/data/data/com.termux/files/home', '.'), '→ Save');
        svdata()
    }
}