createSavedScholarshipsList();

function createSavedScholarshipsList() {

    chrome.storage.sync.get("savedScholarships", function(items) {

        const savedScholarships = items.savedScholarships;

        if (!savedScholarships) {
            return
        }

        const container = document.getElementById('savedScholarshipsListContainer');

        const table = document.createElement('table');
        table.classList.add("table")

        const thead = document.createElement('thead');   
        let tr = document.createElement('tr');   

        const th1 = document.createElement('th');
        const th2 = document.createElement('th');

        const text1 = document.createTextNode('Name');
        const text2 = document.createTextNode('Deadline');
        th1.appendChild(text1);
        th2.appendChild(text2);
        tr.appendChild(th1);
        tr.appendChild(th2);
        thead.appendChild(tr);
        table.appendChild(thead);


        const tbody = document.createElement('tbody');
        savedScholarships.forEach(function(savedScholarship) {
            let paragraph = document.createElement('p'); // create a new list savedScholarship

            paragraph.innerHTML = `<a href="${savedScholarship.url}" target="_blank" rel="noopener noreferrer">
            ${savedScholarship.name}</a>`

            tr = document.createElement('tr');   
            td1 = document.createElement('td');
            td2 = document.createElement('td');

            const deadlineText = document.createTextNode(`${savedScholarship.deadline}`);

            td1.appendChild(paragraph);
            td2.appendChild(deadlineText);
            tr.appendChild(td1);
            tr.appendChild(td2);

            tbody.appendChild(tr);

        });
        table.appendChild(tbody);
        container.appendChild(table);
    });



}