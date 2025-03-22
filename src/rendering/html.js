

export function renderHTML({ }, {
    imgId
}) {
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
}