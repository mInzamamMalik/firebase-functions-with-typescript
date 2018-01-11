import * as functions from 'firebase-functions'
import * as request from 'request'

export interface entityEntry {
    "value": string,
    "synonyms": string[]
}
let access_token = "Bearer 3065ceaaf2f24c1cb51dbad1987b1a01"

export function makeDevEntity(entityName: string, entries: entityEntry[]) {

    return new Promise((resolve, reject) => {

        let json = {
            "name": entityName,
            "entries": entries
        }

        // replacing existing entity with the new one using put request, if not exist it will create
        // post request gives error if entity exist
        request.put({
            url: "https://api.api.ai/v1/entities",
            headers: {
                "Authorization": access_token
            },
            json: json
        }, function (error: any, response: any, body: any) {
            // console.log(`on ${access_token} making entity ${entityName}`);
            // console.log(`request body:`, json, ` response: `, response.body);

            //checking if response was success
            if (!error && response.statusCode == 200) {
                resolve(response.body);
            } else {
                // console.log("error in making user /entity: ", response.statusCode, error);
                reject(error)
            }
        })
    })//promise end
}//makeDevEntity end

export function makeUserEntity(sessionId: string, entityName: string, entries: entityEntry[]) {

    return new Promise((resolve, reject) => {
        // adding all organizations in apiai userEntity
        request.post({
            url: "https://api.api.ai/v1/userEntities",
            headers: {
                "Authorization": access_token
            },
            json: {
                "sessionId": sessionId,
                "name": entityName,
                "entries": entries
            }
        }, function (error: any, response: any, body: any) {

            console.log(`on ${access_token} making entity ${entityName} on session ${sessionId} response: `, response.body);
            //checking if response was success
            if (!error && response.statusCode == 200) {

                resolve(response.body);

            } else {
                // console.log("error in making user /entity: ", response.statusCode, error);
                reject(error)
            }
        })
    })//promise end
}//makeUserEntity end


export function makeUserEntityWithArray(sessionId: string, entityName: string, entries: string[], isDry = false): Promise<any> {
    return new Promise((resolve, reject) => {

        let entityEntry: entityEntry[] = [];
        entries.map((name, index) => {

            let value = name; //temp variable
            let synonyms = [name]; //temp variable

            if (!isDry) {
                switch (index) {
                    case 0:
                        synonyms.push("1")
                        synonyms.push("1st")
                        synonyms.push("1st option")
                        synonyms.push("first")
                        synonyms.push("first option")
                        synonyms.push("one")
                        synonyms.push("option one")
                        break;
                    case 1:
                        synonyms.push("2")
                        synonyms.push("2nd")
                        synonyms.push("2nd option")
                        synonyms.push("second")
                        synonyms.push("second option")
                        synonyms.push("two")
                        synonyms.push("option two")
                        break;
                    case 2:
                        synonyms.push("3")
                        synonyms.push("3rd")
                        synonyms.push("3rd option")
                        synonyms.push("third")
                        synonyms.push("third option")
                        synonyms.push("three")
                        synonyms.push("option three")
                        break;
                    default:
                        synonyms.push("" + index)
                        synonyms.push("" + index + "th")
                        synonyms.push("" + index + "th option")
                        break;
                }
            }
            entityEntry.push({
                value: value, // value will look like: "geo fence group"
                synonyms: synonyms // synonyms looks like: ["geo fence group", "1", "1st", "first"]
            })
        })
        makeUserEntity(sessionId, entityName, entityEntry).then(response => {
            resolve(response)
        })
    })//promise end
}