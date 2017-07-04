import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'


export const baz = functions.https.onRequest(async (req, res) => {
    res.send("this is baz");
})