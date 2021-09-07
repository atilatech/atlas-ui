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
        tableHeadingName.style.width = "300px";
        tableHeadingName.innerText = "Name";
        tr.appendChild(tableHeadingName);

        const tableHeadingDescription = document.createElement('th');
        const descriptionTextNode = document.createTextNode('Description');
        tableHeadingDescription.style.width = "300px";
        tableHeadingDescription.appendChild(descriptionTextNode);
        tr.appendChild(tableHeadingDescription);

        const tableHeadingNotes = document.createElement('th');
        const notesTextNode = document.createTextNode('Notes');
        tableHeadingNotes.style.width = "300px";
        tableHeadingNotes.appendChild(notesTextNode);
        tr.appendChild(tableHeadingNotes);

        const tableHeadingDeadline = document.createElement('th');
        const deadlineTextNode = document.createTextNode('Deadline');
        tableHeadingDeadline.appendChild(deadlineTextNode);
        tr.appendChild(tableHeadingDeadline);

        const tableHeadingActions = document.createElement('th');
        tableHeadingActions.innerText = "Actions";
        tr.appendChild(tableHeadingActions);


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

        console.log({savedScholarships});

        savedScholarships
        .forEach(function(savedScholarship) {
            let paragraph = document.createElement('p'); // create a new list savedScholarship

            paragraph.innerHTML = `<a href="${savedScholarship.url}" target="_blank" rel="noopener noreferrer">
            ${savedScholarship.name}</a>`

            tr = document.createElement('tr');
   
            const tdName = document.createElement('td');
            tdName.appendChild(paragraph);
            tr.appendChild(tdName);


            const tdDescription = document.createElement('td');
            tdDescription.innerText = savedScholarship.description;
            tr.appendChild(tdDescription);


            const tdNotes = document.createElement('td');
            tdNotes.innerText = savedScholarship.notes;
            tr.appendChild(tdNotes);


            const tdDeadline = document.createElement('td');
            tdDeadline.innerText = savedScholarship.deadline;
            tr.appendChild(tdDeadline);
   
            const tdActions = document.createElement('td');

            let saveToCalendarLink = document.createElement('a'); // create a new list savedScholarship
            saveToCalendarLink.classList.add("btn")
            saveToCalendarLink.classList.add("btn-link")
            saveToCalendarLink.href = generateCalendarLink(savedScholarship);
            saveToCalendarLink.target = "_blank";
            saveToCalendarLink.rel = "noopener noreferrer";
            saveToCalendarLink.innerHTML = "Save to Calendar";

            saveToCalendarLink.addEventListener('click', function(event){
                onSaveToCalendar(savedScholarship);
            });

            tdActions.appendChild(saveToCalendarLink);

            let sendNotificationButton = document.createElement('a');
            sendNotificationButton.classList.add("btn")
            sendNotificationButton.classList.add("btn-link")
            sendNotificationButton.innerHTML = "Remind Me";

            sendNotificationButton.addEventListener('click', function(event){
                onCreateScholarshipNotification(savedScholarship);
            });

            tdActions.appendChild(sendNotificationButton);
            tr.appendChild(tdActions);



            tbody.appendChild(tr);

        });

        table.appendChild(tbody);
        container.appendChild(table);


        
        const copyToClipBoardButton = document.getElementById('copyToClipBoardButton');

        copyToClipBoardButton.addEventListener('click', function(event){
            copyTableToClipBoard(table.outerHTML);
        });
    });

}

function onSaveToCalendar(scholarship){
    // sync that this scholarship has already been saved to calendar
    // Then render the deadline date instead: 
    // e.g. https://calendar.google.com/calendar/u/0/r/day/2021/9/15
    console.log("onSaveToCalendar");
    console.log({scholarship});
}

function onCreateScholarshipNotification(scholarship){
    console.log("onCreateScholarshipNotification");
    chrome.runtime.sendMessage('', {
        type: 'notification',
        options: {
            title: scholarship.name,
            message: scholarship.description,
            iconUrl: "images/atila-logo-blue_128.png",
            type: 'basic',
            buttons: [
                {
                    title: 'View Scholarship'
                },
                {
                    title: 'Visit Atila'
                }
            ]
        },
        scholarship
      });
}

/**
 * @see: https://github.com/InteractionDesignFoundation/add-event-to-calendar-docs/blob/main/services/google.md
 * @see: https://stackoverflow.com/a/23495015
 * @param {*} scholarship 
 */
function generateCalendarLink(scholarship) {
    // %0A%0A = new line
    const eventDetails = `${scholarship.description}%0D%0A%0D%0A${scholarship.url}%0D%0A%0D%0A${scholarship.notes}`;

    // Google Calendar deadline Expects the following format: YYYYMMDDTHHmmSSZ
    // Deadline is in the format 2021-09-06T15:17:00.000Z, we want: 20131206T050000Z
    let deadline = scholarship.deadline.replace("-", "").replace(":", "").replace("-", "").substring(0,16);

    const calendarUrlBase = `https://www.google.com/calendar/render`
    const calendarUrl = `${calendarUrlBase}?action=TEMPLATE&text=${scholarship.name}&dates=${deadline}/${deadline}&location=${scholarship.url}&details=${eventDetails}`

    return calendarUrl;
}

/**
 * @see: https://stackoverflow.com/a/50067769/14874841
 * @see: https://stackoverflow.com/a/2044793 
 * The second link is an alternative method that we were originally going to use, 
 * that method preserves bootstrap styling (good or bad?) but the code was also very long and seemed overcomplicated.
 * @param {*} el 
 */
function copyTableToClipBoard(elementHTML) {
	function listener(e) {
        e.clipboardData.setData("text/html", elementHTML);
        e.clipboardData.setData("text/plain", elementHTML);
        e.preventDefault();
    }
    document.addEventListener("copy", listener);
    document.execCommand("copy");
    document.removeEventListener("copy", listener);

    const toastElement = document.createElement("div");
    
    const toastElementAttributes = { 
        "class": "toast mt-3",
        "role": "alert",
        "aria-live": "assertive",
        "aria-atomic": "true",
        "id": "copyToClipBoardToast",
        "data-bs-delay": "3000",
    };

    setAttributes(toastElement, toastElementAttributes);
    toastElement.innerHTML = `
    <div class="toast-header">
            <strong class="me-auto">Copied Table to Clipboard!</strong>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body">
      Hint: open <a href="https://sheets.new" target="_blank" rel="noopener noreferrer">
      sheets.new</a> and paste the table into a Google Spreadsheet
    </div>
    `

    const container = document.getElementById("parentContainer");
    container.append(toastElement);

    const myToast = bootstrap.Toast.getOrCreateInstance(toastElement);

    myToast.show();
    
}

function setAttributes(el, attrs) {
    for(var key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
  }