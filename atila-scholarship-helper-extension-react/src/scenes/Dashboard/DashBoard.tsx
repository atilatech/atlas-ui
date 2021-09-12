import ScholarshipsTable from "./ScholarshipsTable";
import { Utils } from '../../services/Utils';
import { Constants } from "../../models/Constants";

function DashBoard() {

    const copyToClipBoard = () => {

        const toastBody = `The link to the Atila Scholarship Helper Chrome Extension has been copied to your clipboard!`;

        const contentToCopy = `Hey, check out this chrome extension that allows you to save scholarships you find online:

${Constants.EXTENSION_CHROME_WEBSTORE_LINK}`;
                
        Utils.copyToClipboard(contentToCopy, copyToClipBoardRowId, toastBody);
    
     }; 

     const copyToClipBoardRowId = "copyChromeWebstoreLinkToClipBoard";

    return (
        
        <div className="mt-3">
            <h1 className="text-center">
                Atila Scholarship Helper
            </h1>
            <div className="DashBoard container card shadow my-5 p-5">
                <ScholarshipsTable />
                <p className="text-center text-muted">
                Built by <a href="https://atila.ca" target="_blank" rel="noopener noreferrer">Atila</a> | Questions? Ask on <a href="https://www.reddit.com/r/atila/" target="_blank" rel="noopener noreferrer">r/atila</a> |<button className="btn btn-link remove-in-clipboard" id={"copyChromeWebstoreLinkToClipBoard"} onClick={copyToClipBoard}>Tell a Friend</button> | View on <a href="https://chrome.google.com/webstore" target="_blank" rel="noopener noreferrer">Chrome Web Store</a>
                </p>
            </div>
        </div>
    );
}

export default DashBoard;