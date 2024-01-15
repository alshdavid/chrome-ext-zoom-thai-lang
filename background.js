const fonts = Promise.all([
    fetch(chrome.runtime.getURL('fonts/noto_serif_thai.woff2')).then(r => r.blob()).then(b => blob_to_base64(b)),
    fetch(chrome.runtime.getURL('fonts/noto_serif_thai_latin_ext.woff2')).then(r => r.blob()).then(b => blob_to_base64(b)),
    fetch(chrome.runtime.getURL('fonts/noto_serif_thai_latin.woff2')).then(r => r.blob()).then(b => blob_to_base64(b)),
])

chrome.action.onClicked.addListener(async function (tab) {
    chrome.scripting.executeScript({
        target: {tabId: tab.id, allFrames: true},
        files: ['content_script.js'],
    });

    chrome.scripting.insertCSS({
        target: {tabId: tab.id, allFrames: true},
        css: /*css*/`
            @font-face {
                font-family: 'Noto Serif Thai';
                font-style: normal;
                font-weight: 400;
                font-stretch: 100%;
                font-display: swap;
                src: url(${await fonts[0]}) format('woff2');
                unicode-range: U+0E01-0E5B, U+200C-200D, U+25CC;
            }
            /* latin-ext */
            @font-face {
                font-family: 'Noto Serif Thai';
                font-style: normal;
                font-weight: 400;
                font-stretch: 100%;
                font-display: swap;
                src: url(${await fonts[1]}) format('woff2');
                unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
            }
            /* latin */
            @font-face {
                font-family: 'Noto Serif Thai';
                font-style: normal;
                font-weight: 400;
                font-stretch: 100%;
                font-display: swap;
                src: url(${await fonts[2]}) format('woff2');
                unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
            }
        `,
    });
});

function blob_to_base64(blob) {
    return new Promise((resolve, _) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
    });
}