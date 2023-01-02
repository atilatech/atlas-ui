import { RequestMessage } from "./models/ExtensionMessage";
export {}
// When running this project as a web app and not as a Chrome extension, we have to manually set the chrome environment variable
const chrome: Window["chrome"] = window.chrome || {};
chrome.runtime.onMessage.addListener((message: RequestMessage) => {
    console.log("Message received in background.js!", message);
});