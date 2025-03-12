import { PuzzleZipper } from "./sudokupad/puzzlezipper";
import { loadFPuzzle } from "./sudokupad/fpuzzlesdecoder";
import { series } from "./puzzles";

const iframe = document.getElementById("frame");

// Menu
const menuButtons = document.querySelectorAll(".menu-button");
const contentSections = document.querySelectorAll(".content-section");

let currentSeriesIndex, 
    currentPuzzleIndex, 
    currentSection,
    processedPuzzle;

function populateSeriesDropdown() {
  const seriesDropdown = document.getElementById('series-dropdown');
  seriesDropdown.innerHTML = '';
  
  series.forEach((seriesItem, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = seriesItem.name;
    if (index === currentSeriesIndex) {
      option.selected = true;
    }
    seriesDropdown.appendChild(option);
  });
}

function populatePuzzleDropdown() {
  const puzzleDropdown = document.getElementById('puzzle-dropdown');
  const currentSeries = series[currentSeriesIndex];
  puzzleDropdown.innerHTML = '';
  
  currentSeries.puzzles.forEach((puzzleItem, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = puzzleItem.puzzle.metadata.title;
    if (index === currentPuzzleIndex) {
      option.selected = true;
    }
    puzzleDropdown.appendChild(option);
  });
}

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

    currentSection = targetId;

    if (targetId === 'preview') {
        showPreview();
    }
}

function updateUrl() {
    history.pushState(null, '', `?section=${currentSection}&series=${currentSeriesIndex}&puzzle=${currentPuzzleIndex}`);
}

function initializeFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const sectionParam = urlParams.get('section');

    const activeSeries = urlParams.get('series');
    currentSeriesIndex = Number.parseInt(activeSeries || 0);

    const activePuzzle = urlParams.get('puzzle');
    currentPuzzleIndex = Number.parseInt(activePuzzle || series[currentSeriesIndex].puzzles.length - 1);

    loadPuzzle();

    const validSections = Array.from(menuButtons).map(b => b.dataset.target);
    const targetId = validSections.includes(sectionParam)
        ? sectionParam
        : validSections[0];
    updateActiveSection(targetId);

    updateUrl();
}

menuButtons.forEach(button => {
    button.addEventListener('click', () => {
        updateActiveSection(button.dataset.target);
        updateUrl();
    });
});

// Eruda
function setErudaPosition() {
    eruda.position({x: document.body.clientWidth-45, y: 0});
}
setErudaPosition();
addEventListener("resize", setErudaPosition)

function loadPuzzle() {
    const currentSeries = series[currentSeriesIndex];
    const currentPuzzleObj = currentSeries.puzzles[currentPuzzleIndex];

    // Process the new puzzle
    processedPuzzle = currentPuzzleObj.process(currentPuzzleObj.puzzle);
    
    // Update all UI components
    updatePuzzleUI(currentSeries, currentPuzzleObj);

    // Initialize dropdowns
    populateSeriesDropdown();
    populatePuzzleDropdown();
    
    // If we're in preview mode, refresh the iframe
    if (document.body.classList.contains('preview')) {
      showPreview();
    }

    if (document.body.classList.contains('md') && !currentPuzzleObj.markdown) {
        updateActiveSection('overview');
    }
}

//Initialise puzzle
function updatePuzzleUI(currentSeries, currentPuzzle) {

    const {
        name: seriesName,
        hidePuzzleList
    } = currentSeries;

    const {
        puzzle,
        rules,
        msgCorrect,
        preamble,
        sudokupad,
        imgId,
        markdown,
    } = currentPuzzle;

    //Overview
    document.getElementById("puzzle-title").innerHTML = processedPuzzle.metadata.title;
    document.getElementById("puzzle-rules").innerHTML = rules;
    if (preamble !== undefined) {
        document.getElementById("puzzle-preamble").innerHTML = preamble;
    }
    if (msgCorrect !== undefined) {
        document.getElementById("puzzle-msgcorrect").innerHTML = msgCorrect;
    }
    document.getElementById("generateUrl").setAttribute("href", "https://sudokupad.app/" + encodeSCLPuz(processedPuzzle))

    if (sudokupad !== undefined) {
        document.getElementById("sudokupad-link").setAttribute("href", sudokupad);
    } else {
        document.getElementById("sudokupad-link").innerText = "No Sudokupad Link set"
    }

    const otherSeriesPuzzles = series[currentSeriesIndex].puzzles.filter(p => p.lmd !== undefined && p.puzzle?.metadata?.title !== puzzle?.metadata?.title);
    if (!hidePuzzleList && otherSeriesPuzzles.length > 0) {
        let postHtml = `<h4 style="margin-bottom: 0">More ${seriesName} puzzles:</h4>\n<ul style="margin-top: 0.4em">\n`;
        postHtml += otherSeriesPuzzles.map(({puzzle, lmd}) => `\t<li><a href="${lmd}">${puzzle.metadata.title}</a></li>`).join("\n");
        postHtml += "\n</ul>";
        document.getElementById("post").innerHTML = postHtml;
    }

    //HTML
    const preSources = document.getElementById("html-pre-image").querySelectorAll(":scope > div");
    const postSources = document.getElementById("html-post-image").querySelectorAll(":scope > div");
    const preHtml = Array.from(preSources).map(s => s.innerHTML).join("\n\n");
    const postHtml = Array.from(postSources).map(s => s.innerHTML).join("\n\n");
    let imageHtml = "";
    if (imgId !== undefined) {
        document.getElementById("image-placeholder").innerHTML = `Image id: ${imgId}`;
        imageHtml = `<div style="clear:both;text-align:center"><img:${imgId}></div>`;
    }

    const shownHtml = (preHtml + imageHtml + postHtml).replaceAll("||img:", "<img:").replaceAll("||", ">");
    document.getElementById("html-pre").innerText = shownHtml;

    //Markdown
    if (markdown) {
        document.getElementById("markdown-btn").classList.remove("hide");
        document.getElementById("md-pre").innerHTML = markdown;
    } else {
        document.getElementById("markdown-btn").classList.add("hide");
    }
}

window.addEventListener('popstate', initializeFromUrl);

// Event listeners for dropdowns
document.getElementById('series-dropdown').addEventListener('change', function() {
    currentSeriesIndex = parseInt(this.value);
    currentPuzzleIndex = series[currentSeriesIndex].puzzles.length - 1; // Default to last puzzle in series
    populatePuzzleDropdown();
    loadPuzzle();

    updateUrl();
});
  
document.getElementById('puzzle-dropdown').addEventListener('change', function() {
    currentPuzzleIndex = parseInt(this.value);
    loadPuzzle();
    updateUrl();
});

initializeFromUrl();

//Preview
function showPreview() {
    iframe.src = "https://sudokupad.app/scf?puzzleid=" + encodeSCLPuz(processedPuzzle);
}

function encodeSCLPuz(puzzle) {
    const { zip } = PuzzleZipper;
    return 'scl' + loadFPuzzle.compressPuzzle(zip(JSON.stringify(puzzle)));
}
