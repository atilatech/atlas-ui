import { RequestMessage } from "./models/ExtensionMessage";
export {}

chrome.runtime.onMessage.addListener((message: RequestMessage) => {
    console.log("Message received in background.js!", message);
});