console.log('saveScholarship');
console.log('document.URL', document.URL);
console.log('document.title', document.title);

chrome.storage.sync.get("savedScholarships", function(items) {
    let savedScholarships = [];
    const url = document.URL;
    // using name instead of title here,
    // the Atila API uses refers to scholarships with 'name'
    const name = document.title;
    const deadline = new Date().toISOString();

    const scholarshipData = {
        url,
        name,
        deadline,
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

    });

});