var functions = require('firebase-functions');

// // Start writing Firebase Functions
// // https://firebase.google.com/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send(
        "Hey its me M.Inzamam Malik, Hello from Firebase Functions! :-)",
        "request:", request,
        "response:", response);
})
