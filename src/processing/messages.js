import { convert } from "html-to-text";

export function addRules(data, RulesHtml) {
    data.metadata.rules = convert(RulesHtml, {wordwrap: false});
}

export function addMsgCorrect(data, MsgCorrectHTML) {
    if (MsgCorrectHTML.length > 0) {
        data.metadata.msgcorrect = convert(MsgCorrectHTML, {wordwrap: false});
    }
}