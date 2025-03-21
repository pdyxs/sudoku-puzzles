# Sudoku Puzzles + Tools to make them

This is a repository of my sudoku puzzles, including the tools that I use to create and maintain them.

If you have any questions about this, get in touch on [bluesky](https://bsky.app/profile/pdyxs.bsky.social)

## Running the app

This repository is a website that is designed to be run locally, as you work on a puzzle. The easiest way to run it is to use a codespace (click "Code" above -> Codespaces -> create a codespace).

To set up the packages, run:
```
yarn install
```

To run the page, run:
```
yarn start
```

## Features

The tools here aim to help with the last few steps of creating a puzzle: final touches, modifying rules and posting the puzzle to various platform.

### Overview

The overview displays the information you've added to a puzzle, mostly for review. There is also a button for generating a sudokupad shorturl for your puzzle.

### Preview

The preview window simply renders the puzzle in sudokupad. Importantly, it hot reloads but does not generate shorturls, so you can quickly try out changes without excessive load to the sudokupad server. This is especially useful for fine tuning of visual elements (e.g. curvy lines).

### HTML

The HTML window generates html that's suitable for use on Logic Masters Germany. This is especially useful when making updates to existing rulesets or puzzles.

### Markdown

The markdown window generates markdown that's suitable for posting to platforms like discord.

## Using this for your own puzzles

If you want to use this for your own puzzles, you should fork this repository and create your own folder in the `src/data` directory. The easiest way to do this is to:
* copy the `pdyxs` directory;
* remove all directories in the new `puzzles` directory;
* remove all references to specific puzzles from `puzzles/index.js`
* remove or update all contents of the `snippets` directory

You should then update `data/index.js` to point to your new directories.

### Text formatting

In general, I try to use markdown for text. The default import for markdown files is html, but you can use `import { raw }` to get the raw markdown text.

There are places where plain text is needed (mostly in sudokupad). I generally prefer to convert html to plain text (using the `html-to-text` package), rather than converting from markdown.

### Puzzle Processing

Each puzzle has its own folder. The `index.js` of each puzzle exports all of that puzzle's data as a js object, so the actual structure of each folder can vary.

The core exports for a puzzle are:
* `puzzle`: the json data for that puzzle
* `process`: a function that takes in the puzzle's json data, adjusts it and then returns the altered object

The `src/processing` directory contains a number of utilities to use here, including:
* `addRules`: add/replace the puzzle's rules
* `addMsgCorrect`: add/replace the puzzles message upon completion
* utilities for grids that are larger than the puzzle:
  * `hideGridOutside`: places lines that hide the grid outside a given set of rows and columns
  * `ignoreSolutionOutside`: places '?' in the checked solution outside a given set of rows and columns
  * `generateRowCols`: generates row and column cages
* fog utilities:
  * `createAdjacentRevealableFogTriggers`: creates triggers which will only reveal the cells given in an array, where entering a correct digit will reveal all adjacent cells that can be revealed
  * `createSkyscraperFogTriggers`: creates triggers that reveal any cells that can be seen from a given cell, using skyscraper rules

### Other puzzle exports

* `rules`
* `msgCorrect`
* `preamble` - some introductory text that goes before the rules
* `sudokupad` - the full url to the sudokupad puzzle
* `lmd` - the url of the puzzle on logic masters germany
* `imgId` - the puzzle image id on logic masters germany
* `solveguide` - a solve guide (only rendered in 'overview' right now)