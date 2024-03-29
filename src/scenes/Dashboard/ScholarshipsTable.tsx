import { useEffect, useState } from 'react';
import { SavedScholarships } from '../../models/AtilaStorageArea';
import { ChromeMock } from '../../services/ChromeMock';
import { Utils } from '../../services/Utils';
import StorageHelper, { ActionTypes } from '../../services/StorageHelper';
import './ScholarshipsTable.css';
import { ScholarshipTableRow } from './ScholarshipTableRow';

const scholarshipsTableId = "ScholarshipsTable";
function ScholarshipsTable() {
   // TODO instead of using hacky unions of 'any' everyhwere, find a way to ensure that performSavedScholarshipsAction only gets called with the Scholarship object type
    const [scholarships, setScholarships] = useState<SavedScholarships>({});

    /**
     * We use an empty dependency array [] to indicate we will only call this effect once
     * And we remove the listneer to clean up the hooks so we don't add a listener on each render
     * see: https://meerkat-citronella.github.io/jekyll/update/2020/10/01/welcome-to-jekyll.html#:~:text=In%20this%20update%2C%20we%20included%20a%20useEffect%20hook.
     */
    useEffect(() => {
        if(!chrome.storage) {
          // TODO find a way to globally use mock data for all chrome API calls if ATILA_MOCK_API_DATA === "true"
          if(localStorage.getItem("ATILA_MOCK_EXTENSION_DATA") === "true") {
            setScholarships(ChromeMock.storageData.savedScholarships ?? {});
          }
          return;
        }

        StorageHelper.performAction(ActionTypes.GET, "savedScholarships", null, (savedScholarships) => {
          setScholarships(savedScholarships as SavedScholarships);
        })

        const storageChangedListener = (storageChange: { [key: string]: chrome.storage.StorageChange }, areaName: chrome.storage.AreaName) => {
          const { savedScholarships } = storageChange;
          if (savedScholarships && savedScholarships.oldValue !== savedScholarships.newValue) {
            setScholarships(savedScholarships.newValue);
          }
        };
        chrome.storage.onChanged.addListener(storageChangedListener);
        return () => chrome.storage.onChanged.removeListener(storageChangedListener);
    }, []);

    const copyToClipBoard = () => {
      
      const toastTitle = "Copied scholarship table to clipboard";
      const toastBody = `Tip: Open <a href="https://sheets.new" target="_blank" rel="noopener noreferrer">
      sheets.new</a> and paste the copied table into a Google Spreadsheet`;

      Utils.copyToClipboard(document.getElementById(scholarshipsTableId)?.outerHTML?? "", toastTitle, toastBody);

    }

    return (
      <div>
          <h3 className="text-center mb-5">Saved Scholarships</h3>
          <table className="table overflow-scroll border" id={scholarshipsTableId}>
          <thead>
            <tr>
              <th scope="col" className="wide-column">Name</th>
              <th scope="col" className="wide-column">Description</th>
              <th scope="col" className="wide-column">Funding Amount</th>
              <th scope="col" className="wide-column">Notes</th>
              <th scope="col">Deadline</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
              {
                (Object.values(scholarships ?? {})).sort((a,b)=> (a?.date_created ?? "") < (b?.date_created ?? "") ? 1 : -1)
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