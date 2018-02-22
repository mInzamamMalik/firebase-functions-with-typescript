import * as request from 'request';


export class http {

    static get = (url: string, queryParamsObject: any = {}) => {
        return new Promise((resolve, reject) => {
            try {

                let query = "";
                //converting query onject to query string
                if (Object.keys(queryParamsObject).length) { // if any query param is present
                    query = '?';
                    let paramArray = Object.keys(queryParamsObject);
                    paramArray.map((eachParam) => {
                        query += `${eachParam}=${queryParamsObject[eachParam]}&`
                    })
                }
                query = query.slice(0, -1)// removing & from last

                //making request
                request.get({ url: url + query }, function (error, response, body) {

                    //checking if response was success
                    if (!error && response.statusCode === 200) {
                        const responseBody = JSON.parse(response.body)

                        console.log("http get success, url: ", url, "responseBody: ", responseBody);
                        resolve(responseBody)

                    } else {
                        console.log("http get error, url: ", url, error);
                        reject(response.statusCode)
                    }
                })
            } catch (e) {
                console.log("catch error: ", e)
            }
        })
    }

    static post = (url: string, jsonBody: any): Promise<any> => {
        return new Promise((resolve, reject) => {

            request.post({ url: url, json: jsonBody }, function (error, response, body) {

                //checking if response was success
                if (!error && (response.statusCode === 200 || response.statusCode === 201)) {

                    const responseBody = response.body;
                    console.log("http post success, url: ", url, "request body: ", jsonBody, "responseBody: ", responseBody);

                    resolve(responseBody)

                } else {
                    console.log("http post error, url: ", url, "body: ", jsonBody, error, response.statusCode);
                    reject(response.statusCode)
                }
            })
        })
    }
}