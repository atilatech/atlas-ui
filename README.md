# Atila Scholarship Helper Extension

Chrome extension to save scholarships on any website and remind you when it's due

## Quickstart

`npm install`

To build the extension package: `npm run build:extension`

To view as a regular react web app: `npm start`

(Note: None of the chrome.* API's will work when running as a regular react web app)

TODO: mock chrome.*

Visit [chrome://extensions](chrome://extensions) in Chrome browser and click load unpacked and select the `build/` folder

### Seeing Updated Changes
- To see updated changes you have to rebuild your app
- If you change something like manifest.json you will have to select the update button in the chrome extension panel as well

## To use Mock Data

1. Set `ATILA_MOCK_EXTENSION_DATA` to true in your local storage

1. Right click in your browser > Inspect > Application.

## Working with the Chrome Storage

1. Right click inspect to open Devtools

1. Paste any commands below into your console, don't forget to remove `REMOVE_IF_YOU_ARE_SURE.`

```javascript
chrome.storage.sync.get(null,function(items){
 console.log(items);
})
```

**Warning** This is a highly destrutive action. Make sure you intend to do this.
```javascript
chrome.storage.REMOVE_IF_YOU_ARE_SURE.sync.clear(function() {
    var error = chrome.runtime.lastError;
    if (error) {
        console.error(error);
    }
});
```

Or to delete specific key
```javascript
chrome.storage.REMOVE_IF_YOU_ARE_SURE.sync.remove(["savedScholarships"],function(){
 var error = chrome.runtime.lastError;
    if (error) {
        console.error(error);
    }
})`

```