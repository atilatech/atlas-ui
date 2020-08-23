let page = document.getElementById('buttonDiv');
const kButtonColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1'];
constructOptions(kButtonColors);
createSavedScholarshipsList();
function createSavedScholarshipsList() {

    chrome.storage.sync.get("savedScholarships", function(items) {

        const savedScholarships = items.savedScholarships;

        if (!savedScholarships) {
            return
        }

        const container = document.getElementById('savedScholarshipsListContainer');
        const ul = document.createElement('ul');
        container.appendChild(ul); // append the created ul to the root

        savedScholarships.forEach(function(savedScholarship) {


            const li = document.createElement('li'); // create a new list savedScholarship

            li.innerHTML = `<a href="${savedScholarship.url}" target="_blank" rel="noopener noreferrer">
            ${savedScholarship.name}</a>
            <br/>
            Due: <small>(${savedScholarship.deadline})</small>`
            ul.appendChild(li);
        });
    });



}


function constructOptions(kButtonColors) {
    for (let item of kButtonColors) {
        let button = document.createElement('button');
        button.style.backgroundColor = item;
        button.addEventListener('click', function() {
            chrome.storage.sync.set({color: item}, function() {
            })
        });
        page.appendChild(button);
    }
}