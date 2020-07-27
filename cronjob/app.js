const express = require('express');
const cron = require("node-cron");
const https = require('https');
const MongoClient = require('mongodb').MongoClient;

const app = express();

const url = 'mongodb://mongo1:27017/';

const getData = () => {
  https.get('https://data.taipei/api/v1/dataset/1f1aaba5-616a-4a33-867d-878142cac5c4?scope=resourceAquire', (res) => {
    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
      const result = JSON.parse(rawData).result.results;
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        const dbo = db.db("test");
        for (let prop in result) {
          const { dataTime, measures, lon, value, locationName, geocode, lat } = result[prop]
          dbo.collection("taipeidata").update(
            { dataTime, measures, lon, locationName, geocode, lat },
            { dataTime, measures, lon, locationName, geocode, lat, value },
            { upsert: true })
        }
        console.log("update sucess");
        db.close();
      });
    });
    res.resume();
  }).on('error', (e) => {
    console.log(`Got error: ${e.message}`);
  });
}

cron.schedule("0 * * * *", function() {
  getData()
});

// init
getData()

