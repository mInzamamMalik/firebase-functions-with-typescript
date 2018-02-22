"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const _cors = require("cors");
const cors = _cors({ origin: true }); // set these options appropriately According to your case,
// see document: https://www.npmjs.com/package/cors#configuration-options
// true means allow everything
// http example
exports.addMessage = functions.https.onRequest((req, res) => {
    const original = req.query.text;
    admin.database().ref('/messages').push({ original: original }).then(snapshot => {
        res.redirect(303, snapshot.ref);
    });
});
//databse trigger example
exports.makeUppercase = functions.database.ref('/messages/{pushId}/original')
    .onWrite(event => {
    const original = event.data.val();
    console.log('Uppercasing', event.params.pushId, original);
    const uppercase = original.toUpperCase();
    return event.data.ref.parent.child('uppercase').set(uppercase);
});
//cors example
exports.function3 = functions.https.onRequest((req, res) => __awaiter(this, void 0, void 0, function* () {
    cors(req, res, () => {
        res.send("this is a function");
    });
}));
exports.function4 = functions.https.onRequest((req, res) => __awaiter(this, void 0, void 0, function* () {
    res.send("this is a function");
}));
//# sourceMappingURL=function_category1.js.map