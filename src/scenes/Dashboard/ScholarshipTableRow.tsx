import { Scholarship } from '../../models/Scholarship';
import { ScholarshipUtils } from '../../services/ScholarshipUtils';
import { Utils } from '../../services/Utils';
import StorageHelper, { ActionTypes } from '../../services/StorageHelper';
import { useState } from 'react';

interface ScholarshipTableRowProps {
  scholarship: Scholarship;
};

export function ScholarshipTableRow(props: ScholarshipTableRowProps) {

  const [scholarship, setScholarship] = useState<Scholarship>(props.scholarship);

  const [editingFields, setEditingFields] = useState<any>({
    description: false,
    notes: false,
  });

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

  const toggleEditingField = (field: string) => {
    if (editingFields[field]) {
      saveScholarship()
    }

    const newEditingFields = {
      ...editingFields,
      [field]: !(editingFields[field])
    }

    setEditingFields(newEditingFields)
  }

  const saveScholarship = () => {
    StorageHelper.performAction(ActionTypes.UPDATE, "savedScholarships", scholarship)
  }

  const renderEditableFields = Object.keys(editingFields).map(field => (
    <td>
        {editingFields[field] ? 
        <textarea rows={4} value={(scholarship as any)[field]} name={field} onChange={updateScholarship} className="form-control" placeholder={field} />
        :
        (scholarship as any)[field]
        }

        <button className="btn btn-link" onClick={()=>{toggleEditingField(field)}}>
          {editingFields[field] ? 'Save' : 'Edit'}
        </button>
    </td>
  ))

  return (
    <tr id={scholarshipRowId}>
      <td>
        <a className="text-align-left" href={scholarship.scholarship_url} target="_blank" rel="noopener noreferrer">
          {scholarship.name}
        </a>
      </td>

      {renderEditableFields}

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
