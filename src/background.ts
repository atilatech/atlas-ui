import { RequestMessage } from "./models/ExtensionMessage";
export {}
// @ts-ignore: Cannot find name 'chrome'.
chrome.runtime.onMessage.addListener((message: RequestMessage) => {
    console.log("Message received in background.js!", message);
});