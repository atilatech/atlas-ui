window.onload = function() {

    let optionsLink = document.getElementById('optionsLink');
    optionsLink.setAttribute("href", `chrome-extension://${chrome.runtime.id}/options.html`);

    let saveScholarshipButton = document.getElementById('saveScholarshipButton');
    saveScholarshipButton.addEventListener('click', function(event){

        chrome.tabs.executeScript({
                file: "saveScholarship.js"
            },
            (results) => {

                console.log({results});

                const savedScholarshipConfirmation = document.getElementById("savedScholarshipConfirmation");
                savedScholarshipConfirmation.style.display = "block";

            }
        );



    });

};
