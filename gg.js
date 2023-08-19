const {
    MongoClient,
    ObjectId
} = require('mongodb');

const url = 'mongodb+srv://sitotes:sitotes01@dbwacluster.d5awtyl.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(url);

// Database Name
const dbGame = 'DB_Game';

async function setVersiCommited(ver) {
    await client.connect()
    const db = client.db('BD_SiTotes')
    const info = db.collection('Info')
    const checkCommit = await info.updateOne({ _id: 'versi' }, { $set: { versi: ver } })
    await client.close()
    return checkCommit
}

async function checkCommitUpdate() {
    await client.connect()
    const db = client.db('BD_SiTotes')
    const info = db.collection('Info')
    const checkCommit = await info.find({ _id: 'versi' }).toArray()
    await client.close()
    return checkCommit[0]
}




async function j(){

            let bcsk = await checkCommitUpdate()
            let vcp = bcsk.commit
            bcsk.versi = bcsk.versi.split('.')
            bcsk.commit = bcsk.commit.split('.')
            bcsk.versi = (((bcsk.versi[2]) + (bcsk.versi[1])) + (bcsk.versi[0]))
            bcsk.commit = (((bcsk.commit[2]) + (bcsk.commit[1])) + (bcsk.commit[0]))
            
            if(bcsk.commit > bcsk.versi){
                console.log(vcp).then((result) => setVersiCommited(vcp))
                
            }
            
}
j()