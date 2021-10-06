import { Scholarship } from '../../models/Scholarship';
import { ScholarshipUtils } from '../../services/ScholarshipUtils';
import { Utils } from '../../services/Utils';
import StorageHelper, { ActionTypes } from '../../services/StorageHelper';
import { useState } from 'react';

interface ScholarshipTableRowEditProps {
  scholarship: Scholarship;
}
;

export function ScholarshipTableRowEdit(props: ScholarshipTableRowEditProps) {

  const { scholarship: defaultScholarship } = props;
  const [scholarship, setScholarship] = useState<Scholarship>(defaultScholarship)

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

  const removeScholarship = () => {
    StorageHelper.performAction(ActionTypes.DELETE, "savedScholarships", scholarship);
  };

  const updateScholarship = (event: any) => {      
    const editedScholarship = {
      ...scholarship,
      [event.target.name]: event.target.value,
    }

    setScholarship(editedScholarship)
  }

  return (
    <tr id={scholarshipRowId}>
      <td>
        <textarea rows={4} value={scholarship.name} onChange={updateScholarship} className="form-control" placeholder="Name" />
      </td>
      <td>
        <textarea rows={4} value={scholarship.description} onChange={updateScholarship} className="form-control" placeholder="Description" />      
      </td>
      <td>
        <textarea rows={4} value={scholarship.notes} onChange={updateScholarship} className="form-control" placeholder="Notes" />      
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
