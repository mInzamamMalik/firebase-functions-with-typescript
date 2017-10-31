import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import * as functionRequest from 'request';
const Assistant = require('actions-on-google').DialogflowApp;

import { Request, Response } from "express"; //interfaces

import { inputWelcome, bookAppointment } from './actions'

// API.AI Action names
const INPUT_WELLCOME = 'input.welcome';
const BOOK_AN_APPOINTMENT = 'BookAnAppointment';


export const webhook = functions.https.onRequest(async (request: Request, response: Response) => {

    const assistant = new Assistant({ request: request, response: response });
    let actionMap = new Map();

    actionMap.set(INPUT_WELLCOME, inputWelcome);
    actionMap.set(BOOK_AN_APPOINTMENT, bookAppointment);

    assistant.handleRequest(actionMap);

})//end of webhook http trigger

