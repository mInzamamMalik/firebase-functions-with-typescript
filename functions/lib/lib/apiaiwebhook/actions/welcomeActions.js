"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class welcomeActions {
}
welcomeActions.inputwelcome = function (app) {
    const param1 = app.getArgument("param1");
    console.log("param1: ", param1);
    app.ask(app.buildRichResponse()
        .addSimpleResponse({
        speech: `<speak>
                    <s> wellcome to chatbot </s>
                </speak>`
    }).addSuggestions([
        "return to main menu", "exit"
    ]));
};
welcomeActions.help = function (app) {
    app.ask(app.buildRichResponse()
        .addSimpleResponse({
        speech: `<speak>
                <s> wellcome to chatbot </s>
            </speak>`
    }).addSuggestions([
        "return to main menu", "exit"
    ]));
};
exports.welcomeActions = welcomeActions;
//# sourceMappingURL=welcomeActions.js.map