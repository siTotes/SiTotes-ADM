global.__base = __dirname + '/';
global.__nbl = {}
require('./src/options/settings')

const {
    Boom
} = require('@hapi/boom')

const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion,
    generateForwardMessageContent,
    prepareWAMessageMedia,
    generateWAMessageFromContent,
    generateMessageID,
    getAggregateVotesInPollMessage,
    downloadContentFromMessage,
    makeInMemoryStore,
    WAMessageContent,
    jidDecode,
    proto,
    makeCacheableSignalKeyStore,
    PHONENUMBER_MCC,
    WAMessageKey
} = require("@adiwajshing/baileys")

const pino = require('pino')
const fs = require('fs')

const NodeCache = require("node-cache")
const msgRetryCounterCache = new NodeCache()

const store = makeInMemoryStore({
    logger: pino().child({
        level: 'silent',
        stream: 'store'
    })
})

try {
    store?.readFromFile('./src/session/baileys_store_multi.json')
} catch (error) {
    fs.writeFileSync('./src/session/baileys_store_multi.json', '{"chats":[],"contacts":{},"messages":{},"labels":[],"labelAssociations":[]}')
    store?.readFromFile('./src/session/baileys_store_multi.json')
    throw new Error('Bot Crash → By sitotes anti loop')
}
setInterval(() => {
    store?.writeToFile('./src/session/baileys_store_multi.json')
}, 10000)


const {
    smsg,
    delays
} = require('./lib/simple')
const {
    client
} = require('./lib/dbmongosle')

const cron = require('node-cron')



global.db = JSON.parse(fs.readFileSync("./src/.sitotes/data/database.json"))
global.ky_ttt = []

if (global.db) global.db.data = {
    game: {},
    proses: {},
    ...(global.db.data || {})
}

__nbl.ttlerr = 0
__nbl.resetcache = 0
__nbl.chekid = {}
__nbl.lcInfo = './src/.sitotes/data/data-msg.json'

try {
    __nbl.infoMSG = JSON.parse(fs.readFileSync(__nbl.lcInfo));
} catch (error) {
    console.error("Error reading or parsing file:", error);
    __nbl.infoMSG = [];
}
console.log('SiTotes Bot Wait Running...')



async function startonic() {

    const {
        state,
        saveCreds
    } = await useMultiFileAuthState('./src/session/creds-file')
    const {
        version,
        isLatest
    } = await fetchLatestBaileysVersion()

    const onic = makeWASocket({
        version,
        logger: pino({
            level: "fatal"
        }).child({
            level: "fatal"
        }),
        printQRInTerminal: true,
        mobile: false,
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, pino({
                level: "fatal"
            }).child({
                level: "fatal"
            }))
        },
        msgRetryCounterCache,
        generateHighQualityLinkPreview: true,
        getMessage,
    })
    
    store.bind(onic.ev)
    
    onic.sendPesan = async (...args) => {
        await delays(0.5)
        return await onic.sendMessage(...args)
    }

    console.log('SiTotes Bot Menghubungkan ulang...')

    function nocache(module, cb = () => {}) {
        fs.watchFile(require.resolve(module), async () => {
            await uncache(require.resolve(module))
            cb(module)
        })
    }
    
    function uncache(module = '.') {
        return new Promise((resolve, reject) => {
            try {
                delete require.cache[require.resolve(module)]
                resolve()
            } catch (e) {
                reject(e)
            }
        })
    }
    
    require('./src/onic-func')(onic, store)
    nocache('./src/onic-func', module => {
        require(module)(onic, store)
        console.log(` "${module}" Telah diupdate!`)
    })
    
    require('./src/onic-notif')(onic, store, state, saveCreds, version, isLatest)
    nocache('./src/onic-notif', async module => {
        onic.ev.removeAllListeners('messages.upsert');
        onic.ev.removeAllListeners('messages.update');
        onic.ev.removeAllListeners('poll-recipient');
        onic.ev.removeAllListeners('schedule-trigger');
        require(module)(onic, store, state, saveCreds, version, isLatest)
        console.log(` "${module}" Telah diupdate!`)
    })
    
    onic.ev.on('connection.update', async (update) => {
        const {
            connection,
            lastDisconnect,
        } = update
        if (connection === 'close') {
            __nbl.ttlerr++
            await onic.mdbClosed()
            let reason = new Boom(lastDisconnect?.error)?.output.statusCode
            if (reason === DisconnectReason.badSession) {
                console.log(`SENDER → File Sesi Buruk, Harap Hapus Sesi dan Pindai Lagi`)
                // setTimeout(startonic, 10000)
                throw new Error('Bot Crash → By sitotes anti Stuck reload')
            } else if (reason === DisconnectReason.connectionClosed) {
                console.log("SENDER → Koneksi ditutup, menghubungkan kembali....")
                //setTimeout(startonic, 10000)
                throw new Error('Bot Crash → By sitotes anti Stuck reload')
            } else if (reason === DisconnectReason.connectionLost) {
                console.log("SENDER → Koneksi Hilang dari Server, menyambungkan kembali...")
                //setTimeout(startonic, 10000)
                throw new Error('Bot Crash → By sitotes anti Stuck reload')
            } else if (reason === DisconnectReason.connectionReplaced) {
                console.log("SENDER → Koneksi Diganti, Sesi Baru Lain Dibuka, menghubungkan kembali...")
                setTimeout(startonic, 10000)
            } else if (reason === DisconnectReason.loggedOut) {
                console.log(`SENDER → Perangkat Keluar, Harap Pindai Lagi Dan Jalankan.`)
                setTimeout(startonic, 10000)
            } else if (reason === DisconnectReason.restartRequired) {
                console.log("SENDER → Restart Diperlukan, Restart...")
                setTimeout(startonic, 10000)
            } else if (reason === DisconnectReason.timedOut) {
                console.log("SENDER → Koneksi Habis, Menghubungkan...")
                setTimeout(startonic, 10000)
            } else onic.end(`SENDER → Alasan Putus Tidak Diketahui: ${reason}|${connection}`)

            if (__nbl.ttlerr > 3) {
                console.log('Crash by → Connection Loop')
                throw new Error('Bot Crash → By sitotes anti loop')
            }
        }
        if (update.connection == "open" || update.receivedPendingNotifications == "true") {
            await store.chats.all()
            console.log(`Terhubung dengan = ` + JSON.stringify(onic.user, null, 2))
            await onic.mdbConnect();

        }
    })
    
    cron.schedule('* * * * *', async() => {
        await onic.ev.emit('schedule-trigger', new Date())
    });

    
    return onic

    async function getMessage(key) {
        if (store) {
            const msg = await store.loadMessage(key.remoteJid, key.id)
            return msg?.message || undefined
        }

        return proto.Message.fromObject({})
    }
}
startonic()




fs.watchFile(require.resolve(__filename), () => { throw new Error('Ini Memang Di buat Error Untuk menghentikan kode dan memulai ulang ')})

setInterval(() => {
    if (__nbl.ttlerr > 3) {
        console.log('Crash by → Connection Loop')
        throw new Error('Bot Crash → By sitotes anti loop')
    } else {
        __nbl.ttlerr = __nbl.ttlerr * 0
    }
}, 60000)