const {
    MongoClient,
    ObjectId
} = require('mongodb');

const url = 'mongodb+srv://sitotes:sitotes01@dbwacluster.d5awtyl.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(url);

async function setVersiCommited(ver) {
    await client.connect()
    const db = client.db('BD_SiTotes')
    const info = db.collection('Info')
    const checkCommit = await info.updateOne({ _id: 'versi' }, { $set: { versi: ver } })
    await client.close()
    return checkCommit
}
