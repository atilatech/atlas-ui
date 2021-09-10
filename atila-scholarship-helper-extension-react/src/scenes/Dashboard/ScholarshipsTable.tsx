import { useEffect, useState } from 'react';
import { Scholarship } from '../../models/Scholarship';
import { ChromeMock } from '../../services/ChromeMock';
import { Utils } from '../../services/Utils';
import './ScholarshipsTable.css';
import { ScholarshipTableRow } from './ScholarshipTableRow';

// When running this project as a web app and not as a Chrome extension, we have to manually set the chrome environment variable
let chrome = window.chrome || {};

const scholarshipsTableId = "ScholarshipsTable";
function ScholarshipsTable() {
    const [scholarships, setScholarships] = useState<Scholarship[]>([]);

    /**
     * We use an empty dependency array [] to indicate we will only call this effect once
     * And we remove the listneer to clean up the hooks so we don't add a listener on each render
     * see: https://meerkat-citronella.github.io/jekyll/update/2020/10/01/welcome-to-jekyll.html#:~:text=In%20this%20update%2C%20we%20included%20a%20useEffect%20hook.
     */
    useEffect(() => {
        if(!chrome.storage) {
          // TODO find a way to globally use mock data for all chrome API calls if ATILA_MOCK_API_DATA === "true"
          if(localStorage.getItem("ATILA_MOCK_EXTENSION_DATA") === "true") {
            setScholarships(ChromeMock.storageData.savedScholarships ?? []);
          }
          return;
        }
        chrome.storage.sync.get("savedScholarships", (storageData: {[key: string]: any}) => {
              console.log({storageData});
              
              let savedScholarships = storageData.savedScholarships || [];
              setScholarships(savedScholarships);
        });
        // TODO types from @types/chrome: (storageChange: { [key: string]: StorageChange }, areaName: AreaName)
        const storageChangedListener = (storageChange: { [key: string]: chrome.storage.StorageChange }, areaName: chrome.storage.AreaName) => {
          console.log({storageChange, areaName});
          const { savedScholarships } = storageChange;
          if (savedScholarships && savedScholarships.oldValue !== savedScholarships.newValue) {
            setScholarships(savedScholarships.newValue);
          }
        };
        chrome.storage.onChanged.addListener(storageChangedListener);
        return () => chrome.storage.onChanged.removeListener(storageChangedListener);
    }, []);

    const copyToClipBoard = () => {
      
      const toastBody = `Tip: Open <a href="https://sheets.new" target="_blank" rel="noopener noreferrer">
      sheets.new</a> and paste the copied table into a Google Spreadsheet`;

      Utils.copyToClipboard(document.getElementById(scholarshipsTableId)?.outerHTML?? "", "copyAllScholarshipsToClipBoard", toastBody);

    }

    return (
      <div>
          <h3 className="text-center mb-5">Saved Scholarships</h3>

          <table className="table" id={scholarshipsTableId}>
          <thead>
            <tr>
              <th scope="col" className="wide-column">Name</th>
              <th scope="col" className="wide-column">Description</th>
              <th scope="col" className="wide-column">Notes</th>
              <th scope="col">Deadline</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
              {
                (scholarships ?? []).sort((a,b)=> (a?.date_created ?? "") < (b?.date_created ?? "") ? 1 : -1)
                .map(scholarship => <ScholarshipTableRow scholarship={scholarship} key={scholarship.id} />)
              }
          </tbody>
        </table>

        <button id="copyAllScholarshipsToClipBoard" onClick={copyToClipBoard} className="btn btn-outline-primary">
          Copy to ClipBoard
        </button>

      </div>
    );
}

export default ScholarshipsTable;