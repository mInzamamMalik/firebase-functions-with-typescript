// src/index.ts
import * as functions from 'firebase-functions'
import db from './db'

import { function1, function2, function3, function4 } from './lib/function_category1'

export const fun1 = function1; //function will deploy on firebase with name 'fun1'
export const fun2 = function2;
export const fun3 = function3;
export const fun4 = function4;


import { function5, function6, function7, function8 } from './lib/function_category2'

export const fun5 = function5;
export const fun6 = function6;
export const fun7 = function7;
export const fun8 = function8;