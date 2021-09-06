createSavedScholarshipsList();



function createSavedScholarshipsList() {
    chrome.storage.sync.get("savedScholarships", function(syncData) {


        const container = document.getElementById('savedScholarshipsListContainer');

        const tableTitle = document.createElement("h1");
        tableTitle.innerText = "Saved Scholarships";
        tableTitle.classList.add("text-center");

        container.appendChild(tableTitle);

        const table = document.createElement('table');
        table.classList.add("table")

        const thead = document.createElement('thead');   
        let tr = document.createElement('tr');   

        const tableHeadingName = document.createElement('th');
        tableHeadingName.innerText = "Name";
        tr.appendChild(tableHeadingName);

        const tableHeadingDescription = document.createElement('th');
        const descriptionTextNode = document.createTextNode('Description');
        tableHeadingDescription.appendChild(descriptionTextNode);
        tr.appendChild(tableHeadingDescription);

        const tableHeadingNotes = document.createElement('th');
        const notesTextNode = document.createTextNode('Notes');
        tableHeadingNotes.appendChild(notesTextNode);
        tr.appendChild(tableHeadingNotes);

        const tableHeadingDeadline = document.createElement('th');
        const deadlineTextNode = document.createTextNode('Deadline');
        tableHeadingDeadline.appendChild(deadlineTextNode);
        tr.appendChild(tableHeadingDeadline);


        thead.appendChild(tr);
        table.appendChild(thead);


        const tbody = document.createElement('tbody');

        let {savedScholarships} = syncData;
        if (!savedScholarships) {
            savedScholarships = []
        }

        savedScholarships = savedScholarships.sort((a,b)=> {
            return a.dateAdded < b.dateAdded ? 1 : -1
        } );

        savedScholarships
        .forEach(function(savedScholarship) {
            let paragraph = document.createElement('p'); // create a new list savedScholarship

            paragraph.innerHTML = `<a href="${savedScholarship.url}" target="_blank" rel="noopener noreferrer">
            ${savedScholarship.name}</a>`

            tr = document.createElement('tr');
   
            const tdName = document.createElement('td');
            tdName.style.width = "300px";
            tdName.appendChild(paragraph);
            tr.appendChild(tdName);


            const tdDescription = document.createElement('td');
            tdDescription.style.width = "300px";
            const descriptionText = document.createTextNode(`${savedScholarship.description}`);
            tdDescription.appendChild(descriptionText);
            tr.appendChild(tdDescription);


            const tdNotes = document.createElement('td');
            tdNotes.style.width = "300px";
            const notesText = document.createTextNode(`${savedScholarship.notes}`);
            tdNotes.appendChild(notesText);
            tr.appendChild(tdNotes);


            const tdDeadline = document.createElement('td');
            const deadlineText = document.createTextNode(`${savedScholarship.deadline}`);
            tdDeadline.appendChild(deadlineText);
            tr.appendChild(tdDeadline);

            tbody.appendChild(tr);

        });

        table.appendChild(tbody);
        container.appendChild(table);
    });

}