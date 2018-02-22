"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const defaultApp = admin.initializeApp(functions.config().firebase);
const firestore = admin.firestore();
exports.default = firestore;
const firebase = admin.database();
exports.firebase = firebase;
//# sourceMappingURL=index.js.map