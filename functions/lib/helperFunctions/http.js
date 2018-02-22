"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request");
class http {
}
http.get = (url, queryParamsObject = {}) => {
    return new Promise((resolve, reject) => {
        try {
            let query = "";
            //converting query onject to query string
            if (Object.keys(queryParamsObject).length) {
                query = '?';
                let paramArray = Object.keys(queryParamsObject);
                paramArray.map((eachParam) => {
                    query += `${eachParam}=${queryParamsObject[eachParam]}&`;
                });
            }
            query = query.slice(0, -1); // removing & from last
            //making request
            request.get({ url: url + query }, function (error, response, body) {
                //checking if response was success
                if (!error && response.statusCode === 200) {
                    const responseBody = JSON.parse(response.body);
                    console.log("http get success, url: ", url, "responseBody: ", responseBody);
                    resolve(responseBody);
                }
                else {
                    console.log("http get error, url: ", url, error);
                    reject(response.statusCode);
                }
            });
        }
        catch (e) {
            console.log("catch error: ", e);
        }
    });
};
http.post = (url, jsonBody) => {
    return new Promise((resolve, reject) => {
        request.post({ url: url, json: jsonBody }, function (error, response, body) {
            //checking if response was success
            if (!error && (response.statusCode === 200 || response.statusCode === 201)) {
                const responseBody = response.body;
                console.log("http post success, url: ", url, "request body: ", jsonBody, "responseBody: ", responseBody);
                resolve(responseBody);
            }
            else {
                console.log("http post error, url: ", url, "body: ", jsonBody, error, response.statusCode);
                reject(response.statusCode);
            }
        });
    });
};
exports.http = http;
//# sourceMappingURL=http.js.map