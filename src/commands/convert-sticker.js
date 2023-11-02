//━━━[ untuk memanggil code yang di luar folder ini ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\
const home = (path) => __base + path
require(home('./src/options/settings'))

//━━━[ ALL MODULE ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\
const fs = require('fs')
const moment = require("moment-timezone")
const chalk = require('chalk')
const path = require('path')


//━━━[ @SITOTES LIB ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\
// const svdata = () => fs.writeFileSync(home(`/src/.sitotes/data/database.json`), JSON.stringify(db, null, 2))
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
} = require(home('./lib/myfunc'))
const lang = require(home('./src/options/lang_id'))
const gdapis = require(home('./lib/gdriveapis'))
const cv = require(home('./lib/con2vert'))

//━━━[ DATA BASE ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\


//━━━[ If user chat download-media ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\
module.exports = onic = async (onic, m, command, mek) => {
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
        const c = args.join(' ')
        const quoted = m.quoted ? m.quoted : m
        const mime = (quoted.msg || quoted).mimetype || ''
        const pathbufc = home(`./src/session/Cache-Buffer/${m.chat}`)
        

        let nua = 0
        const reply = async (teks) => {
            if (nua < 4) {
                nua = 999
                return await onic.sendFakeLink(m.chat, teks, salam, pushname, ownername, logo, myweb, m)
            } else {
                return await onic.sendMessage(m.chat, {
                    text: teks
                }, {
                    quoted: m
                })
            }
        }

        switch (command) {
            case 'smeme':
            case 'smemegen':
            case 'stickermeme':
            case 'smeme2': {
                if (!text) {
                    await onic.sendReaction(m.chat, m.key, '❓')
                    await reply(lang.SmemeErr(prefix, command))
                    return;
                }
                if (/image/.test(mime) || /video/.test(mime) || /webp/.test(mime)) {
                    await onic.sendReaction(m.chat, m.key, '⬇️')
                    let dadl = await onic.downloadAndSaveMediaMessage(quoted, pathbufc)

                    if (/video/.test(mime)) {
                        await fs.writeFileSync(pathbufc + '.webp', await onic.videoToWebp(await cv.pathToBuffer(dadl)))
                        dadl = pathbufc + '.webp'
                    }
                    await onic.sendReaction(m.chat, m.key, '⏳')
                    let urlout = await gdapis.gdriveUpload(await cv.pathToBuffer(dadl), path.extname(dadl), '1jQk7lovSaz64K-W2mnCgzT0AXdDB5X-z').catch().finally(async () => {
                        fs.unlinkSync(dadl)
                        await onic.sendReaction(m.chat, m.key, '🗃️')
                    })
                    let spelit = []
                    let texme = c.split("\n>")[0] ? c.split("\n>")[0] : text
                    if (urlout.pref ? false : true) {
                        await onic.sendReaction(m.chat, m.key, '❌')
                        reply('Gagal membuat memegen, coba ulang')
                        return;
                    }
                    let memetemp = `?background=${await urlout.pref}`

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

                    if (/video/.test(mime)) {
                        memetemp = `https://api.memegen.link/images/custom/${textnya}.webp${memetemp}`
                        memetemp = await onic.fetchUrlToBuffer(memetemp)
                        await onic.sendWebpAsSticker(m.chat, memetemp, m)
                        .catch(async _ => await onic.sendMessage(m.chat, {
                            text: lang.doneErr('Sticker('+_+')')
                        }, {
                            quoted: m
                        }))
                    } else if (/image/.test(mime)) {
                        memetemp = `https://api.memegen.link/images/custom/${textnya}.png${memetemp}`
                        await onic.sendImageAsSticker(m.chat, memetemp, m, {
                            packname: global.packname,
                            author: global.author
                        }).catch(async _ => await onic.sendMessage(m.chat, {
                            text: lang.doneErr('Sticker('+_+')')
                        }, {
                            quoted: m
                        }))
                    }
                } else {
                    await onic.sendReaction(m.chat, m.key, '❓')
                    await reply(lang.SmemeErr(prefix, command))
                }
            }
            break
            case 's':
            case 'sticker':
            case 'stiker': {
                if (!quoted) {
                    await onic.sendReaction(m.chat, m.key, '❓')
                    return reply(lang.NoToStik(prefix, command))
                }

                if (/image/.test(mime)) {
                    await onic.sendReaction(m.chat, m.key, '⬇️')
                    let media = await quoted.download()
                    await onic.sendReaction(m.chat, m.key, '⏳')
                    let encmedia

                    if (/webp/.test(mime)) {
                        encmedia = await onic.sendWebpAsSticker(m.chat, media, m)
                        /*.catch(async _ => await onic.sendMessage(m.chat, {
                            text: lang.doneErr('Sticker')
                        }, {
                            quoted: m
                        }))*/

                    } else {
                        encmedia = await onic.sendImageAsSticker(m.chat, media, m, {
                            packname: global.packname,
                            author: global.author
                        }).catch(async _ => await onic.sendMessage(m.chat, {
                            text: lang.doneErr('Sticker('+_+')')
                        }, {
                            quoted: m
                        }))
                    }

                } else if (/video/.test(mime)) {
                    if ((quoted.msg || quoted).seconds > 11) {
                        await onic.sendReaction(m.chat, m.key, '📽️')
                        return reply('Video terlalu panjang minimal kurang dari 11 detik')
                    }

                    await onic.sendReaction(m.chat, m.key, '⬇️')
                    let media = await quoted.download()
                    await onic.sendReaction(m.chat, m.key, '⏳')
                    let encmedia = await onic.sendVideoAsSticker(m.chat, media, m, {
                        packname: global.packname,
                        author: global.author
                    }).catch(async _ => await onic.sendMessage(m.chat, {
                        text: lang.doneErr('Sticker('+_+')')
                    }, {
                        quoted: m
                    }))

                } else {
                    await onic.sendReaction(m.chat, m.key, '❓')
                    reply(lang.NoToStik(prefix, command))
                }
            }
            break
            case 'ttp':
            case 'attp':
                if (!text){
                    await onic.sendReaction(m.chat, m.key, '❓')
                    return reply(lang.contoh(prefix, command, 'SLEBEWW'))
                }
                await onic.sendReaction(m.chat, m.key, '⏳')
                let encmedia = await onic.sendImageAsSticker(m.chat, `https://api-sitotes.indowarestudio.repl.co/api/${command}?text=${text}`, m, {
                        packname: global.packname,
                        author: global.author
                    })
                    .catch(async _ => {
                        await onic.sendReaction(m.chat, m.key, '❌')
                        reply('Gagal Membuat sticker('+_+') coba ulang, jika masih tidak bisa chat owner')
                    })
                await fs.unlinkSync(encmedia)
            break
        }

    } catch (err) {
        /**/console.log(onic.printErr(err))
        await m.reply('*Terjadi kesalahan, tolong bagikan ke owner:*\n\n```' + err + '```')
    } finally {
        /**/console.log(__filename.replace('/data/data/com.termux/files/home', '.'), '→ Save');
        // svdata()
    }
}