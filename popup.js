window.onload = function() {

    const mainPageLink = document.getElementById('mainPageLink');
    const savedScholarshipConfirmation = document.getElementById("savedScholarshipConfirmation");
    const saveScholarshipButton = document.getElementById('saveScholarshipButton');
    const scholarshipDeadlineInput = document.getElementById('scholarshipDeadlineInput');


    mainPageLink.setAttribute("href", `chrome-extension://${chrome.runtime.id}/index.html`);
    saveScholarshipButton.addEventListener('click', function(event){
        triggerSaveScholarshipEvent()
    });


    function triggerSaveScholarshipEvent() {

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

            console.log("scholarshipDeadlineInput.value", scholarshipDeadlineInput.value);

            if (!scholarshipDeadlineInput.value) { //If it's an invalid date, this field will be blank
                savedScholarshipConfirmation.innerText = "Invalid date, please submit a valid date";
                return
            }
            const scholarship = {
                deadline: scholarshipDeadlineInput.value,
            };

            chrome.tabs.sendMessage(tabs[0].id, {messageType: "saveScholarship", scholarship}, function(response) {
                console.log({response});
                savedScholarshipConfirmation.innerText = "Scholarship saved!";
            });
        });

    }

};

