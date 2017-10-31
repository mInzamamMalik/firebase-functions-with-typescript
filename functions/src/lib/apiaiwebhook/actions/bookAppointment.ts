import * as request from 'request';

export function bookAppointment(app: any) {

    let name = app.getArgument("name")
    let PhysicianType = app.getArgument("PhysicianType")
    let date = app.getArgument("date")
    let time = app.getArgument("time")

    console.log(PhysicianType, date, time);

    let url = "https://mw52yzmhg1.execute-api.us-east-1.amazonaws.com/Test/appt"
    request.post({
        url: url,
        json: {
            "name": name,
            "date": date,
            "time": time,
            "appointmentType": PhysicianType
        }
    }, function (error, response, body) {

        //checking if response was success
        if (!error && response.statusCode == 200) {
            console.log("response: ", response);
            console.log("response.body: ", response.body);

            app.tell(response.body.message);

        } else {
            console.log("err: ", error);
        }
    });


}
