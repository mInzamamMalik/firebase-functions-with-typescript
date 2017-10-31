import * as request from 'request';

export function inputWelcome(app: any) {

    console.log("app.getUser().accessToken: ", app.getUser().accessToken)
    console.log("app.getUser().userId: ", app.getUser().userId)
    
    app.ask("wellcome to smart health");
}
