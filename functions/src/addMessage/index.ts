import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

export const listener = functions.https.onRequest(async (req, res) => {
    const original = req.query.text
    const snapshot = await admin.database().ref('messages').push({ original: original })
    res.redirect(303, snapshot.ref)
})