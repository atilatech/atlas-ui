import ScholarshipsTable from "./ScholarshipsTable";
import { Utils } from '../../services/Utils';

function DashBoard() {

    return (
        
        <div className="mt-3">
            <h1 className="text-center">
                Atila Scholarship Helper
            </h1>
            <div className="DashBoard container card shadow my-5 p-5">
                <ScholarshipsTable />
                <p className="text-center text-muted">
                Built by <a href="https://atila.ca" target="_blank" rel="noopener noreferrer">Atila</a> | Questions? Ask on <a href="https://www.reddit.com/r/atila/" target="_blank" rel="noopener noreferrer">r/atila</a> | Tell a Friend | View on <a href="https://chrome.google.com/webstore" target="_blank" rel="noopener noreferrer">Chrome Web Store</a>
                </p>
            </div>
        </div>
    );
}

export default DashBoard;