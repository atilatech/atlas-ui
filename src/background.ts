// @ts-nocheck TEMP fix for TypeScript error in /home/runner/work/atlas-ui/atlas-ui/src/components/ScholarshipAddForm.tsx(29,7): 
// Cannot find name 'chrome'.  TS2304
import { RequestMessage } from "./models/ExtensionMessage";
export {}
chrome.runtime.onMessage.addListener((message: RequestMessage) => {
    console.log("Message received in background.js!", message);
});