import { raw as markdownTemplate } from "./template.md";

function getMarkdown(text) {
    return text?.raw || undefined;
}

export function createMarkdown(name, preambeMd, rulesMd, sudokupad, lmd) {
    const replacements = [
        ["name", name],
        ["preamble", preambeMd],
        ["rules", rulesMd],
        ["sudokupad", sudokupad],
        ["lmd", lmd]
    ];

    return replacements.reduce((text, [key, replacement]) => {
        return text.replace(`{${key}}`, replacement);
    }, markdownTemplate);
}

export function renderMarkdown({ }, {
    processedPuzzle,
    preamble,
    rules,
    sudokupad,
    lmd
}) {
    const preambleMd = getMarkdown(preamble);
    const rulesMd = getMarkdown(rules);
    const name = processedPuzzle.metadata.title;

    if (!rulesMd) {
        document.getElementById("markdown-btn").classList.add("hide");
        return;
    }

    const markdown = createMarkdown(name, preambleMd, rulesMd, sudokupad, lmd);

    //Markdown
    document.getElementById("markdown-btn").classList.remove("hide");
    document.getElementById("md-pre").innerHTML = markdown;
}