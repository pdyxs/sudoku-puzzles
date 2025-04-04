import { series } from "./data";
import { renderHTML } from "./rendering/html";
import { renderMarkdown } from "./rendering/markdown";
import { renderOverview } from "./rendering/overview";
import { showPreview } from "./rendering/preview";
import { encodeSCLPuz } from "./util/encodePuzzle";

// Menu
const menuButtons = document.querySelectorAll(".menu-button");
const contentSections = document.querySelectorAll(".content-section");

let currentSeriesIndex,
    currentPuzzleIndex,
    currentSection;

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
        showPreview(series[currentSeriesIndex].puzzles[currentPuzzleIndex]);
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
    eruda.position({ x: document.body.clientWidth - 45, y: 0 });
}
setErudaPosition();
addEventListener("resize", setErudaPosition)

function loadPuzzle() {
    const currentSeries = series[currentSeriesIndex];
    const currentPuzzleObj = currentSeries.puzzles[currentPuzzleIndex];

    // Process the new puzzle
    currentPuzzleObj.processedPuzzle = currentPuzzleObj.process(currentPuzzleObj.puzzle);

    // Update all UI components
    updatePuzzleUI();

    // Initialize dropdowns
    populateSeriesDropdown();
    populatePuzzleDropdown();

    // If we're in preview mode, refresh the iframe
    if (document.body.classList.contains('preview')) {
        showPreview(series[currentSeriesIndex].puzzles[currentPuzzleIndex]);
    }

    if (document.body.classList.contains('md') && !currentPuzzleObj.markdown) {
        updateActiveSection('overview');
    }
}

//Initialise puzzle
function updatePuzzleUI() {
    const seriesObj = series[currentSeriesIndex];
    const puzzleObj = series[currentSeriesIndex].puzzles[currentPuzzleIndex];

    renderOverview(seriesObj, puzzleObj);
    renderHTML(seriesObj, puzzleObj);
    renderMarkdown(seriesObj, puzzleObj);
}

window.addEventListener('popstate', initializeFromUrl);

// Generate short link functionality
async function generateSudokupadLink() {
    const generateButton = document.getElementById("generateLinkBtn");

    try {
        const currentSeries = series[currentSeriesIndex];
        const currentPuzzleObj = currentSeries.puzzles[currentPuzzleIndex];

        // Set button to loading state
        generateButton.textContent = "Generating...";
        generateButton.disabled = true;

        // Make the POST request
        const response = await fetch('https://sudokupad.app/admin/createlink', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ puzzle: encodeSCLPuz(currentPuzzleObj.processedPuzzle) })
        });

        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }

        const data = await response.json();

        if (!data.shortid) {
            throw new Error('No shortid in response');
        }

        // Generate the URL
        const sudokupadUrl = `https://sudokupad.app/${data.shortid}`;

        // Update the current puzzle object
        currentPuzzleObj.sudokupad = sudokupadUrl;

        updatePuzzleUI();

        generateButton.textContent = `Puzzle id: ${data.shortid}`;
        // Copy URL to clipboard
        copyTextToClipboard(sudokupadUrl, generateButton);

        return sudokupadUrl;
    } catch (error) {
        console.error('Error generating link:', error);
        generateButton.textContent = "Error";
        setTimeout(() => {
            generateButton.textContent = "Generate & Copy Link";
            generateButton.disabled = false;
        }, 2000);
    }
}

//Generate link button
document.getElementById("generateLinkBtn").addEventListener("click", generateSudokupadLink);

// Event listeners for dropdowns
document.getElementById('series-dropdown').addEventListener('change', function () {
    currentSeriesIndex = parseInt(this.value);
    currentPuzzleIndex = series[currentSeriesIndex].puzzles.length - 1; // Default to last puzzle in series
    populatePuzzleDropdown();
    loadPuzzle();

    updateUrl();
});

document.getElementById('puzzle-dropdown').addEventListener('change', function () {
    currentPuzzleIndex = parseInt(this.value);
    loadPuzzle();
    updateUrl();
});


// Copy button functionality
function setupCopyButtons() {
    const htmlCopyBtn = document.getElementById('html-copy-btn');
    const mdCopyBtn = document.getElementById('md-copy-btn');

    if (htmlCopyBtn) {
        htmlCopyBtn.addEventListener('click', () => {
            copyTextToClipboard(document.getElementById('html-pre').value, htmlCopyBtn);
        });
    }

    if (mdCopyBtn) {
        mdCopyBtn.addEventListener('click', () => {
            copyTextToClipboard(document.getElementById('md-pre').value, mdCopyBtn);
        });
    }
}

function copyTextToClipboard(text, button) {
    // Check if the Clipboard API is available
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text)
            .then(() => {
                showCopiedFeedback(button);
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
                fallbackCopyTextToClipboard(text, button);
            });
    } else {
        // Fallback for browsers without clipboard API
        fallbackCopyTextToClipboard(text, button);
    }
}

function fallbackCopyTextToClipboard(text, button) {
    const textArea = document.createElement("textarea");
    textArea.value = text;

    // Make the textarea invisible
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);

    textArea.focus();
    textArea.select();

    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showCopiedFeedback(button);
        } else {
            button.textContent = "Copy failed";
        }
    } catch (err) {
        console.error('Fallback: Could not copy text: ', err);
        button.textContent = "Copy failed";
    }

    document.body.removeChild(textArea);
}

function showCopiedFeedback(button) {
    const originalText = button.textContent;
    button.textContent = "Copied!";
    button.classList.add("copied");

    setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove("copied");
    }, 2000);
}

setupCopyButtons();
initializeFromUrl();


