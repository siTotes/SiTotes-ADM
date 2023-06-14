const {
    MongoClient
} = require('mongodb');

const url = 'mongodb+srv://sitotes:sitotes01@dbwacluster.d5awtyl.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(url);

// Database Name
const dbGame = 'DB_Game';

async function main() {
    await client.connect();
    const db = client.db(dbGame);
    const collection = db.collection('user');
    let scSiTotes = {}
    scSiTotes['_id'] = '6288989781626@s.whatsapp.net'
    const findResult = await collection.deleteOne(scSiTotes)
    console.log('Found documents =>', findResult);

}

//main().catch(console.error).finally(() => client.close());

const sitotesGameIsPlay = async (sender, gameid, type, celek) => {
    await client.connect();
    const db = client.db(dbGame);
    const user = db.collection('user');

    let scSiTotes = {}
    scSiTotes['_id'] = sender
    scSiTotes[sender] = {}
    scSiTotes[sender]['gameid'] = gameid
    scSiTotes[sender]['soaltype'] = type
    scSiTotes[sender]['jawaban'] = celek

    const insertResult = await user.insertMany([scSiTotes])
    return insertResult
}

const sitotesGameFindId = async (sender) => {
    await client.connect();
    const db = client.db(dbGame);
    const collection = db.collection('user');
    let scSiTotes = {}
    scSiTotes['_id'] = sender
    const findResult = await collection.find(scSiTotes).toArray()

    return await findResult[0]
}

const sitotesGameRemoveId = async (sender) => {
    await client.connect();
    const db = client.db(dbGame);
    const collection = db.collection('user');
    let scSiTotes = {}
    scSiTotes['_id'] = sender
    const deleteResult = await collection.deleteOne(scSiTotes)

    return await deleteResult
}

// const v = async () => console.log(await sitotesGameFindId('6288989781626@s.whatsapp.net'))
// v()
module.exports = {
    sitotesGameIsPlay,
    sitotesGameFindId,
    sitotesGameRemoveId
}