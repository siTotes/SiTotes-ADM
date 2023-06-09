require('./src/options/settings')
const {
    default: makeWASocket,
    BufferJSON,
    WAMessageStubType,
    WA_DEFAULT_EPHEMERAL,
    generateWAMessageFromContent,
    downloadContentFromMessage,
    downloadHistory,
    proto,
    getMessage,
    generateWAMessageContent,
    prepareWAMessageMedia,
    generateWAMessage,
    areJidsSameUser,
    makeInMemoryStore,
    delay
} = require('@adiwajshing/baileys')
const fs = require('fs')
const chalk = require('chalk')
const speed = require('performance-now')
const moment = require("moment-timezone");


//━━━[ @SITOTES LIB ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\
const svdata = () => fs.writeFileSync(`./src/.sitotes/data/database.json`, JSON.stringify(global.db, null, 2))
const {
    smsg,
    getGroupAdmins,
    formatp,
    tanggal,
    tanggal_,
    tanggal__,
    formatDate,
    getTime,
    isUrl,
    sleep,
    clockString,
    runtime,
    fetchJson,
    getBuffer,
    jsonformat,
    format,
    logic,
    generateProfilePicture,
    parseMention,
    getRandom
} = require('./lib/myfunc')
const {
    bytesToSize,
    fileIO,
    UploadFileUgu,
    telesticker,
    webp2mp4File,
    TelegraPh
} = require('./lib/uploader')
const lang = require('./src/options/lang_id')


pp_bot = fs.readFileSync(logo)
moment.tz.setDefault("Asia/Jakarta").locale("id");

module.exports = onic = async (onic, m, chatUpdate, mek, store, reSize) => {
    try {
        // console.log(JSON.stringify(chatUpdate, null, 2))
        var body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') && m.message.buttonsResponseMessage.selectedButtonId ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') && m.message.listResponseMessage.singleSelectReply.selectedRowId ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') && m.message.templateButtonReplyMessage.selectedId ? m.message.templateButtonReplyMessage.selectedId : (m.mtype == 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ""
        var budy = (typeof m.text == 'string' ? m.text : '')
        const content = JSON.stringify(mek.message)
        const type = Object.keys(mek.message)[0];
        if (m && type == "protocolMessage") onic.ev.emit("message.delete", m.message.protocolMessage.key);
        const isCmd = mek.key.fromMe ? /^[$]/.test(body) : /^[°•π÷×¶∆£¢€¥®™�✓_=|~!?#/$%^&.+-,\\\©^]/.test(body)
        const prefix = isCmd ? budy[0] : ''
        const command = isCmd ? body.slice(1).trim().split(' ').shift().toLowerCase() : ''
        const from = mek.key.remoteJid
        const time = moment(Date.now()).tz(timezone).locale('id').format('HH:mm:ss z')
        const wita = moment(Date.now()).tz('Asia/Makassar').locale('id').format('HH:mm:ss z')
        const wit = moment(Date.now()).tz('Asia/Jayapura').locale('id').format('HH:mm:ss z')
        const salam = moment(Date.now()).tz(timezone).locale('id').format('a')
        const args = body.trim().split(/ +/).slice(1)
        const pushname = m.pushName || "No Name"
        const sender = m.isGroup ? (mek.key.participant ? mek.key.participant : mek.participant) : mek.key.remoteJid
        const botNumber = onic.user.id ? onic.user.id.split(":")[0] + "@s.whatsapp.net" : onic.user.id
        const isCreator = ["62821931157232@s.whatsapp.net", "62887435047326@s.whatsapp.net", botNumber, ...global.ownno].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
        const itsMe = m.sender == onic.user.id ? true : false
        const text = q = args.join(" ")
        const c = args.join(' ')
        const quoted = m.quoted ? m.quoted : m
        const mime = (quoted.msg || quoted).mimetype || ''
        const isMedia = /image|video|sticker|audio/.test(mime)

        // Group
        const groupMetadata = m.isGroup ? await onic.groupMetadata(m.chat) : ''
        const groupId = m.isGroup ? groupMetadata.id : ''
        const groupName = m.isGroup ? groupMetadata.subject : ''
        const participants = m.isGroup ? await groupMetadata.participants : ''
        const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : ''
        const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
        const isGroupAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
        const groupOwner = m.isGroup ? groupMetadata.owner : ''
        const isGroupOwner = m.isGroup ? (groupOwner ? groupOwner : groupAdmins).includes(m.sender) : false
        const groupMembers = m.isGroup ? await groupMetadata.participants : ''
        const mentionUser = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
        const ini_mark = `0@s.whatsapp.net`
        const timestamp = m.messageTimestamp
        const timestampi = speed();
        const latensii = speed() - timestampi
        const pathbufc = `./src/session/Cache-Buffer/${m.chat}`

        if (m.isGroup && !allowGrub) return

        onic.addProses = () => {
            let pe = db.data.proses.messages? db.data.proses.messages.length:0
            if (pe > 0) {
                for (let i = 0; i < db.data.proses.messages.length; i++) {
                    if (db.data.proses.messages[i] == null) {
                        db.data.proses.messages.splice(i, 1);
                    }else if(db.data.proses.messages[i].key.id == m.id){
                    
                    }else{
                        db.data.proses.messages.push(mek)
                    }
                }
            } else {
                db.data.proses = {}
                db.data.proses.messages = []
                db.data.proses.messages.push(mek)
            }
        }
        onic.endProses = () => {
            let pe = db.data.proses.messages? db.data.proses.messages.length:0
            if (pe > 0) {
                for (let i = 0; i < db.data.proses.messages.length; i++) {
                    if (db.data.proses.messages[i] == null) {
                        db.data.proses.messages.splice(i, 1);
                    }else if(db.data.proses.messages[i].key.id == m.id){
                        db.data.proses.messages.splice(i, 1);
                    }
                }
            }
        }
        let nua = 0
        const reply = async (teks) => {
            if (nua < 4) {
                await onic.sendFakeLink(m.chat, teks, salam, pushname, ownername, logo, myweb, m)
                nua = 999
            } else {
                await onic.sendMessage(m.chat, {
                    text: teks
                }, {
                    quoted: m
                })
            }
        }
        async function getGcName(groupID) {
            try {
                let data_name = await onic.groupMetadata(groupID)
                return data_name.subject
            } catch (err) {
                return '-'
            }
        }
        const randomArr = (arr = []) => {
            return arr[Math.floor(Math.random() * arr.length)]
        }
        const isEmoji = (emo) => {
            let emoji_ranges = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
            let regexEmoji = new RegExp(emoji_ranges, 'gi');
            return emo.match(regexEmoji)
        }
        if (m.mtype == 'viewOnceMessage' && m.msg.viewOnce) {
            try {
                await onic.ev.emit("viewOnceMessage", m);
            } catch (err) {
                console.log(err)
            }
        }
        if (!onic.public) {
            if (!m.key.fromMe && !isCreator) return
        }
        
        console.log(
            chalk.black(chalk.bgWhite('\n |=| MSG |-> ')),
            chalk.black(chalk.bgYellow(` ${moment(timestamp * 1000).format(`HH:mm: s`) + ' | ' + ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jum\'at', 'Sabtu', 'Minggu'][Number(moment(timestamp * 1000).format(`E`))] + ', ' + moment(timestamp * 1000).format(`DD MMMM y`)} --> fromMe (${m.key.fromMe}) `)),
            chalk.black(chalk.bgBlue(`\n ${budy || m.mtype} `)),
            chalk.black(chalk.bgMagenta(`\n |=> ${m.sender} -> ( ${pushname} ) `)),
            chalk.greenBright(chalk.bgGray.bold(`\n |=> `,m.isGroup ? groupName : 'Private Chat', m.chat))
        )
        //console.log(chalk.black(chalk.bgWhite('[ CMD ]')), chalk.black(chalk.bgGreen(new Date)), chalk.black(chalk.bgBlue(budy || m.mtype)) + '\n' + chalk.magenta('=> From'), chalk.green(pushname), chalk.yellow(m.sender) + '\n' + chalk.blueBright('=> In'), chalk.green())

        const casee = (lib) => './src/commands/' + lib
        const chekcase = (casenya, runto) => {
            let lgbm = {}
            lgbm.casse = casenya
            for (let i = 0; i < lgbm.casse.length; i++) {
                if (isCmd && command == lgbm.casse[i]) {
                    require(casee(runto))(onic, m, command, mek)
                }
            }

        }
        console.log(mime)

        switch (command) {
            case 'smeme': {
                if (!text) return reply(lang.SmemeErr(prefix, command))
                if (/image/.test(mime) || /video/.test(mime) || /webp/.test(mime)) {
                    reply(lang.wait())
                    dadl = await onic.downloadAndSaveMediaMessage(quoted, pathbufc)
                    if (/video/.test(mime)) dadl = await onic.videoToWebp(pathbufc)

                    mem = await UploadFileUgu(dadl).catch().finally(() => {
                        fs.unlinkSync(dadl)
                        reply('Memperbarui file... 🗃️')
                    })

                    let spelit = []
                    let texme = c.split("\n>")[0] ? c.split("\n>")[0] : text
                    let memetemp = `?background=${mem.url}`

                    let textnya = `-/${await onic.smemeTools(texme)}`

                    for (let i = 1; i < 9; i++) {
                        var editsm = c.split("\n>")[i]
                        if (editsm) {
                            spelit.push(editsm)
                        }
                    }
                    for (let i = 0; i < 9; i++) {
                        var istyp = spelit[i]
                        if (istyp) {
                            if (istyp.split("gaya=")[1]) {
                                if (istyp.split("gaya=")[1] == '0') {
                                    memetemp = memetemp + '?font=titilliumweb'
                                } else if (istyp.split("gaya=")[1] == '1') {
                                    memetemp = memetemp + '?font=kalam'
                                } else if (istyp.split("gaya=")[1] == '2') {
                                    memetemp = memetemp + '?font=impact'
                                } else if (istyp.split("gaya=")[1] == '3') {
                                    memetemp = memetemp + '?font=notosans'
                                } else if (istyp.split("gaya=")[1] == '4') {
                                    memetemp = memetemp + '?layout=top'
                                } else {
                                    return reply('Hanya nomer kak, Contoh:\n>gaya=1')
                                }
                            }
                        }
                    }
                    if (!memetemp) return reply('Gagal Memperbarui file. kirim ulang / Chat owner jika perlu')

                    if (/jpeg/.test(mime)) {
                        memetemp = `https://api.memegen.link/images/custom/${textnya}1.png${memetemp}`
                        await onic.sendImageAsSticker(m.chat, memetemp, m, {
                            packname: global.packname,
                            author: global.author
                        }).catch(async _ => await onic.sendMessage(m.chat, {
                            text: 'Convert Berhasil. Tetapi bot Gagal Mengirim sticker ke anda. Coba ulang'
                        }, {
                            quoted: m
                        }))
                    } else if (/video/.test(mime) || /webp/.test(mime)) {
                        memetemp = `https://api.memegen.link/images/custom/${textnya}2.webp${memetemp}`
                        await onic.sendWebpAsSticker(m.chat, memetemp, m, {
                            packname: global.packname,
                            author: global.author
                        }).catch(async _ => await onic.sendMessage(m.chat, {
                            text: 'Convert Berhasil. Tetapi bot Gagal Mengirim sticker ke anda. Coba ulang'
                        }, {
                            quoted: m
                        }))
                    }
                    console.log(memetemp)
                } else {
                    reply(lang.SmemeErr(prefix, command))
                }
            }
            break
            case 'sgif':
            case 'stikerin':
            case 's':
            case 'sticker':
            case 'stiker': {
                if (!quoted) return reply(lang.NoToStik(prefix, command))
                if (true) { ///image/.test(mime)) {
                    let media = await quoted.download()
                    fs.writeFileSync(`./pe.png`, media)
                    let encmedia = await onic.sendImageAsSticker(m.chat, media, m, {
                        packname: global.packname,
                        author: global.author
                    })
                    await fs.unlinkSync(encmedia)
                } else if (/video/.test(mime)) {
                    if ((quoted.msg || quoted).seconds > 11) return reply(lang.NoToStik(prefix, command))
                    let media = await quoted.download()
                    let encmedia = await onic.sendVideoAsSticker(m.chat, media, m, {
                        packname: global.packname,
                        author: global.author
                    })
                    await fs.unlinkSync(encmedia)
                } else {
                    reply(lang.NoToStik(prefix, command))
                }
            }
            break
            case 'ttp':
            case 'attp':
                if (!text) return reply(lang.contoh(prefix, command, 'SLEBEWW'))
                let encmedia = await onic.sendMediaAsSticker(m.chat, `https://api-sitotes.indowarestudio.repl.co/api/${command}?text=${text}`, m, {
                        packname: global.packname,
                        author: global.author
                    })
                    .catch((err) => {
                        reply('Gagal Membuat sticker coba ulang, jika masih tidak bisa chat owner')
                    })
                await fs.unlinkSync(encmedia)
                break
            default:
        }
        let lgm


        lgm = {
            "gamelist": [
                'tebakgambar',
                'caklontong',
                'family100',
                'asahotak',
                'tebakkata',
                'tekateki',
                'tebakkimia',
                'tebakkabupaten',
                'siapakahaku',
                'susunkata',
                'tebakbendera',
                'tebaklirik',
                'tebaktebakan'
            ]
        }

        for (let i = 0; i < lgm.gamelist.length; i++) {
            var ver = db.data.game[lgm.gamelist[i]] ? db.data.game[lgm.gamelist[i]] : false
            ver = ver[m.chat] ? ver[m.chat] : 'emanf eak'
            if (m.quoted) {
                if (!isCmd) {
                    if (ver.gameid == m.quoted.id) {
                        require(casee('game-rpg'))(onic, m, command, mek)
                    }
                }
            }
        }

        chekcase([
            'bantuan',
            'hint',

            'nyerah',
            'menyerah',
            'quit',
            'metu',
            'kalah',
            'out',

            'tg',
            'tega',
            'tbkg',
            'tbkgam',
            'tebakgam',
            'tebakgambar',

            'cl',
            'ckl',
            'cakl',
            'caklon',
            'caklontong',

            'm.saiful.anam.r.creator'
        ], 'game-rpg')

        chekcase([
            'tt',
            'tiktok',
            
            'youtube',
            'youtubedownload',
            'youtubedl',
            'ytdl',
            'youtubemp4',
            'youtubemp3',
            'ytmp4',
            'ytmp3',

            'm.saiful.anam.r.creator'
        ], 'download-media')



    } catch (err) {
        console.log(onic.printErr(err))
    } finally {
        console.log('SLEBEWW → global.db ')
        svdata()
    }
}