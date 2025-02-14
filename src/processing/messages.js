import { convert } from "html-to-text";

export function addRules(data, RulesHtml) {
    console.log(RulesHtml);
    data.metadata.rules = 
        convert(RulesHtml, {
            wordwrap: false,
            selectors: [
                { selector: 'strong', format: 'inlineSurround', options: {prefix: '*', suffix: '*'}}
            ]
        })
        .replaceAll("\n\n *", "\n *");
}

export function addMsgCorrect(data, MsgCorrectHTML) {
    if (MsgCorrectHTML.length > 0) {
        data.metadata.msgcorrect = convert(MsgCorrectHTML, {wordwrap: false});
    }
}