import * as functions from 'firebase-functions'
import db from './../db'

export const function1 = functions.https.onRequest(async (req, res) => {
    res.send("this is a function");

    db.ref("/testing")
        .set({ name: 'abc' }, function (error) { //this line will write in database 
            if (error) {
                console.log("Data could not be saved." + error);
            } else {
                console.log("Data saved successfully.");
            }
        });
})
export const function2 = functions.https.onRequest(async (req, res) => {
    res.send("this is a function");
})
export const function3 = functions.https.onRequest(async (req, res) => {
    res.send("this is a function");
})
export const function4 = functions.https.onRequest(async (req, res) => {
    res.send("this is a function");
})