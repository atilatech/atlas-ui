import { useEffect, useState } from 'react';
import { LoadParentPageRequest, ResponseMessage } from '../models/ExtensionMessage';
import { Scholarship } from '../models/Scholarship';
import StorageHelper, { ActionTypes } from '../services/StorageHelper';
// @ts-ignore TEMP: netlify deploy builds are failing because of Could not find a declaration file for module 'react-datepicker'. TS7016
import ReactDatePicker from "react-datepicker";
import "./ScholarshipAddForm.css"

// When running this project as a web app and not as a Chrome extension, we have to manually set the chrome environment variable
// @ts-ignore TEMP: netlify deploy builds are failing because of Could not find a declaration file for module 'react-datepicker'. TS7016
const chrome: Window["chrome"] = window.chrome || {};
const titleIndex = 0;
export const ScholarshipAddForm = () => {

  const [scholarship, setScholarship] = useState(new Scholarship());
  const [isSavedScholarship, setIsSavedScholarship] = useState(false);

  useEffect(() => {
    loadParentPageData();
  }, []);

  const loadParentPageData = () => {
    const getTitleRequest: LoadParentPageRequest = {
      type: "LOAD_PARENT_PAGE",
      data: {
        titleIndex
      }
    }

    if (chrome.tabs) {//for use in non chrom extension environments

      chrome.tabs.query({active: true, currentWindow: true}, (tabs : any) => {
          const tabId = tabs[0].id ?? 0;

            chrome.tabs.sendMessage(tabId, getTitleRequest, (response: ResponseMessage) => {
              // the content script sendResponse serializes the deadline and converts it from a Date to a JSON so we must conver it back
                setScholarship(response.data.scholarship);
            });
      });
    }
  }

  const onUpdateScholarship = (event: any) => {
    let value = event.target.value;
    const name = event.target.name;

    console.log({name, value});

    if (name === "deadline" && value instanceof Date) {
      value = value.toISOString();

      console.log("deadline: ", {name, value});
    }
    const updatedScholarship = {
      ...scholarship,
      [name]: value,
    }
    setScholarship(updatedScholarship);
  };

  const onSaveScholarship = () => {
    StorageHelper.performAction(ActionTypes.ADD, "savedScholarships", Object.assign({}, scholarship), savedScholarships => {
      setIsSavedScholarship(true);
    });
  };

  const deadlineDate = new Date(scholarship.deadline)

  return (
    <div className="ScholarshipAddForm m-1">
    <label htmlFor="scholarshipNameInput">Name</label>
    <textarea value={scholarship.name} name="name"  onChange={onUpdateScholarship} className="form-control mb-3" id="scholarshipNameInput" placeholder="Name">
    </textarea> 
   
   <label htmlFor="scholarshipDescriptionInput">Description</label>
   <textarea value={scholarship.description} name="description" onChange={onUpdateScholarship} id="scholarshipDescriptionInput" className="form-control mb-3" placeholder="Description" rows={2}></textarea>
   
   <label htmlFor="scholarshipFundingAmountInput">Funding Amount</label>
   <input value={scholarship.funding_amount} name="funding_amount" onChange={onUpdateScholarship} id="scholarshipFundingAmountInput" className="form-control mb-3" placeholder="Funding Amount" type="number"></input>

   <label htmlFor="scholarshipNotesInput">Notes</label>
   <textarea value={scholarship.notes} name="notes" onChange={onUpdateScholarship} id="scholarshipNotesInput" className="form-control mb-3" placeholder="Notes" rows={2}></textarea>
   
   <label htmlFor="scholarshipDeadlineInput">Deadline</label>
   <ReactDatePicker
          selected={deadlineDate}
          onChange={(date: any) => onUpdateScholarship({target: {value: date, name: 'deadline'}})}
          showTimeSelect
          showMonthDropdown
          showYearDropdown
          timeFormat="h:mm aa"
          timeIntervals={60}
          timeCaption="Time"
          dateFormat="MMMM d, yyyy h:mm aa"
          className="col-12"
        />

   {isSavedScholarship ?
    <p className='text-success'>
       Scholarship saved!
     </p>
   :
     <button onClick={onSaveScholarship} className="btn btn-primary m-1">
       Save
     </button>
   }


    <hr/>
    <a href={`chrome-extension://${chrome?.runtime?.id}/index.html`} target="_blank" rel="noopener noreferrer">
      See all Saved Scholarships
    </a>
 </div>
)
}

export default ScholarshipAddForm;