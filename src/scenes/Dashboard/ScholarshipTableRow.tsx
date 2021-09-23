import { Scholarship } from '../../models/Scholarship';
import { ScholarshipUtils } from '../../services/ScholarshipUtils';
import { Utils } from '../../services/Utils';
import StorageHelper, { ActionTypes } from '../../services/StorageHelper';
import { useState } from 'react';
import { SavedScholarships } from '../../models/AtilaStorageArea';
import { useEffect} from 'react';

interface ScholarshipTableRowProps {
  scholarship: Scholarship;
}
;

export function ScholarshipTableRow(props: ScholarshipTableRowProps) {

  const [scholarship, setScholarship] = useState<Scholarship>(props.scholarship);
  const [isEditingNotes, setIsEditingNotes] = useState<boolean>(false);
  const [isEditingDescription, setIsEditingDescription] = useState<boolean>(false);

  const scholarshipRowId = `scholarship-row-${scholarship.id}`;
  const copyToClipBoardRowId = `copyToClipBoard-${scholarshipRowId}`;

  const copyToClipBoard = () => {

    const toastTitle = `Copied <strong style="display: contents">${Utils.truncateText(scholarship.name, 50)}</strong> to clipboard`;

    const toastBody = `Tip: Open <a href="https://sheets.new" target="_blank" rel="noopener noreferrer">
      sheets.new</a> and paste the copied table into a Google Spreadsheet`;

    // Wrap the table row in a table element to preserve columns when pasting to a spreadsheet.
    const tableHtml = `<table>${document.getElementById(scholarshipRowId)?.outerHTML ?? ""}</table>`;
    Utils.copyToClipboard(tableHtml, toastTitle, toastBody);

  };

  const onUpdateScholarship = (event: any) => {

    console.log({event});
    console.log("typeof event", typeof event)

    const value: string =  event!.target!.value;
    const updatedScholarship = {
        ...scholarship,
        [event.target.name]: value,
    }

    setScholarship(updatedScholarship);
    StorageHelper.performAction(ActionTypes.UPDATE, "savedScholarships", updatedScholarship)

};

    const toggleEditingNotes = () => {
      setIsEditingNotes(!isEditingNotes);
}

const toggleEditingDescription = () => {
  setIsEditingDescription(!isEditingDescription);
}

  const removeScholarship = () => {
    StorageHelper.performAction(ActionTypes.DELETE, "savedScholarships", scholarship);
  };

  return (
    <tr id={scholarshipRowId}>
      <td>
        <a className="text-align-left" href={scholarship.scholarship_url} target="_blank" rel="noopener noreferrer">
          {scholarship.name}
        </a>
      </td>
      <td>
      <div style={{height: "100px", overflow: "auto"}}>
            { isEditingDescription ?
            <textarea value={scholarship.description} name="description" onChange={onUpdateScholarship} 
            id="scholarshipDescriptionInput" className="form-control mb-3" placeholder="Description" rows={3}></textarea>
            :

            <div style={{ whiteSpace: "pre-line"}}>
                {scholarship.description}
            </div>
            }

        </div>
        <button onClick={toggleEditingDescription} className="btn btn-link">
        { isEditingDescription ? "View Description" : "Edit Description"}
        </button>
        </td>
      <td>
      <div style={{height: "100px", overflow: "auto"}}>
            { isEditingNotes ?
            <textarea value={scholarship.notes} name="notes" onChange={onUpdateScholarship} 
            id="scholarshipNotesInput" className="form-control mb-3" placeholder="Notes" rows={3}></textarea>
            :

            <div style={{ whiteSpace: "pre-line"}}>
                {scholarship.notes}
            </div>
            }

        </div>
        <button onClick={toggleEditingNotes} className="btn btn-link">
        { isEditingNotes ? "View Notes" : "Edit Notes"}
        </button>
      </td>
      <td>{scholarship.deadline}</td>
      <td className="text-center">
        <a href={`${ScholarshipUtils.generateCalendarLink(scholarship)}`} target="_blank" rel="noopener noreferrer">
          Save to Calendar
        </a>
        <hr />
        <button className="btn btn-link remove-in-clipboard" id={copyToClipBoardRowId} onClick={copyToClipBoard}>
          Copy
        </button>
        <hr />
        <button className="btn btn-link text-danger remove-in-clipboard" onClick={removeScholarship}>
          Remove
        </button>
      </td>
    </tr>
  );
}
