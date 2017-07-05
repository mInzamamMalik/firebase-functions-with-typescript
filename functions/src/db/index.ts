import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

var defaultApp = admin.initializeApp(functions.config().firebase)

const db = admin.database();
export default db;