window.onload = function() {

    const mainPageLink = document.getElementById('mainPageLink');
    const saveScholarshipResponse = document.getElementById("saveScholarshipResponse");
    const saveScholarshipButton = document.getElementById('saveScholarshipButton');


    const scholarshipDeadlineInput = document.getElementById('scholarshipDeadlineInput');
    const scholarshipNameInput = document.getElementById('scholarshipNameInput');
    const scholarshipDescriptionInput = document.getElementById('scholarshipDescriptionInput');
    const scholarshipNotesInput = document.getElementById('scholarshipNotesInput');

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {messageType: "loadPageContent"}, (response) => {
            console.log({response});
            initializeForm(response)
        });
    });

    mainPageLink.setAttribute("href", `chrome-extension://${chrome.runtime.id}/index.html`);
    saveScholarshipButton.addEventListener('click', function(event){
        triggerSaveScholarshipEvent()
    });


    function triggerSaveScholarshipEvent() {

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

            console.log("scholarshipDeadlineInput.value", scholarshipDeadlineInput.value);

            if (!scholarshipDeadlineInput.value) { //If it's an invalid date, this field will be blank
                saveScholarshipResponse.innerText = "Invalid date, please submit a valid date";
                return
            }

            console.log("scholarshipDescriptionInput.value", scholarshipDescriptionInput.value);

            const scholarship = {
                name: scholarshipNameInput.value,
                description: scholarshipDescriptionInput.value,
                notes: scholarshipNotesInput.value,
                deadline: new Date(scholarshipDeadlineInput.value).toISOString(),
            };

            console.log({scholarship});

            chrome.tabs.sendMessage(tabs[0].id, {messageType: "saveScholarship", scholarship}, function(response) {
                console.log({response});
                saveScholarshipResponse.innerText = "Scholarship saved!";
                saveScholarshipResponse.style.display = "block";
                saveScholarshipButton.style.display = "none";
            });
        });

    }

    
    function initializeForm(scholarship) {
        console.log({scholarship});
    
        // https://stackoverflow.com/a/61082536
        const now = new Date();
        // set default time to 11:59PM of current date
        now.setUTCHours(23,59,59,999);
        scholarshipDeadlineInput.value = now.toISOString().slice(0,16);
        scholarshipNameInput.value = scholarship.name;
        scholarshipDescriptionInput.value = scholarship.description;
    }

};

