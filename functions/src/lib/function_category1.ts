import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as _cors from 'cors';

var cors = _cors({ origin: true });// set these options appropriately According to your case,
// see document: https://www.npmjs.com/package/cors#configuration-options
// true means allow everything


// http example
export const addMessage = functions.https.onRequest((req, res) => {
    const original = req.query.text;
    admin.database().ref('/messages').push({ original: original }).then(snapshot => {
        res.redirect(303, snapshot.ref);
    });
});

//databse trigger example
export const makeUppercase = functions.database.ref('/messages/{pushId}/original')
    .onWrite(event => {
        const original = event.data.val();
        console.log('Uppercasing', event.params.pushId, original);
        const uppercase = original.toUpperCase();
        return event.data.ref.parent.child('uppercase').set(uppercase);
    });

//cors example
export const function3 = functions.https.onRequest(async (req, res) => {
    cors(req, res, () => {
        res.send("this is a function");
    })
})

export const function4 = functions.https.onRequest(async (req, res) => {
    res.send("this is a function");
})