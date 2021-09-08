import { useEffect, useState } from 'react';
import { Scholarship } from '../../models/Scholarship';
import { ScholarshipUtils } from '../../services/ScholarshipUtils';
import { Utils } from '../../services/Utils';
import './ScholarshipsTable.css';

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
          return;
        }
        chrome.storage.sync.get("savedScholarships", (storageData) => {
              console.log({storageData});
              
              let savedScholarships = storageData.savedScholarships || [];
              setScholarships(savedScholarships);
        });
        // TODO types from @types/chrome: (storageChange: { [key: string]: StorageChange }, areaName: AreaName)
        const storageChangedListener = (storageChange: { [key: string]: any }, areaName: any) => {
          console.log({storageChange, areaName});
          const { savedScholarships } = storageChange;
          if (savedScholarships && savedScholarships.oldValue != savedScholarships.newValue) {
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
          <h3 className="text-center">Saved Scholarships</h3>

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

interface ScholarshipTableRowProps {
    scholarship: Scholarship
};

export function ScholarshipTableRow(props: ScholarshipTableRowProps) {

    const { scholarship } = props;

    const scholarshipRowId = `scholarship-row-${scholarship.id}`;
    const copyToClipBoardRowId = `copyToClipBoard-${scholarshipRowId}`;

    const copyToClipBoard = () => {
      
      const toastBody = `Tip: Open <a href="https://sheets.new" target="_blank" rel="noopener noreferrer">
      sheets.new</a> and paste the copied table into a Google Spreadsheet`;

      // Wrap the table row in a table element to preserve columns when pasting to a spreadsheet.
      const tableHtml = `<table>${document.getElementById(scholarshipRowId)?.outerHTML?? ""}</table>`;
      Utils.copyToClipboard(tableHtml, copyToClipBoardRowId, toastBody);

    }

    return (
        <tr id={scholarshipRowId}>
            <td>
              <a className="btn btn-link text-align-left" href={scholarship.scholarship_url} target="_blank" rel="noopener noreferrer">
                {scholarship.name}
              </a>
            </td>
            <td>{scholarship.description}</td>
            <td>{scholarship.notes}</td>
            <td>{scholarship.deadline}</td>
            <td className="text-center">
              <a className="btn btn-link" href={`${ScholarshipUtils.generateCalendarLink(scholarship)}`} target="_blank" rel="noopener noreferrer">
                Save to Calendar
              </a>
              <hr/>
              <a className="btn btn-link remove-in-clipboard" id={copyToClipBoardRowId} onClick={copyToClipBoard}>
                Copy
              </a>
              <hr/>
              <a className="btn btn-link text-danger remove-in-clipboard">
                Remove
              </a>
            </td>
        </tr>
    )
}

export default ScholarshipsTable;