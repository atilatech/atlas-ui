chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {

        console.log({request});
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");

        if (request.messageType === "saveScholarship") {

            const scholarship = request.scholarship;
            saveScholarship(scholarship, sendResponse);
        }

        return true;

    });


function saveScholarship(scholarship, sendResponse) {
    chrome.storage.sync.get("savedScholarships", function(items) {
        let savedScholarships = [];
        const url = document.URL;
        const name = scholarship.name;
        const deadline = scholarship.deadline;
        const notes = scholarship.notes;
        const dateAdded = new Date().toISOString();

        const scholarshipData = {
            id: getRandomString(),
            url,
            name,
            deadline,
            notes,
            dateAdded,
        };

        console.log({items});

        if (items.savedScholarships) {
            savedScholarships = items.savedScholarships
        }
        savedScholarships.push(scholarshipData);

        chrome.storage.sync.set({ "savedScholarships" : savedScholarships }, function() {

            if (chrome.runtime.lastError) {
                console.log(`Runtime error. ${chrome.runtime.lastError}`);
            }
            sendResponse({savedScholarships});

        });

    });
}

function getRandomString(maxLength=16) {
    // https://gist.github.com/gordonbrander/2230317
    let randomString = '';

    for (let i =0; i< 4; i++) {
        randomString += Math.random().toString(36).substr(2, 8);
    }
    if (maxLength) {
        randomString = randomString.substring(0, maxLength);
    }

    return randomString;
}