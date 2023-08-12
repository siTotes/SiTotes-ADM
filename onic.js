require('./src/options/settings')
global.__base = __dirname + '/';

//require("http").createServer((_, res) => res.end("Uptime!")).listen(8080)

const {
    default: onicConnect,
    useMultiFileAuthState,
    DisconnectReason,
    generateForwardMessageContent,
    prepareWAMessageMedia,
    generateWAMessageFromContent,
    generateMessageID,
    downloadContentFromMessage,
    proto,
    makeInMemoryStore,
    jidDecode,
    fetchLatestBaileysVersion,
    makeCacheableSignalKeyStore,
    jidNormalizedUser,
    delay
} = require("@adiwajshing/baileys")

const pino = require('pino')
const figlet = require("figlet")
const cgl = require('gradient-string')
const {
    Boom
} = require('@hapi/boom')
const axios = require('axios')
const moment = require('moment-timezone')
const chalk = require('chalk')
const fetch = require('node-fetch')
const yargs = require('yargs/yargs')
const FileType = require('file-type')
const _ = require('lodash')
const Jimp = require('jimp')
const fs = require('fs')
const {
    toBuffer,
    toDataURL
} = require('qrcode')
const express = require('express')
const {
    smsg
} = require('./lib/myfunc')
const {
    bytesToSize,
    fileIO,
    UploadFileUgu,
    telesticker,
    webp2mp4File,
    TelegraPh
} = require('./lib/uploader')
const {
    imageToWebp,
    videoToWebp,
    writeExifImg,
    writeExifVid,
    writeExifWebp,
    writeExif,
} = require('./lib/exif')
const lang = require('./src/options/lang_id')

let app = express()
const {
    createServer
} = require('http')
let server = createServer(app)
let PORT = 3000 || 8000 || 8080
const path = require('path')
let ttlerr = 0
let resetcache = 0
let isduakali = 0
let chekid = {}

global.db = JSON.parse(fs.readFileSync("./src/.sitotes/data/database.json"))

if (global.db) global.db.data = {
    game: {},
    proses: {},
    ...(global.db.data || {})
}

console.log(chalk.hex('#FF9F84').bold('SiTotes Bot Wait Running...'))

async function startonic() {

    const store = makeInMemoryStore({
        logger: pino().child({
            level: 'silent',
            stream: 'store'
        })
    })

    store.readFromFile(`./scr/${sessionName}/sender/baileys_store.json`)
    setInterval(() => {
        store.writeToFile(`./src/${sessionName}/sender/baileys_store.json`)
    }, 10000)

    const reSize = async (buffer, ukur1, ukur2) => {
        return new Promise(async (resolve, reject) => {
            var baper = await Jimp.read(buffer);
            var ab = await baper.resize(ukur1, ukur2).getBufferAsync(Jimp.MIME_JPEG)
            resolve(ab)
        })
    }

    const {
        state,
        saveCreds
    } = await useMultiFileAuthState(`./src/${sessionName}/sender`)

    const {
        version,
        isLatest
    } = await fetchLatestBaileysVersion()

    const onic = onicConnect({
        version,
        logger: pino({
            level: 'fatal'
        }),
        printQRInTerminal: true,
        patchMessageBeforeSending: (message) => {
            const requiresPatch = !!(
                message.buttonsMessage ||
                message.templateMessage ||
                message.listMessage
            );
            if (requiresPatch) {
                message = {
                    viewOnceMessage: {
                        message: {
                            messageContextInfo: {
                                deviceListMetadataVersion: 2,
                                deviceListMetadata: {},
                            },
                            ...message,
                        },
                    },
                };
            }
            return message;
        },
        browser: ['Bot By SiTotes', 'safari', '1.0.0'],
        auth: state
    })
    if (isduakali < 1) {
        console.log(chalk.hex('#9AFF78').bold(figlet.textSync('SI-TOTES', {
            font: 'Standard',
            horizontalLayout: 'default',
            vertivalLayout: 'default',
            whitespaceBreak: false
        })))

        console.log(chalk.hex('#FFDF66')(`\nModules: WhiskeySockets/Baileys +\n\nBOT INFO:→ +\n←======================→ +\nBot By: m.saiful.anam.r +\nBot Name: SiTotes Bot +\n\nDate: 8,Januari,2023 +\nUp: Kamis, 25, Mei +\n\n\nMenunggu terhubung ke WhatsApp...\n`))
        isduakali++
    } else {
        console.log(chalk.hex('#FF9F84').bold('SiTotes Bot Menghubungkan ulang...'))
    }

    if (onic.user && onic.user.id) onic.user.jid = jidNormalizedUser(onic.user.id)

    onic.ev.on('connection.update', async (update) => {
        const {
            connection,
            lastDisconnect,
            qr
        } = update
        if (qr) {
            app.use(async (req, res) => {
                res.setHeader('content-type', 'image/png')
                res.end(await toBuffer(qr))
            })
            app.use(express.static(path.join(__dirname, 'views')))
            server.listen(PORT, () => {
                console.log('SENDER → App listened on port', PORT)
            })
        }
        if (connection === 'close') {
            ttlerr++
            let reason = new Boom(lastDisconnect?.error)?.output.statusCode
            if (reason === DisconnectReason.badSession) {
                console.log(chalk.hex('#FF6158')(`SENDER → File Sesi Buruk, Harap Hapus Sesi dan Pindai Lagi`));
                startonic();
            } else if (reason === DisconnectReason.connectionClosed) {
                console.log(chalk.hex('#FF6158')("SENDER → Koneksi ditutup, menghubungkan kembali...."));
                startonic();
            } else if (reason === DisconnectReason.connectionLost) {
                console.log(chalk.hex('#FF6158')("SENDER → Koneksi Hilang dari Server, menyambungkan kembali..."));
                startonic();
            } else if (reason === DisconnectReason.connectionReplaced) {
                console.log(chalk.hex('#FF6158')("SENDER → Koneksi Diganti, Sesi Baru Lain Dibuka, menghubungkan kembali..."));
                startonic();
            } else if (reason === DisconnectReason.loggedOut) {
                console.log(chalk.hex('#FF6158')(`SENDER → Perangkat Keluar, Harap Pindai Lagi Dan Jalankan.`));
                onic.logout();
            } else if (reason === DisconnectReason.restartRequired) {
                console.log(chalk.hex('#FF6158')("SENDER → Restart Diperlukan, Restart..."));
                startonic();
            } else if (reason === DisconnectReason.timedOut) {
                console.log(chalk.hex('#FF6158')("SENDER → Koneksi Habis, Menghubungkan..."));
                startonic();
            } else onic.end(chalk.hex('#FF6158')(`SENDER → Alasan Putus Tidak Diketahui: ${reason}|${connection}`))

            if (ttlerr > 5) {
                console.log(chalk.white.bgRed.bold('Crash by → Connection Loop'))
                throw new Error('Bot Crash → By sitotes anti loop')
            }
        }
        if (update.connection == "open" || update.receivedPendingNotifications == "true") {
            await store.chats.all()
            console.log(chalk.hex('#FFAD99').bold(`Terhubung dengan = ` + JSON.stringify(onic.user, null, 2)))

            let restorechat = db.data.proses.reaload ? (db.data.proses.reaload.messages ? db.data.proses.reaload.messages : 0) : 0
            for (let i = 0; i < restorechat.length; i++) {
                if (db.data.proses.reaload.messages[i] == null) {} else {
                    let raobj = {}
                    raobj.messages = []
                    raobj.messages.push(restorechat[i])
                    await onic.ev.emit("messages.upsert", raobj)
                }
            }
            if (0 < restorechat.length) console.log(chalk.hex('#FFDF66')(`\nMemuat ${restorechat.length} Prosess yang belum selesai...`))

            await delete pe
        }
    })

    const reply = async (pee, teks, m) => {
        await onic.sendMessage(pee, {
            text: teks
        }, {
            quoted: m
        })
    }

    onic.public = true
    store.bind(onic.ev)

    onic.ev.on('messages.upsert', async chatUpdate => {
        try {
            //let mek = chatUpdate.messages[0]
            for (let mek of chatUpdate.messages) {
                if (!mek.message) return
                mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
                if (mek.key && mek.key.remoteJid === 'status@broadcast') return
                if (!onic.public && !mek.key.fromMe && chatUpdate.type === 'notify') return
                if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return
                const m = smsg(onic, mek, store)
                if (m.id == chekid[m.chat]) return console.log('dobel detek')
                chekid[m.chat] = m.id

                console.log(chekid)
                resetcache++
                if (resetcache > 50) {
                    risetSesi()
                    resetcache = 0
                }

                let lcInfo = './src/.sitotes/data/data-msg.json'
                let infoMSG = JSON.parse(fs.readFileSync(lcInfo))
                infoMSG.push(JSON.parse(JSON.stringify(mek)))
                fs.writeFileSync(lcInfo, JSON.stringify(infoMSG, null, 2))
                if (infoMSG.length === 5000) {
                    infoMSG.splice(0, 3000)
                    fs.writeFileSync(lcInfo, JSON.stringify(infoMSG, null, 2))
                }


                require("./slebeww")(onic, m, chatUpdate, mek, store)
            }
        } catch (err) {
            console.log(onic.printErr(err))
        }
    })

    onic.serializeM = (m) => smsg(onic, m, store)
    onic.ev.process(
        async (events) => {
            if (events['presence.update']) {
                await onic.sendPresenceUpdate('available')
            }
            if (events['messages.upsert']) {
                const upsert = events['messages.upsert']
                for (let msg of upsert.messages) {
                    if (msg.key.remoteJid === 'status@broadcast') {
                        if (msg.message?.protocolMessage) return
                    }
                }
            }
            if (events['creds.update']) {
                await saveCreds()
            }
        }
    )

    onic.decodeJid = (jid) => {
        if (!jid) return jid
        if (/:\d+@/gi.test(jid)) {
            let decode = jidDecode(jid) || {}
            return decode.user && decode.server && decode.user + '@' + decode.server || jid
        } else return jid
    }

    onic.ev.on('contacts.update', update => {
        for (let contact of update) {
            let id = onic.decodeJid(contact.id)
            if (store && store.contacts) store.contacts[id] = {
                id,
                name: contact.notify
            }
        }
    })


    onic.printErr = (err) => {
        aux = err.stack
        aux = '\n|-→ ' + aux + '\n'
        aux = aux.replaceAll('\n    at Module._compile (node:internal/modules/cjs/loader:1275:14)', '')
        aux = aux.replaceAll('\n    at Module._extensions..js (node:internal/modules/cjs/loader:1329:10)', '')
        aux = aux.replaceAll('\n    at Module.load (node:internal/modules/cjs/loader:1133:32)', '')
        aux = aux.replaceAll('\n    at Module._load (node:internal/modules/cjs/loader:972:12)', '')
        aux = aux.replaceAll('\n    at Module.require (node:internal/modules/cjs/loader:1157:19)', '')
        aux = aux.replaceAll('\n    at require (node:internal/modules/helpers:119:18)', '')
        aux = aux.replaceAll('\n    at StatWatcher.emit (node:events:512:28)', '')
        aux = aux.replaceAll('\n    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:83:12)', '')
        aux = aux.replaceAll('\n    at node:internal/main/run_main_module:23:47', '')
        aux = aux.replaceAll('\n', '\n|=================================================√\n')
        aux = aux.replaceAll('    at', '|-→')
        aux = aux.replaceAll(' (', ' |-↓\n|------------------------------------|||||\n| •••• (')
        aux = aux.replaceAll(__dirname, '.')

        return chalk.yellow.bold.visible(aux)
    }

    onic.getUrlTotalSize = async (url) => {
        let vv
        await fetch(url, {
            method: 'HEAD'
        }).then((result) => {
            let v = result.headers.get("content-length")

            vv = onic.caculedSize(v)
        })
        return await vv
    }

    onic.caculedSize = (bytes) => {
        if (!+bytes) return '0 Bytes'

        const k = 1024
        const dm = 2 < 0 ? 0 : 2
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))

        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
    }

    onic.fetchUrlToBuffer = async (path) => {
        const buff = await onic.axiosUrlToBuffer(path)
        return buff
    }

    onic.axiosUrlToBuffer = (url) => {
        let retryCount = 0;
        const maxRetries = 3;
        const retryDelay = 3000; // dalam milidetik

        function fetch() {
            return axios.get(url, {
                    responseType: 'arraybuffer'
                })
                .then(function(response) {
                    const buffer = Buffer.from(response.data, 'binary');
                    return buffer;
                })
                .catch(function(error) {
                    console.error(error);
                    if (retryCount < maxRetries) {
                        retryCount++;
                        console.log(`Retrying (${retryCount}/${maxRetries}) after ${retryDelay}ms...`);
                        return new Promise(resolve => setTimeout(resolve, retryDelay)).then(fetch);
                    } else {
                        throw error;
                    }
                });
        }

        return fetch();
    }

    onic.axiosUrlToBuffer = (url) => {
        return axios.get(url, {
                responseType: 'arraybuffer'
            })
            .then(function(response) {
                const buffer = Buffer.from(response.data, 'binary');
                return buffer;
            })
            .catch(function(error) {
                console.error(error);
                throw error;
            });
    }

    onic.videoToWebp = async (path) => {
        const vv = await videoToWebp(path)
        return vv
    }

    onic.smemeTools = async (format) => {
        if (!format) return
        let outpot
        outpot = await format.replaceAll('_', '__');
        outpot = await outpot.replaceAll('-', '--');
        outpot = await outpot.replaceAll('\n', '~n');
        outpot = await outpot.replaceAll('?', '~q');
        outpot = await outpot.replaceAll('&', '~a');
        outpot = await outpot.replaceAll('%', '~p');
        outpot = await outpot.replaceAll('#', '~h');
        outpot = await outpot.replaceAll('/', '~s');
        outpot = await outpot.replaceAll(String.fromCharCode(92), '~b');
        outpot = await outpot.replaceAll('<', '~l');
        outpot = await outpot.replaceAll('>', '~g');
        outpot = await outpot.replaceAll('"', "''");
        outpot = await outpot.replaceAll(' ', '_');

        return outpot
    }

    /**
     * getBuffer hehe
     * @param {fs.PathLike} path
     * @param {Boolean} returnFilename
     */
    onic.getFile = async (PATH, returnAsFilename) => {
        let res, filename
        const data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,` [1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await fetch(PATH)).buffer() : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)
        if (!Buffer.isBuffer(data)) throw new TypeError('Result is not a buffer')
        const type = await FileType.fromBuffer(data) || {
            mime: 'application/octet-stream',
            ext: '.bin'
        }
        if (data && returnAsFilename && !filename)(filename = path.join(__dirname, './media/' + new Date * 1 + '.' + type.ext), await fs.promises.writeFile(filename, data))
        return {
            res,
            filename,
            ...type,
            data,
            deleteFile() {
                return filename && fs.promises.unlink(filename)
            }
        }
    }

    onic.sendReaction = async (jid, key, text) => {
        return await onic.sendMessage(jid, {
            react: {
                text: text,
                key: key
            }
        })
    }

    /**
     * Send Media/File with Automatic Type Specifier
     * @param {String} jid
     * @param {String|Buffer} path
     * @param {String} filename
     * @param {String} caption
     * @param {proto.WebMessageInfo} quoted
     * @param {Boolean} ptt
     * @param {Object} options
     */
    onic.sendFile = async (jid, path, filename = '', caption = '', quoted, ptt = false, options = {}) => {
        let type = await onic.getFile(path, true)
        let {
            res,
            data: file,
            filename: pathFile
        } = type
        if (res && res.status !== 200 || file.length <= 65536) {
            try {
                throw {
                    json: JSON.parse(file.toString())
                }
            } catch (e) {
                if (e.json) throw e.json
            }
        }
        let opt = {
            filename
        }
        if (quoted) opt.quoted = quoted
        if (!type) options.asDocument = true
        let mtype = '',
            mimetype = type.mime,
            convert
        if (/webp/.test(type.mime) || (/image/.test(type.mime) && options.asSticker)) mtype = 'sticker'
        else if (/image/.test(type.mime) || (/webp/.test(type.mime) && options.asImage)) mtype = 'image'
        else if (/video/.test(type.mime)) mtype = 'video'
        else if (/audio/.test(type.mime))(
            convert = await (ptt ? toPTT : toAudio)(file, type.ext),
            file = convert.data,
            pathFile = convert.filename,
            mtype = 'audio',
            mimetype = 'audio/ogg; codecs=opus'
        )
        else mtype = 'document'
        if (options.asDocument) mtype = 'document'

        delete options.asSticker
        delete options.asLocation
        delete options.asVideo
        delete options.asDocument
        delete options.asImage

        let message = {
            ...options,
            caption,
            ptt,
            [mtype]: {
                url: pathFile
            },
            mimetype
        }
        let m
        try {
            m = await onic.sendMessage(jid, message, {
                ...opt,
                ...options
            })
        } catch (e) {
            //console.error(e)
            m = null
        } finally {
            if (!m) m = await onic.sendMessage(jid, {
                ...message,
                [mtype]: file
            }, {
                ...opt,
                ...options
            })
            file = null
            return m
        }
    }

    // Add Other
    /**
     * 
     * @param {*} jid 
     * @param {*} buttons 
     * @param {*} caption 
     * @param {*} footer 
     * @param {*} quoted 
     * @param {*} options 
     */
    onic.sendButtonText = (jid, buttons = [], text, footer, quoted = '', options = {}) => {
        let buttonMessage = {
            text,
            footer,
            buttons,
            headerType: 2,
            ...options
        }
        onic.sendMessage(jid, buttonMessage, {
            quoted,
            ...options
        })
        /*
                onic.sendMessage(jid, {
                    text: text
                }, {
                    quoted,
                    ...options
                })*/
    }
    /**
     * 
     * @param {*} jid 
     * @param {*} text 
     * @param {*} quoted 
     * @param {*} options 
     * @returns 
     */
    onic.sendText = (jid, text, quoted = '', options) => onic.sendMessage(jid, {
        text: text,
        ...options
    }, {
        quoted
    })
    /**
     * 
     * @param {*} jid 
     * @param {*} text 
     * @param {*} salam 
     * @param {*} pushname 
     * @param {*} ownername
     * @param {*} thumbnail 
     * @param {*} myweb 
     * @param {*} quoted 
     * @returns 
     */
    onic.sendFakeLink = (jid, text, salam, pushname, ownername, thumbnail, myweb, quoted) => onic.sendMessage(jid, {
        text: text,
        contextInfo: {
            "externalAdReply": {
                "title": `Selamat ${salam} ${pushname}`,
                "body": `© ${ownername}`,
                "previewType": "PHOTO",
                "thumbnailUrl": ``,
                "thumbnail": fs.readFileSync(thumbnail),
                "sourceUrl": `${myweb}`
            }
        }
    }, {
        quoted
    })
    /**
     * 
     * @param {*} jid 
     * @param {*} desc 
     * @param {*} footer 
     * @param {*} gam 
     * @param {*} but
     * @param {*} options 
     * @returns 
     */

    onic.setStatus = (status) => {
        onic.query({
            tag: 'iq',
            attrs: {
                to: '@s.whatsapp.net',
                type: 'set',
                xmlns: 'status',
            },
            content: [{
                tag: 'status',
                attrs: {},
                content: Buffer.from(status, 'utf-8')
            }]
        })
        return status
    }
    onic.getBio = async (member) => {
        let about = (await onic.fetchStatus(member).catch(console.error) || {}).status || '-'
        return about
    }

    onic.sendButMessage = async (jid, desc = '', footer = '', but = [], options = {}) => {
        buttonMessage = {
            text: desc,
            footer: footer,
            buttons: but,
            headerType: 1
        }

        onic.sendMessage(jid, buttonMessage, options)
    }

    onic.send1ButMes = (jid, text = '', footer = '', butId = '', dispText = '', quoted, ments) => {
        let but = [{
            buttonId: butId,
            buttonText: {
                displayText: dispText
            },
            type: 1
        }]
        let butMes = {
            text: text,
            buttons: but,
            footer: footer,
            mentions: ments ? ments : []
        }
        onic.sendMessage(jid, butMes, {
            quoted: quoted
        })
    }


    /** Send 2 Button Message
     *
     * @param {*} jid
     * @param {*} text
     * @param {*} footer
     * @param {*} buttonId
     * @param {*} displayText
     * @param {*} buttonId2
     * @param {*} displayText2
     * @param {*} quoted
     * @param {*} mentions
     */


    onic.send2ButMes = (jid, text = '', footer = '', butId = '', dispText = '', butId2 = '', dispText2 = '', quoted, ments) => {
        let but2 = [{
                buttonId: butId,
                buttonText: {
                    displayText: dispText
                },
                type: 1
            },
            {
                buttonId: butId2,
                buttonText: {
                    displayText: dispText2
                },
                type: 1
            }
        ]
        let butMes2 = {
            text: text,
            buttons: but2,
            footer: footer,
            mentions: ments ? ments : []
        }
        onic.sendMessage(jid, butMes2, {
            quoted: quoted
        })
    }


    /** Send 3 Button Message
     *
     * @param {*} jid
     * @param {*} text
     * @param {*} footer
     * @param {*} buttonId
     * @param {*} displayText
     * @param {*} buttonId2
     * @param {*} displayText2
     * @param {*} buttonId3
     * @param {*} displayText3
     * @param {*} quoted
     * @param {*} mentions

     */

    onic.send3ButMes = (jid, text = '', footer = '', butId = '', dispText = '', butId2 = '', dispText2 = '', butId3 = '', dispText3 = '', quoted, ments) => {
        let but3 = [{
                buttonId: butId,
                buttonText: {
                    displayText: dispText
                },
                type: 1
            },
            {
                buttonId: butId2,
                buttonText: {
                    displayText: dispText2
                },
                type: 1
            },
            {
                buttonId: butId3,
                buttonText: {
                    displayText: dispText3
                },
                type: 1
            }
        ]
        let butMes3 = {
            text: text,
            buttons: but3,
            footer: footer,
            mentions: ments ? ments : []
        }
        onic.sendMessage(jid, butMes3, {
            quoted: quoted
        })
    }

    /**
     * 
     * @param {*} jid 
     * @param {*} path 
     * @param {*} caption 
     * @param {*} quoted 
     * @param {*} options 
     * @returns 
     */
    onic.sendImage = async (jid, path, caption = '', quoted = '', options) => {
        let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await onic.axiosUrlToBuffer(path) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        return await onic.sendMessage(jid, {
            image: buffer,
            caption: caption,
            ...options
        }, {
            quoted
        })
    }
    /**
     * 
     * @param {*} jid 
     * @param {*} path 
     * @param {*} caption 
     * @param {*} quoted 
     * @param {*} options 
     * @returns 
     */
    onic.sendVideoUrl = async (jid, path, gif = false, caption = '', quoted = '', options) => {
        return await onic.sendMessage(jid, {
            video: {
                url: path
            },
            caption: caption,
            gifPlayback: gif,
            ...options
        }, {
            quoted
        })
    }

    onic.sendVideo = async (jid, path, gif = false, caption = '', quoted = '', options) => {
        let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await onic.axiosUrlToBuffer(path) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        return await onic.sendMessage(jid, {
            video: buffer,
            caption: caption,
            gifPlayback: gif,
            ...options
        }, {
            quoted
        })
    }

    /**
     * 
     * @param {*} jid 
     * @param {*} path 
     * @param {*} quoted 
     * @param {*} mime 
     * @param {*} options 
     * @returns 
     */
    onic.sendAudio = async (jid, path, quoted = '', ptt = false, options) => {
        let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await onic.axiosUrlToBuffer(path) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        return await onic.sendMessage(jid, {
            audio: buffer,
            ptt: ptt,
            ...options
        }, {
            quoted
        })
    }

    /**
     * 
     * @param {*} jid 
     * @param {*} text 
     * @param {*} quoted 
     * @param {*} options 
     * @returns 
     */
    onic.sendTextWithMentions = async (jid, text, quoted, options = {}) => onic.sendMessage(jid, {
        text: text,
        mentions: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net'),
        ...options
    }, {
        quoted
    })
    /**
     * 
     * @param {*} jid 
     * @param {*} path 
     * @param {*} quoted 
     * @param {*} options 
     * @returns 
     */
    onic.sendMedia = async (jid, path, filename, quoted = '', options = {}) => {
        let {
            ext,
            mime,
            data
        } = await onic.getFile(path)
        messageType = mime.split("/")[0]
        pase = messageType.replace('application', 'document') || messageType
        return await onic.sendMessage(jid, {
            [`${pase}`]: data,
            mimetype: mime,
            fileName: filename + ext ? filename + ext : getRandom(ext),
            ...options
        }, {
            quoted
        })
    }

    onic.sendMediaAsSticker = async (jid, path, quoted, options = {}) => {
        let {
            ext,
            mime,
            data
        } = await onic.getFile(path)
        let media = {}
        let buffer
        media.data = data
        media.mimetype = mime
        if (options && (options.packname || options.author)) {
            buffer = await writeExif(media, options)
        } else {
            buffer = /image/.test(mime) ? await imageToWebp(data) : /video/.test(mime) ? await videoToWebp(data) : ""
        }
        await onic.sendMessage(jid, {
            sticker: {
                url: buffer
            },
            ...options
        }, {
            quoted
        })
        return buffer
    }

    onic.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await onic.axiosUrlToBuffer(path) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
            buffer = await writeExifImg(buff, options)
        } else {
            buffer = await imageToWebp(buff)
        }
        await onic.sendReaction(quoted.chat, quoted.key, '✈️')

        await onic.sendMessage(jid, {
            sticker: {
                url: buffer
            },
            ...options
        }, {
            quoted
        })
        await onic.sendReaction(quoted.chat, quoted.key, '✅')
        return buffer
    }

    onic.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await onic.axiosUrlToBuffer(path) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
            buffer = await writeExifVid(buff, options)
        } else {
            buffer = await videoToWebp(buff)
        }
        await onic.sendReaction(quoted.chat, quoted.key, '✈️')

        await onic.sendMessage(jid, {
            sticker: {
                url: buffer
            },
            ...options
        }, {
            quoted
        })
        await onic.sendReaction(quoted.chat, quoted.key, '✅')
        return buffer
    }

    onic.sendWebpAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await onic.axiosUrlToBuffer(path) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)

        let buffer
        if (options && (options.packname || options.author)) {
            buffer = await writeExifWebp(buff, options)

            await onic.sendReaction(quoted.chat, quoted.key, '✈️')
            await onic.sendMessage(jid, {
                sticker: {
                    url: buffer
                },
                ...options
            }, {
                quoted
            })
            await onic.sendReaction(quoted.chat, quoted.key, '✅')
            return buffer
        } else {
            await onic.sendReaction(quoted.chat, quoted.key, '✈️')
            await onic.sendMessage(jid, {
                sticker: buff,
                ...options
            }, {
                quoted
            })
            await onic.sendReaction(quoted.chat, quoted.key, '✅')
            return buff
        }
    }

    /**
     * 
     * @param {*} jid 
     * @param {*} path 
     * @param {*} quoted 
     * @param {*} options 
     * @returns 
     */
    onic.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
        let quoted = message.msg ? message.msg : message
        let mime = (message.msg || message).mimetype || ''
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
        const stream = await downloadContentFromMessage(quoted, messageType)
        let buffer = Buffer.from([])
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }
        let type = await FileType.fromBuffer(buffer)
        trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
        // save to file
        await fs.writeFileSync(trueFileName, buffer)
        return trueFileName
    }
    onic.downloadMediaMessage = async (message) => {
        let mime = (message.msg || message).mimetype || ''
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
        const stream = await downloadContentFromMessage(message, messageType)
        let buffer = Buffer.from([])
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }

        return buffer
    }
    onic.cMod = (jid, copy, text = '', sender = onic.user.id, options = {}) => {
        //let copy = message.toJSON()
        let mtype = Object.keys(copy.message)[0]
        let isEphemeral = mtype === 'ephemeralMessage'
        if (isEphemeral) {
            mtype = Object.keys(copy.message.ephemeralMessage.message)[0]
        }
        let msg = isEphemeral ? copy.message.ephemeralMessage.message : copy.message
        let content = msg[mtype]
        if (typeof content === 'string') msg[mtype] = text || content
        else if (content.caption) content.caption = text || content.caption
        else if (content.text) content.text = text || content.text
        if (typeof content !== 'string') msg[mtype] = {
            ...content,
            ...options
        }
        if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
        else if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
        if (copy.key.remoteJid.includes('@s.whatsapp.net')) sender = sender || copy.key.remoteJid
        else if (copy.key.remoteJid.includes('@broadcast')) sender = sender || copy.key.remoteJid
        copy.key.remoteJid = jid
        copy.key.fromMe = sender === onic.user.id

        return proto.WebMessageInfo.fromObject(copy)
    }

    onic.sendMessageFromContent = async (jid, message, options = {}) => {
        var option = {
            contextInfo: {},
            ...options
        }
        var prepare = await generateWAMessageFromContent(jid, message, option)
        await onic.relayMessage(jid, prepare.message, {
            messageId: prepare.key.id
        })
        return prepare
    }

    /**
     * 
     * @param {*} jid 
     * @param {*} message 
     * @param {*} forceForward 
     * @param {*} options 
     * @returns 
     */
    onic.copyNForward = async (jid, message, forceForward = false, options = {}) => {
        let vtype
        if (options.readViewOnce) {
            message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
            vtype = Object.keys(message.message.viewOnceMessage.message)[0]
            delete(message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
            delete message.message.viewOnceMessage.message[vtype].viewOnce
            message.message = {
                ...message.message.viewOnceMessage.message
            }
        }

        let mtype = Object.keys(message.message)[0]
        let content = await generateForwardMessageContent(message, forceForward)
        let ctype = Object.keys(content)[0]
        let context = {}
        if (mtype != "conversation") context = message.message[mtype].contextInfo
        content[ctype].contextInfo = {
            ...context,
            ...content[ctype].contextInfo
        }
        const waMessage = await generateWAMessageFromContent(jid, content, options ? {
            ...content[ctype],
            ...options,
            ...(options.contextInfo ? {
                contextInfo: {
                    ...content[ctype].contextInfo,
                    ...options.contextInfo
                }
            } : {})
        } : {})
        await onic.relayMessage(jid, waMessage.message, {
            messageId: waMessage.key.id
        })
        return waMessage
    }

    /**
     * 
     * @param {*} path 
     * @returns 
     */
    onic.getFile = async (path) => {
        let res
        let data = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (res = await fetch(path)).buffer() : fs.existsSync(path) ? fs.readFileSync(path) : typeof path === 'string' ? path : Buffer.alloc(0)
        if (!Buffer.isBuffer(data)) throw new TypeError('Result is not a buffer')
        let type = await FileType.fromBuffer(data) || {
            mime: 'application/octet-stream',
            ext: '.bin'
        }

        return {
            res,
            ...type,
            data
        }
    }

    return onic
}
startonic()


function risetSesi() {
    const dirpath = "./src/session/sender/";
    const fileread = fs.readdirSync(dirpath);

    let fileoutput = []
    for (let file of fileread) {
        fileoutput.push(file)
    }

    for (let i = 0; i < fileoutput.length; i++) {
        if (fileoutput[i] == 'baileys_store.json') {
            fs.writeFileSync(dirpath + fileoutput[i], '{"chats":[],"contacts":{},"messages":{}}')
            fileoutput.splice(i, 1)
        }
        if (fileoutput[i] == 'creds.json') {
            fileoutput.splice(i, 1)
        }
    }

    for (let i = 0; i < fileoutput.length; i++) {
        fs.unlinkSync(dirpath + fileoutput[i])
    }
}


setInterval(() => {
    if (ttlerr > 5) {
        console.log(chalk.white.bgRed.bold('Crash by → Connection Loop'))
        throw new Error('Bot Crash → By sitotes anti loop')
    } else {
        ttlerr = ttlerr * 0
    }
}, 20000)

let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright(`→ MODIFED '${__filename}'`))
    delete require.cache[file]
    require(file)
    throw new Error('Ini Memang Di buat Error Untuk menghentikan kode dan memulai ulang ');
})

function logModifed(module, cb = () => {}) {
    fs.watchFile(require.resolve(module), async () => {
        require(module)
        await logOpened(require.resolve(module))
        cb(module)
        d = new Date();
        console.log((chalk.greenBright('(' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + ' → Opened)==> ') + chalk.cyanBright(module)).replaceAll(__dirname, '.'))
        console.log()
    })
}

function logCrash(module, cb = () => {}) {
    fs.watchFile(require.resolve(module), async () => {
        throw new Error('Ini Memang Di buat Error Untuk menghentikan kode dan memulai ulang ');
    })
}


function logOpened(module = '.') {
    return new Promise((resolve, reject) => {
        require(module)
        try {
            delete require.cache[require.resolve(module)]
            resolve()
        } catch (e) {
            reject(e)
        }
        d = new Date();
        console.log((chalk.greenBright('(' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + ' → Modifed)==> ') + chalk.cyanBright(module)).replaceAll(__dirname, '.'))
    })
}

logModifed('./src/options/settings')

logModifed('./src/commands/game-rpg')
logModifed('./src/commands/download-media')


logModifed('./slebeww')

logModifed('./lib/dbmongosle')

logCrash('./lib/exif')
logCrash('./lib/gdriveapis')
logCrash('./lib/con2vert')