import { Component } from 'react'
import { LoadParentPageRequest, ResponseMessage } from '../models/ExtensionMessage';
import { Scholarship } from '../models/Scholarship';
import { Content } from '../models/Content';
import { Collection } from '../models/Collection';
import StorageHelper, { ActionTypes } from '../services/StorageHelper';
import ReactDatePicker from "react-datepicker";
import "./ScholarshipAddForm.css"

export interface ScholarshipAddFormProps {
  titleIndex: number,
  title: string,
  scholarship: Scholarship,
  isSavedScholarship: boolean,
  collections: Content[],
  collection: Collection
}

export class ScholarshipAddForm extends Component<{}, ScholarshipAddFormProps>  {

  constructor(props: any) {
    super(props)
  
    this.state = {
       titleIndex: 0,
       title: "",
       scholarship: new Scholarship(),
       isSavedScholarship: false,
       collections: [],
       collection: new Collection(),
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

    onUpdateCollection = (event: any) => {
      let value = event.target.value;
      const name = event.target.name;
      const collection = {
        ...this.state.collection,
        [name]: value,
      }

      this.setState({collection});
    };

    onSaveToCollection = () => {
      const { collection } = this.state;
      if (chrome.tabs) {//for use in non chrom extension environments
        chrome.tabs.query({active: true, currentWindow: true}, (tabs : any) => {
            let newContent = new Content();
            newContent.url = tabs[0].url ?? "";
            collection.contents.push(newContent);
        });
      }

      StorageHelper.performAction(ActionTypes.ADD, "addCollection", Object.assign({}, collection), savedScholarships => {
        console.log("[grace] collection saved");
      });
    };

    render(){

      const { scholarship, isSavedScholarship, collection } = this.state;

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
        <>
          <p className="text-success">
            Saved Scholarship!
          </p>
          <label htmlFor="scholarshipCollectionInput">Collections</label>
          <input value={collection.title} name="title" onChange={this.onUpdateCollection} id="scholarshipCollectionInput" className="form-control" placeholder="Collection name"></input>
          <button id="saveCollectionButton" className="btn btn-primary mt-3" onClick={this.onSaveToCollection}>
            Save
          </button>
        </>
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