import { convert } from "html-to-text";
import { RulesMap } from "./rules";

export function replaceRules(rules) {
    RulesMap.forEach((rule, code) => {
        rules = rules.replaceAll(`<p>{${code}}</p>`, rule);
    });
    return rules;
}

export function addRules(data, RulesHtml) {
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