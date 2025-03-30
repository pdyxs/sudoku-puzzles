import { convert } from "html-to-text";
import { HtmlRules, MarkdownRules } from "../rules";
import { snippets } from "../data";

export function setupTexts(texts) {
    return Object.entries(texts).reduce((o, [name, text]) => {
        return {
            ...o,
            [name]: {
                default: text.default,
                raw: text.raw
            }
        }
    }, {});
}

export function replaceUrls(text, urls) {
    urls.forEach(([name, url]) => {
        text.default = text.default.replace(`href="${name}"`, `href="${url}"`);
        text.raw = text.raw.replace(`](${name})`, `](${url})`);
    });
}

export function replaceImages(text, images) {
    images.forEach(([name, code]) => {
        text.default = text.default.replace(`img:${name}`, `||img:${code}||`)
    })
}

export function replaceRules(text) {
    HtmlRules.forEach((rule, code) => {
        text.default = text.default.replaceAll(`<p>{${code}}</p>`, rule);
        text.default = text.default.replaceAll(`{${code}}`, MarkdownRules.get(code))
    });
    MarkdownRules.forEach((rule, code) => {
        text.raw = text.raw.replaceAll(`{${code}}`, rule);
    });
}

const markdownLinkFormatter = (elem, walk, builder, formatOptions) => {
    const allowLink = elem.attribs?.href?.startsWith("https://sudokupad.app");

    if (allowLink) {
        builder.addInline("[");
        formatOptions.linkBrackets = ['](', ')'];
    } else {
        formatOptions.ignoreHref = true;
        formatOptions.linkBrackets = "";
    }

    const anchorFormatter = builder.options.formatters['anchor'];
    if (anchorFormatter) {
        anchorFormatter(elem, walk, builder, formatOptions);
    }
}

export function addRules(data, RulesHtml) {
    data.metadata.rules =
        convert(RulesHtml, {
            wordwrap: false,
            formatters: {
                markdownLinkFormatter
            },
            selectors: [
                { selector: 'strong', format: 'inlineSurround', options: { prefix: '*', suffix: '*' } },
                { selector: 'a', format: 'markdownLinkFormatter' }
            ]
        })
            .replaceAll("\n\n *", "\n *");
}

export function addMsgCorrect(data, MsgCorrectHTML) {
    data.metadata.msgcorrect = convert(MsgCorrectHTML + (snippets.contact?.default || ""), {
        wordwrap: false,
        formatters: {
            markdownLinkFormatter
        },
        selectors: [
            { selector: 'a', format: 'markdownLinkFormatter' }
        ]
    });
}