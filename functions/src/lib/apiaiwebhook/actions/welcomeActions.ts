
export class welcomeActions {

    static inputwelcome = function (app: any) {

        let param1 = app.getArgument("param1")

        console.log("param1: ", param1)

        app.ask(app.buildRichResponse()
            .addSimpleResponse({
                speech:
                    `<speak>
                    <s> wellcome to chatbot </s>
                </speak>`
            }).addSuggestions([
                "return to main menu", "exit"
            ])
        )
    }

    static help = function (app: any) {
        app.ask(app.buildRichResponse()
            .addSimpleResponse({
                speech:
                    `<speak>
                <s> wellcome to chatbot </s>
            </speak>`
            }).addSuggestions([
                "return to main menu", "exit"
            ])
        )
    }

}