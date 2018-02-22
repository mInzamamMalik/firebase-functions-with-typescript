import * as functions from 'firebase-functions';
const Assistant = require('actions-on-google').DialogflowApp;

import { Request, Response } from "express"; //interfaces

import {
    welcomeActions
} from './actions'

// API.AI Action names
const inputwelcome = 'input.welcome';
const help = 'help';

export const webhook = functions.https.onRequest(async (request: Request, response: Response) => {
    try {
        const assistant = new Assistant({ request: request, response: response });
        const actionMap = new Map();

        actionMap.set(inputwelcome, welcomeActions.inputwelcome);
        actionMap.set(help, welcomeActions.help);
        
        assistant.handleRequest(actionMap);

    } catch (e) {
        console.log("main error catch: ", e)
    }
})//end of webhook http trigger
