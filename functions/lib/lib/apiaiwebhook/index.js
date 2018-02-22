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
const Assistant = require('actions-on-google').DialogflowApp;
const actions_1 = require("./actions");
// API.AI Action names
const inputwelcome = 'input.welcome';
const help = 'help';
exports.webhook = functions.https.onRequest((request, response) => __awaiter(this, void 0, void 0, function* () {
    try {
        const assistant = new Assistant({ request: request, response: response });
        const actionMap = new Map();
        actionMap.set(inputwelcome, actions_1.welcomeActions.inputwelcome);
        actionMap.set(help, actions_1.welcomeActions.help);
        assistant.handleRequest(actionMap);
    }
    catch (e) {
        console.log("main error catch: ", e);
    }
})); //end of webhook http trigger
//# sourceMappingURL=index.js.map