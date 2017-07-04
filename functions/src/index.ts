// src/index.ts
import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { db } from './db'

import * as folder1 from './lib/folder1'
import * as folder2 from './lib/folder2'

admin.initializeApp(functions.config().firebase)

export const foo = folder1.foo
export const baz = folder2.baz