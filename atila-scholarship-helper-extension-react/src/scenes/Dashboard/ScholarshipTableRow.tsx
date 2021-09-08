import { Scholarship } from '../../models/Scholarship';
import { ScholarshipUtils } from '../../services/ScholarshipUtils';
import { Utils } from '../../services/Utils';

interface ScholarshipTableRowProps {
  scholarship: Scholarship;
}
;

export function ScholarshipTableRow(props: ScholarshipTableRowProps) {

  const { scholarship } = props;

  const scholarshipRowId = `scholarship-row-${scholarship.id}`;
  const copyToClipBoardRowId = `copyToClipBoard-${scholarshipRowId}`;

  const copyToClipBoard = () => {

    const toastBody = `Tip: Open <a href="https://sheets.new" target="_blank" rel="noopener noreferrer">
      sheets.new</a> and paste the copied table into a Google Spreadsheet`;

    // Wrap the table row in a table element to preserve columns when pasting to a spreadsheet.
    const tableHtml = `<table>${document.getElementById(scholarshipRowId)?.outerHTML ?? ""}</table>`;
    Utils.copyToClipboard(tableHtml, copyToClipBoardRowId, toastBody);

  };

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
        <hr />
        <a className="btn btn-link remove-in-clipboard" id={copyToClipBoardRowId} onClick={copyToClipBoard}>
          Copy
        </a>
        <hr />
        <a className="btn btn-link text-danger remove-in-clipboard">
          Remove
        </a>
      </td>
    </tr>
  );
}
