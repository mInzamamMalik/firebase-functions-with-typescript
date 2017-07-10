import * as functions from 'firebase-functions'
import db from './../db'

export const addMessage = functions.https.onRequest((req, res) => {
    const original = req.query.text;
    db.ref('/messages').push({ original: original }).then(snapshot => {
        res.redirect(303, snapshot.ref);
    });
});

export const makeUppercase = functions.database.ref('/messages/{pushId}/original')
    .onWrite(event => {
        const original = event.data.val();
        console.log('Uppercasing', event.params.pushId, original);
        const uppercase = original.toUpperCase();
        return event.data.ref.parent.child('uppercase').set(uppercase);
    });


export const function3 = functions.https.onRequest(async (req, res) => {
    res.send("this is a function");
})

export const function4 = functions.https.onRequest(async (req, res) => {
    res.send("this is a function");
})