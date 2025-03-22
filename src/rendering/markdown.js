import { raw as markdownTemplate } from "./template.md";

function getMarkdown(text) {
    return text?.raw || "";
}

export function createMarkdown({
    processedPuzzle,
    preamble,
    rules,
    sudokupad,
    lmd,
    msgPost
}) {
    const replacements = [
        ["name", processedPuzzle.metadata.title],
        ["preamble", getMarkdown(preamble)],
        ["rules", getMarkdown(rules)],
        ["sudokupad", sudokupad],
        ["lmd", lmd],
        ["msgPost", getMarkdown(msgPost)]
    ];

    return replacements.reduce((text, [key, replacement]) => {
        return text.replace(`{${key}}`, replacement);
    }, markdownTemplate);
}

export function renderMarkdown({ }, puzzleObj) {
    if (!puzzleObj.rules?.raw) {
        document.getElementById("markdown-btn").classList.add("hide");
        return;
    }

    const markdown = createMarkdown(puzzleObj);

    //Markdown
    document.getElementById("markdown-btn").classList.remove("hide");
    document.getElementById("md-pre").innerHTML = markdown;
}