import PuzzleRulesHtml from "./puzzle/rules.md";
import PuzzleMessageCorrectHTML from "./puzzle/msgcorrect.md";
import PuzzlePreambleHtml from "./puzzle/preamble.md";
import PuzzlePostHtml from "./puzzle/post.md";
import puzzle from "./puzzle/puzzle.json";
import { PuzzleZipper } from "./sudokupad/puzzlezipper";
import { loadFPuzzle } from "./sudokupad/fpuzzlesdecoder";
import { processPuzzle } from "./puzzle/process";

const processedPuzzle = processPuzzle(puzzle);

const iframe = document.getElementById("frame");

// Menu
const menuButtons = document.querySelectorAll(".menu-button");
const contentSections = document.querySelectorAll(".content-section");

function updateActiveSection(targetId) {
    menuButtons.forEach(btn => btn.classList.remove('active'));
    contentSections.forEach(section => section.classList.remove('active'));
    document.body.classList.value = targetId;

    const targetButton = document.querySelector(`.menu-button[data-target="${targetId}"]`);
    if (targetButton) {
        targetButton.classList.add('active');
    }

    const targetSection = document.getElementById(targetId);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    history.pushState(null, '', `?section=${targetId}`);

    if (targetId === 'preview') {
        showPreview();
    }
}

function initializeFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const sectionParam = urlParams.get('section');

    const validSections = Array.from(menuButtons).map(b => b.dataset.target);
    const targetId = validSections.includes(sectionParam)
        ? sectionParam
        : validSections[0];
    updateActiveSection(targetId);
}

menuButtons.forEach(button => {
    button.addEventListener('click', () => {
        updateActiveSection(button.dataset.target);
    });
});

window.addEventListener('popstate', initializeFromUrl);

initializeFromUrl();


// Eruda
function setErudaPosition() {
    eruda.position({x: document.body.clientWidth-45, y: 0});
}
setErudaPosition();
addEventListener("resize", setErudaPosition)

//Preview
function showPreview() {
    iframe.src = "https://sudokupad.app/scf?puzzleid=" + encodeSCLPuz(processedPuzzle);
}

function encodeSCLPuz(puzzle) {
    const { zip } = PuzzleZipper;
    return 'scl' + loadFPuzzle.compressPuzzle(zip(JSON.stringify(puzzle)));
}

//Overview
document.getElementById("puzzle-title").innerHTML = processedPuzzle.metadata.title;
document.getElementById("puzzle-rules").innerHTML = PuzzleRulesHtml;
document.getElementById("puzzle-preamble").innerHTML = PuzzlePreambleHtml;
document.getElementById("puzzle-msgcorrect").innerHTML = PuzzleMessageCorrectHTML;
document.getElementById("generateUrl").setAttribute("href", "https://sudokupad.app/" + encodeSCLPuz(processedPuzzle))
document.getElementById("post").innerHTML = PuzzlePostHtml;

//HTML
const sources = document.getElementById("html-container").querySelectorAll(":scope > div");
const htmls = Array.from(sources).map(s => s.innerHTML).join("\n\n");
document.getElementById("html-pre").innerText = htmls;