import * as rules from './*.md';

const allRules = Object.entries(rules);

export const HtmlRules = new Map(
    allRules.map(([rn, { default: rhtml }]) => [rn, rhtml])
);

export const MarkdownRules = new Map(
    allRules.map(([rn, { raw }]) => [rn, raw])
);