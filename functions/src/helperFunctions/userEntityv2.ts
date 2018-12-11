import * as request from 'request'
const { google } = require('googleapis');

export interface entityEntry {
    "value": string,
    "synonyms": string[]
}

const cred = {
    serviceAccountEmail: "dialogflow-opimvo@upworkbot-65288.iam.gserviceaccount.com",
    privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDKpvM5q3qk3f7c\nc32yopGFGS61e5NZVUJgheySl8ys+HuU9fhW5bC+kEkhcUoZemRCQx4dp2+7fLCW\ndhOKki/iaew2hdMIbmbrqRUUuZSB7TV//gzym/QeQQ/r7eWkWK25g8u7RFtJh5cu\nycSndKDjXYFZqidl6ZORraZ9NfJiNER/RQ2JKF/gB88ApIH+QRLz9aoky3+OG7ce\nNV97ASPY1oFIZKYPDdYDqp36JXy4tYnjCfwbjLC4B3RKRzETNa7gZ0vF35a6OX/7\nN+zz/cXxSmg98OE0l1fMy8YYWHNoFSRFVX5tsHFXwLJIa45EvmFBj/8jvwMSO5v6\nBZQQropNAgMBAAECgf8/6+lMh4pn9p4ta0B62EyObyMMm64ev4XwbE3y727gIIDa\nu7tZrZnSgjCPG+0DnFeDjygwsl/MA8ivrQ785p+0CzU2/X9TaX+NVggQQXlWgjwd\n40SyQf7+jAc5pBCLhm1F1wysRSOGTf6iA4LET0Vwck4aulEzFDo3+U5KsHmD/+ht\nYfb073hIRXyQgD32rIx4JkmdSyYlZf/+mHYWkWeNGr5cpHI6G02jNBx1hRysxPag\nX5TAT6UYkuvs+THxTMN/gRVmTv/6QOp7+/vfVvdu6ZqNEJfsGOPyS0/KK0/K+ohH\ncyFgZiLaMgf9ZFoWCz8jjtjB/NQtvs0m0vTgJcECgYEA91fRc8vI1QwNTj6l6cQd\nrsBOiZYs3C+uGoQjAxXEMC5J6GuimBT6uydmQW6RLHghuWbxlrJP3L8iYT5D94OD\n9qGafbAtIyCqwWQukeRnT32FCSPCHWapHooK6M+WvwhO0grvLSVZ2auEXLICW1ww\n5RrIJGWbAwYX/K0tSI2wzY0CgYEA0b60JCfk7TV+AneIUpftdS8PuXqMXdBoZKs0\nlODJQoucTnerrbKTZ8IXMHA3W4XoLlaRy0HzcsfatxwyZWtAhV5yMXXwlyafud96\nAF6chXAxCzSYgtrMvLBV13hfGrxgokDMDawb5uz3v/9GCPi7+/fYi0b848e+PI47\nBezdn8ECgYArs0VbWybplU6Ig4MW0UKZTHrTzkeww2/UWYJCGkdmZ9dBDDtW+WXv\nSR/E8b8Oh08WDb0jbe+0RcTSP4kMoxzep2C/UjA3Y58nugaMWjlyju/BVKMIRMoe\nji8tQPgWWmZqr+ngJRhB4A7rvbuy3o/4+olf/N+tYhc82nAEwJv7RQKBgQDOyarG\n/sIYECYU/o5bh8goQWbKYgUjtQZHQfgMU/Z48jX/ssKC9M2ZfWTpb6lURZgcn2MM\nNxBy+JEs+NLC5NPu6afCFdpG22Ccm7Snyp+ce3kO6CL42AkEewGW9ukk7daEAUhs\nrmOv769vDpmY3MpRaBCJeEp5tANdpoiQlfAGwQKBgQDcj6okOBlF54rw5Zg0wZ7G\nZfl/kby1vKimaI1qIceyxQXaDMImlMZT/Bhre7oK9HHOOFrGS/5v/xGj3EQlPiW0\nxmADVfm2NXz4kEZhgxbj3rt8AF4Q9x2BoqTYwdfWDmJsHNAGpACQPkPOz6j+6yVN\nrfKjGalqeDaSAnCT2sUWwg==\n-----END PRIVATE KEY-----\n"
}


export class userEntityv2 {

    static makeUserEntity = async function (
        session: string,
        entityName: string,
        entries: entityEntry[]
    ) {

        // getting server to server OAuth token
        const serviceAccountAuth = new google.auth.JWT({ // key is private key, extracted from service-account json file
            email: cred.serviceAccountEmail,
            key: cred.privateKey,
            scopes: ['https://www.googleapis.com/auth/cloud-platform']
        })

        const tokenData = await serviceAccountAuth.authorize()
        console.log("tokenData: ", tokenData)
        const accessToken = `${tokenData.token_type} ${tokenData.access_token}`
        console.log("accessToken: ", accessToken)

        return new Promise((resolve, reject) => {
            // adding all organizations in apiai userEntity
            request.post({
                url: `https://dialogflow.googleapis.com/v2/${session}/entityTypes/`,
                headers: {
                    "Authorization": accessToken
                },
                json: {
                    "name": `${session}/entityTypes/${entityName}`,
                    "entityOverrideMode": "ENTITY_OVERRIDE_MODE_OVERRIDE",
                    "entities": entries
                }
            }, function (error: any, response: any, body: any) {

                console.log(`on ${accessToken} making entity ${entityName} on session ${session} response: `, response.body);
                //checking if response was success
                if (!error && response.statusCode === 200) {

                    resolve(response.body);

                } else {
                    console.log("error in making user /entity: ", response.statusCode, error);
                    reject(error)
                }
            })
        })//promise end
    }//makeUserEntity end


    static makeUserEntityWithArray = async (
        session: string,
        entityName: string,
        entries: string[],
        isDry = false
    ) => {

        const newentityEntry: entityEntry[] = [];
        entries.map((name, index) => {

            let value = name; //temp variable
            let synonyms = [name]; //temp variable

            if (!isDry) {
                switch (index) {
                    case 0:
                        synonyms.push("1")
                        synonyms.push("1st")
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
                        synonyms.push("" + (index + 1))
                        synonyms.push("" + (index + 1) + "th")
                        synonyms.push("" + (index + 1) + "th option")
                        break;
                }
            }
            newentityEntry.push({
                value: value, // value will look like: "geo fence group"
                synonyms: synonyms // synonyms looks like: ["geo fence group", "1", "1st", "first"]
            })
        })
        const result = await userEntityv2.makeUserEntity(session, entityName, newentityEntry)
        return result

        // .catch(e => {
        //     throw new Error("error in making entity with array")
        // })
    }
}
