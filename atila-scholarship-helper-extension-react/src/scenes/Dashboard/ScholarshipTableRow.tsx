import { Scholarship } from '../../models/Scholarship';
import { ScholarshipUtils } from '../../services/ScholarshipUtils';
import { Utils } from '../../services/Utils';
import ScholarshipActions, { ActionTypes } from '../../state/Scholarship.actions';

interface ScholarshipTableRowProps {
  scholarship: Scholarship;
}
;

export function ScholarshipTableRow(props: ScholarshipTableRowProps) {

  const { scholarship } = props;

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
    ScholarshipActions.performAction(ActionTypes.DELETE, scholarship);
  };

  return (
    <tr id={scholarshipRowId}>
      <td>
        <a className="text-align-left" href={scholarship.scholarship_url} target="_blank" rel="noopener noreferrer">
          {scholarship.name}
        </a>
      </td>
      <td>{scholarship.description}</td>
      <td>{scholarship.notes}</td>
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
