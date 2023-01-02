import { Scholarship } from '../../models/Scholarship';
import { ScholarshipUtils } from '../../services/ScholarshipUtils';
import { Utils } from '../../services/Utils';
import StorageHelper, { ActionTypes } from '../../services/StorageHelper';
import { useState } from 'react';
import ReactDatePicker from 'react-datepicker';

interface ScholarshipTableRowProps {
  scholarship: Scholarship;
};

export function ScholarshipTableRow(props: ScholarshipTableRowProps) {

  const [scholarship, setScholarship] = useState<Scholarship>(props.scholarship);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const editableFields = ['name', 'description', 'funding_amount', 'notes', 'deadline']

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
    let value = event.target.value;
      const name = event.target.name;

      if (name === "deadline" && value instanceof Date) {
        value = value.toISOString();
      }
      const editedScholarship = {
        ...scholarship,
        [name]: value,
      }

    setScholarship(editedScholarship)
  } 

  const saveScholarship = () => {
    StorageHelper.performAction(ActionTypes.UPDATE, "savedScholarships", scholarship)
  }

  const toggleIsEditing = () => {
    if (isEditing) {
      saveScholarship()
    }
    setIsEditing(!isEditing)
  }


  const deadlineDate = new Date(scholarship.deadline)

  const renderEditableFields = editableFields.map(field => {
    if (!isEditing) {
      switch (field) {
        case "name":
          return (
            <td key={field}>
              <a className="text-align-left" href={scholarship.scholarship_url} target="_blank" rel="noopener noreferrer">
                {scholarship.name}
              </a>
            </td>
          )
        case "funding_amount":
          return (
            <td key={field}>{scholarship.funding_amount && Utils.formatCurrency(scholarship.funding_amount)}</td>
          )
        case "deadline":
          return (
            <td key={field}>{scholarship.deadline && Utils.formatDate(scholarship.deadline)}</td>
          )
        case "scholarship_url":
            return (
              <td key={field}>
                <a className="text-align-left" href={scholarship.scholarship_url} target="_blank" rel="noopener noreferrer">
                  {scholarship.name}
                </a>
              </td>
            )
        default:
          return (<td key={field}>{(scholarship as any)[field]}</td>)
      }
    }

    if (field === 'deadline') {
      return (
        <td>
          <ReactDatePicker
          selected={deadlineDate}
          onChange={(date: any) => updateScholarship({target: {value: date, name: 'deadline'}})}
          showTimeSelect
          showMonthDropdown
          showYearDropdown
          timeFormat="h:mm aa"
          timeIntervals={60}
          timeCaption="Time"
          dateFormat="MMMM d, yyyy h:mm aa"
        />
        </td>
      )
    }

    if (field === 'funding_amount') {
      return (
        <td>
          <input value={scholarship.funding_amount} name="funding_amount" onChange={updateScholarship} className="form-control" type="number" />
        </td>
      )
    }

    return (
      <td>
        <textarea rows={4} value={(scholarship as any)[field]} name={field} onChange={updateScholarship} className="form-control" placeholder={field} />
      </td>
    )
})


  return (
    <tr id={scholarshipRowId} className="ScholarshipTableRow">

      {renderEditableFields}

      <td className="text-center">
        <button className="btn btn-link" onClick={toggleIsEditing}>
          {isEditing ? 'Save' : 'Edit'}
        </button>
        <hr />
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