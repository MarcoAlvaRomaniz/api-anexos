//como se utilizan variables de entorno
require('dotenv').config();

const server = process.env.URL_SERVER

//otro modo de usar firebase
const admin = require('firebase-admin')
const firebaseConf=require('../credenciales.json');
admin.initializeApp({
    credential: admin.credential.cert(firebaseConf),
    databaseURL: `https://${process.env.PROJECT_ID}.firebaseio.com`
});
const db = admin.firestore();
module.exports = {db, server}
