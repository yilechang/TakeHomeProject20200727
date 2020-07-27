const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://mongo1:27017/';

async function getBackUp() {
  return new Promise(async (resolve, reject) => {
    await MongoClient.connect(url, async function(err, db) {
      if (err) throw err;
      const dbo = db.db("test");
      resolve(await dbo.collection("taipeidata").find({}).toArray());
      db.close();
    });
  });
};

export default async (req, res) => {
  res.send(await getBackUp());
}
