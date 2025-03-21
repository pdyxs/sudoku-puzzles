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

If you want to use this for your own puzzles, I recommend forking this repository and setting up 