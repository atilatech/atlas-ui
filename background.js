chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: {schemes: ["https"]},
            })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
    chrome.contextMenus.create({
        title: "Save Scholarship: %s",
        contexts:["link"],
        id: "previousAnswers",
    });
    chrome.contextMenus.create({
        title: "Search Atila: %s",
        contexts:["link", "selection"],
        id: "searchText",
    });
});

function getword(info,tab) {
    chrome.tabs.create({
        url: "https://atila.ca/search?q=" + info.selectionText
    });
}

chrome.contextMenus.onClicked.addListener(getword);

chrome.runtime.onMessage.addListener(request => {

    const { scholarship } = request;
    if (request.type === 'notification') {
      chrome.notifications.create(`upcoming-deadline__${scholarship.id}`, request.options);
    }
});

chrome.notifications.onButtonClicked.addListener((notificationId, buttonIndex) => {
    console.log("chrome.notifications.onButtonClicked");
    console.log({notificationId, buttonIndex})
})