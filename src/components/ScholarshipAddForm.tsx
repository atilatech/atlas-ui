import { Component } from 'react'
import { LoadParentPageRequest, ResponseMessage } from '../models/ExtensionMessage';
import { Scholarship } from '../models/Scholarship';
import StorageHelper, { ActionTypes } from '../services/StorageHelper';
import ReactDatePicker from "react-datepicker";
import "./ScholarshipAddForm.css"

export class ScholarshipAddForm extends Component<{}, { titleIndex: number, title: string, scholarship: Scholarship, isSavedScholarship: boolean  }>  {

  constructor(props: any) {
    super(props)
  
    this.state = {
       titleIndex: 0,
       title: "",
       scholarship: new Scholarship(),
       isSavedScholarship: false,
    }
    
  }

    componentDidMount(){
      this.loadParentPageData()
    }
  
    loadParentPageData = () => {
      const { titleIndex } = this.state;
      const getTitleRequest: LoadParentPageRequest = {
        type: "LOAD_PARENT_PAGE",
        data: {
          titleIndex: titleIndex
        }
      }
      if (chrome.tabs) {//for use in non chrom extension environments
        chrome.tabs.query({active: true, currentWindow: true}, (tabs : any) => {
            const tabId = tabs[0].id ?? 0;
              chrome.tabs.sendMessage(tabId, getTitleRequest, (response: ResponseMessage) => {
                // the content script sendResponse serializes the deadline and converts it from a Date to a JSON so we must conver it back
                  this.setState({scholarship: response.data.scholarship})
              });
        });
      }
    }

    onUpdateScholarship = (event: any) => {
      
      let value = event.target.value;
      const name = event.target.name;

      if (name === "deadline" && value instanceof Date) {
        value = value.toISOString();
      }
      const scholarship = {
        ...this.state.scholarship,
        [name]: value,
      }
      this.setState({scholarship});
    };

    onSaveScholarship = () => {

      const { scholarship } = this.state;

      StorageHelper.performAction(ActionTypes.ADD, "savedScholarships", Object.assign({}, scholarship), savedScholarships => {
        this.setState({isSavedScholarship: true});
      });

    };

    render(){

      const { scholarship, isSavedScholarship } = this.state;

      const deadlineDate = new Date(scholarship.deadline)

      return (
        <div className="ScholarshipAddForm m-1">
         <label htmlFor="scholarshipNameInput">Name</label>
         <textarea value={scholarship.name} name="name"  onChange={this.onUpdateScholarship} className="form-control mb-3" id="scholarshipNameInput" placeholder="Name">
         </textarea> 
        
        <label htmlFor="scholarshipDescriptionInput">Description</label>
        <textarea value={scholarship.description} name="description" onChange={this.onUpdateScholarship} id="scholarshipDescriptionInput" className="form-control mb-3" placeholder="Description" rows={2}></textarea>
        
        <label htmlFor="scholarshipFundingAmountInput">Funding Amount</label>
        <input value={scholarship.funding_amount} name="funding_amount" onChange={this.onUpdateScholarship} id="scholarshipFundingAmountInput" className="form-control mb-3" placeholder="Funding Amount" type="number"></input>

        <label htmlFor="scholarshipNotesInput">Notes</label>
        <textarea value={scholarship.notes} name="notes" onChange={this.onUpdateScholarship} id="scholarshipNotesInput" className="form-control mb-3" placeholder="Notes" rows={2}></textarea>

        <label htmlFor="scholarshipCollectionInput">Collections</label>
        <input value={scholarship.collection} name="collection" onChange={this.onUpdateScholarship} id="scholarshipCollectionInput" className="form-control mb-3" placeholder="Collection"></input>

        <label htmlFor="scholarshipDeadlineInput">Deadline</label>
        {/* TODO use a shared component for ReactDatePicker in ScholarshipAddForm and ScholarshipTableRow */}
        <ReactDatePicker
          selected={deadlineDate}
          onChange={(date) => this.onUpdateScholarship({target: {value: date, name: 'deadline'}})}
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
       <p className="text-success">
         Saved Scholarship!
       </p> 
       :
       <button id="saveScholarshipButton" className="btn btn-primary mt-3" onClick={this.onSaveScholarship}>
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
  
}

export default ScholarshipAddForm;