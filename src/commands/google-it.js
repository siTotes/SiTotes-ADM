//━━━[ untuk memanggil code yang di luar folder ini ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\
const home = (path) => __base + path
require(home('./src/options/settings'))

//━━━[ ALL MODULE ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\
const fs = require('fs')
const moment = require("moment-timezone")


//━━━[ @SITOTES LIB ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\
const svdata = () => fs.writeFileSync(home(`/src/.sitotes/data/database.json`), JSON.stringify(db, null, 2))
const {
    getBuffer,
    hitungmundur,
    bytesToSize,
    checkBandwidth,
    runtime,
    fetchJson,
    getGroupAdmins,
    msToDate,
    isUrl,
    tanggal,
    delays
} = require(home('./lib/simple'))
const google = require('google-it')
const lang = require(home('./src/options/lang_id'))

//━━━[ DATA BASE ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\
const { GoogleGenerativeAI } = require("@google/generative-ai");

const ggai = JSON.parse(fs.readFileSync(home('./lib/.api/Google-GenerativeAI.json')))
const genAI = new GoogleGenerativeAI(ggai[0] + ggai[1]);
const mdlGProVision = genAI.getGenerativeModel({ model: "gemini-pro-vision" })
const mdlGPro = genAI.getGenerativeModel({ model: "gemini-pro"});


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
        let text = q = args.join(" ")
        const quoted = m.quoted ? m.quoted : m
        const from = m.chat
        const mime = (quoted.msg || quoted).mimetype || ''
        const isMedia = /image|video|sticker|audio/.test(mime)
        const groupMetadata = m.isGroup ? await onic.groupMetadata(m.chat).catch(e => {}) : ''
        const groupName = m.isGroup ? groupMetadata.subject : ''
        const participants = m.isGroup ? await groupMetadata.participants : ''
        const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : ''
        const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
        const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
        const time = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('HH:mm:ss z')
        const timestamp = m.messageTimestamp
        const nrgs = args[0]
        const reply = onic.reply
        const replyEmo = onic.replyEmo
        const react = onic.react


        switch (command) {
            case 'gsearch':
            case 'googlesearch':
            case 'google':{
                await react('⌛')
                if (!text) {
                    await react('❓')
                    return reply(lang.contoh(prefix, command, 'wajah pocong'))
                }
                await google({
                   'query': text
                }).then(async res => {
                   let teks = `*Google Search*\n_Query : ${text}_\n\n`
                   for (let g of res) {
                      teks += `*Title* : ${g.title}\n`
                      teks += `*Description* : ${g.snippet}\n`
                      teks += `*Link* : ${g.link}\n\n----------------------------------------\n\n`
                   }
                   await react('✈️')
                   await reply(teks)
                   await react('✅')
                }).catch(async _=> {
                    await replyEmo('*Terjadi kesalahan, tolong bagikan ke owner:*\n\n```' + _.stack + '```', '❌')
                })
            }
            break
            case 'setrr':
            case 'setrmdr':
            case 'setreminder':{
                if(!m.quoted) return await reply('Balas/reply pesan yang mau di ingatkan 😄')
                const objquoted = JSON.stringify(__nbl.infoMSG.find(item => item.key.id === m.quoted.id))
                let [jam, menit, hari] = text.split(/:|\//);
                console.log(body.split(/:|\//))

                if (jam && menit && hari && (/^[0-9]{1,2}$/.test(jam) && /^[0-9]{1,2}$/.test(menit) && jam >= 0 && jam <= 23 && menit >= 0 && menit <= 59) && ['sen', 'sel', 'rab', 'kam', 'jum', 'sab', 'min', 'all'].includes(hari)) {
                    if(hari.includes('all')) hari = ''
                    
                    const rmdb = await onic.mdbConnectDb('reminder');
                    let remm = await rmdb.findOne({ jid: m.chat });
            
                    if (!remm) {
                        await rmdb.insertOne({
                            jid: m.chat,
                            listreminder: [
                                {
                                    jam: text,
                                    send: [
                                        objquoted // objquoted disini adalah bentuk value yang ingin Anda tambahkan ke dalam array
                                    ]
                                }
                            ]
                        });
                    } else {
                        let existingReminder = await remm.listreminder.find(reminder => reminder.jam === text)
                        if (existingReminder) {
                            existingReminder.send.push(objquoted); // Menambahkan data ke dalam array send yang sesuai dengan jam
                        } else {
                            remm.listreminder.push({ jam: text, send: [objquoted] }); // Menambahkan objek baru ke dalam listreminder
                        }
                        await rmdb.updateOne({ jid: m.chat }, { $set: { listreminder: remm.listreminder } })
                    }
                    await reply(`Baik saya akan mengingatkan anda ketika jam ${jam}:${menit} setiap hari ${hari}`)
                }else{
                    await reply(`format salah berikut contoh yang benar:\nReply/balas pesan setelah itu kasih balasan\n\n*${prefix}${command} jam:menit/hari*\n\ncontoh:\n*${prefix}${command} 11:30/sen*\n\nhari list: sen, sel, rab, kam, jum, sab, min, all`)
                }
            }
            break
            case 'todat':{
                if(!m.quoted) return await reply('Balas/reply pesan yang mau dijadikan data 😄')
                await console.log(await store.loadMessage(m.chat, m.quoted.id, onic))
            }
            break
            case 'dat':{
                if(!text) return await reply('Data tidak benar, data harus berupa json')
                console.log(text)
                await onic.sendMessageJson(m.chat, JSON.parse(text))
            }
            break
            case 'gemini':
            case 'geminiai':
            case 'googlegemini':
            case 'googlegeminiai':
            case 'googleai':
            case 'googlebard':
            case 'bardai':
            case 'bard':
            case 'gbard':
            case 'goai':{
                await react('⌛')
                if(!text) return await replyEmo(prefix+command+ ' *`isi pertanyaan di sini`*\n\ncontoh:\n'+prefix+command+' apakah kucing bisa salto', '😇')
                if(/image/.test(mime)){
                    let dadl = Buffer.from(await quoted.download())
                    const imageParts = [
                        fileToGenerativePart(dadl),
                    ];
                    const gpros = await mdlGProVision.generateContent([text, ...imageParts])
                    const gres = await gpros.response
                    const gtxt = await gres.text()
                    await react('🐣')
                    await reply(gtxt)
                }else{
                    const gpros = await mdlGPro.generateContent(text)
                    const gres = await gpros.response
                    const gtxt = await gres.text()
                    await react('🐣')
                    await reply(gtxt)
                }
                await react('✅')
            }
            break
        }
        
        function fileToGenerativePart(path) {
            return {
                inlineData: {
                    data: path.toString("base64"),
                    mimeType: "image/png"
                },
            };
        }

    } catch (err) {
        /**/
        await m.reply('*Terjadi kesalahan, tolong bagikan ke owner:*\n\n```' + err.stack + '```')
    } finally {
        /**/
        await onic.presence(1)
        console.log(__filename.replace('/data/data/com.termux/files/home', '.'), '→ Save');
        svdata()
    }
}