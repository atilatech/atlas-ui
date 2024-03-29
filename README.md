# Atlas UI


The user interface (UI) for [Atlas](https://atlas.atila.ca/) and [Atlas browser extension](https://chrome.google.com/webstore/detail/atila-scholarship-helper/ippmodhmgofpojbjjcgpjelghailjomm?hl=en).


## Quickstart

`yarn install; yarn start` 

# Atlas Browser Extension

Chrome extension to save scholarships on any website and remind you when it's due

## Quickstart

`npm install`

To build the extension package: `npm run build:extension`
To build the deployment package: `npm run build:extension:prod`
To build the package on Windows: `npm run build:extension:windows`

To view as a regular react web app: `npm start`

(Note: None of the chrome.* API's will work when running as a regular react web app)

TODO: mock chrome.*

Visit [chrome://extensions](chrome://extensions) in Chrome browser and click load unpacked and select the `build/` folder


## Network Requests

To test out network requests like saving a scholarship make sure you have [atila-scholarship-bot](https://github.com/ademidun/atila-scholarship-bot/) running locally: 

- `cd <path_to>/atila-scholarship-bot`  
- `python api/api.py`

## Publishing new Packages to Chrome Extension Store

- Update the version number in `package.json`
- Build deployment package: `npm run build:extension:prod`
- Zip `zip -r build.zip build`
- [Upload package in Chrome web store developer dashboard](https://chrome.google.com/webstore/devconsole/7a52ab63-ca3c-4d48-bfe5-f84d1eb30423/ippmodhmgofpojbjjcgpjelghailjomm/edit/package)
- Follow instructions on page to submit for review

### Seeing Updated Changes
- To see updated changes you have to rebuild your app
- If you change something like manifest.json you will have to select the update button in the chrome extension panel as well

## To use Mock Data

1. Set `ATILA_MOCK_EXTENSION_DATA` to true in your local storage

1. Right click in your browser > Inspect > Application.

## Working with the Chrome Storage

1. Right click inspect to open Devtools

1. Paste any commands below into your console, don't forget to remove `REMOVE_IF_YOU_ARE_SURE.`

To view all the items in your storage:

```javascript
chrome.storage.local.get(null,function(items){
 console.log(items);
})
```

To delete all the items in your storage:

**Warning** This is a highly destrutive action. Make sure you are sure you want to do this.
```javascript
chrome.storage.REMOVE_IF_YOU_ARE_SURE.local.clear(function() {
    var error = chrome.runtime.lastError;
    if (error) {
        console.error(error);
    }
    alert('all items deleted!');
});
```

To delete specific key:

```javascript
chrome.storage.REMOVE_IF_YOU_ARE_SURE.local.remove(["savedScholarships"],function(){
 var error = chrome.runtime.lastError;
    if (error) {
        console.error(error);
        alert('all items deleted!');
    }
})
```

To delete a specific item at that key:

```javascript
chrome.storage.local.get({savedScholarships: {}}, function(items) {
    delete items.savedScholarships['scholarship_id_to_delete']
    console.log("items.savedScholarships", items.savedScholarships) // confirm that this looks like what you expect
    chrome.storage.REMOVE_IF_YOU_ARE_SURE.set(items, function() {
        alert('Item deleted!');
    });
});

```
