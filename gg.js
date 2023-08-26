async function shortUrlSave(link) {
    const {
        MongoClient,
        ObjectId
    } = require('mongodb');
    
    const url = 'mongodb+srv://sitotes:sitotes01@dbwacluster.d5awtyl.mongodb.net/?retryWrites=true&w=majority'
    const client = new MongoClient(url);
    await client.connect()
    const db = client.db('RestApi')
    const shorturl = db.collection('shorturl')
    
    let vhs = await shorturl.find({ url: link }).toArray()
    if(vhs.length > 0){
        await client.close()
        return vhs[0].id
    }
    
    
    const otpot = await shorturl.insertOne({url: link})
    await shorturl.updateOne({ _id: otpot.insertedId }, { $set: { id: otpot.insertedId.toHexString() } })
    await client.close()
    return otpot.insertedId.toHexString()
}



async function shortUrlFind(obid) {
    const {
        MongoClient,
        ObjectId
    } = require('mongodb');
    
    const url = 'mongodb+srv://sitotes:sitotes01@dbwacluster.d5awtyl.mongodb.net/?retryWrites=true&w=majority'
    const client = new MongoClient(url);
    await client.connect()
    const db = client.db('RestApi')
    const shorturl = db.collection('shorturl')
    const otpot = await shorturl.find({ id: obid }).toArray()
    await client.close()
    if(!otpot[0]) return ''
    if(otpot[0]) return otpot[0].url
    return otpot
}


shortUrlSave('https://64Gugel6b7.com').then(v=> console.log(v))