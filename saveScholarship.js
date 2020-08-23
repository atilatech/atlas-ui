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
        // using name instead of title here,
        // the Atila API uses refers to scholarships with 'name'
        const name = document.title;
        const deadline = scholarship.deadline;
        const dateAdded = new Date();

        const scholarshipData = {
            url,
            name,
            deadline,
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