import { useEffect, useState } from 'react';
import { Scholarship } from '../../models/Scholarship';
import { ScholarshipUtils } from '../../services/ScholarshipUtils';

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
        chrome.storage.sync.get("savedScholarships", function(storageData) {
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

    return (
        <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Notes</th>
            <th scope="col">Deadline</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
            {scholarships.map(scholarship => <ScholarshipTableRow scholarship={scholarship} key={scholarship.id} />)}
        </tbody>
      </table>
    );
}

interface ScholarshipTableRowProps {
    scholarship: Scholarship
};

export function ScholarshipTableRow(props: ScholarshipTableRowProps) {

    const { scholarship } = props;

    return (
        <tr>
            <td>{scholarship.name}</td>
            <td>{scholarship.description}</td>
            <td>{scholarship.notes}</td>
            <td>{scholarship.deadline}</td>
            <td>
              <a className="btn btn-link" href={`${ScholarshipUtils.generateCalendarLink(scholarship)}`} target="_blank" rel="noopener noreferrer">
                Save to Calendar
              </a>
              <a className="btn btn-link">
                Copy
              </a>
              <a className="btn btn-link text-danger">
                Remove
              </a>
            </td>
        </tr>
    )
}

export default ScholarshipsTable;