import ScholarshipsTable from "./ScholarshipsTable";
import { Utils } from '../../services/Utils';
import { Constants } from "../../models/Constants";
import { GeneralNotesAddEdit } from "./GeneralNotesAddEdit";

function DashBoard() {

    const copyToClipBoard = () => {

        const toastTitle = "Link to Chrome Extension has been copied to your clipboard";
        const toastBody = "Paste the link in your message to a friend and they can install this extension in the Chrome store.";

        // Don't indent ${Constants.EXTENSION_CHROME_WEBSTORE_LINK} in the code because the pasted value will also have a weird hanging indent.
        const contentToCopy = `Hey, check out this chrome extension that allows you to save scholarships you find online:

${Constants.EXTENSION_CHROME_WEBSTORE_LINK}`;
                
        Utils.copyToClipboard(contentToCopy, toastTitle, toastBody);
    
     }; 

    return (
        
        <div className="mt-3">
            <h1 className="text-center">
                Atila Scholarship Helper
            </h1>
            <div className="DashBoard container card shadow my-5 p-5">
                <GeneralNotesAddEdit />
                <ScholarshipsTable />
                <p className="text-center text-muted">
                Built by <a href="https://atila.ca" target="_blank" rel="noopener noreferrer">Atila</a> | Questions? Ask on <a href="https://www.reddit.com/r/atila/" target="_blank" rel="noopener noreferrer">r/atila</a> |<button className="btn btn-link remove-in-clipboard" id={"copyChromeWebstoreLinkToClipBoard"} onClick={copyToClipBoard}>Tell a Friend</button> | View on <a href="https://chrome.google.com/webstore" target="_blank" rel="noopener noreferrer">Chrome Web Store</a>
                </p>
            </div>
        </div>
    );
}

export default DashBoard;