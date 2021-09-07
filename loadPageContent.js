/**
 * Generate some details about scholarship based on the contents of the web page.
 * The extension popup might need access to the DOM element, which only the content script has access to.
 * This shares the DOM information with the popup script
 * @param {*} request 
 * @param {*} sendResponse 
 */

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.messageType === 'loadPageContent') {

        const domData = {
            name: document.title,
            description: getContentDescription(),
        }
        console.log({document, domData})
        sendResponse(domData);
    }
});


/**
 * Return the first one that contains a valid string
 * TODO: A future implementation might use an API to parse or summarize the page content
 */
function getContentDescription() {

    const potentialQuerySelectors = [
        "meta[itemprop='description']",
        "meta[property='og:description']",
        "meta[name='twitter:description']",
    ]

    let description = "";

    for (const querySelector of potentialQuerySelectors) {
        if (document.querySelector(querySelector)?.getAttribute('content')) {
            description = document.querySelector(querySelector).getAttribute('content');
            return description;
        }
    }

    return description;

}