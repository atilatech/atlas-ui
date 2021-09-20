import { Component } from 'react'
import { LoadParentPageRequest, ResponseMessage } from '../models/ExtensionMessage';
import { Scholarship } from '../models/Scholarship';

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
                  console.log({response});
                  this.setState({scholarship: response.data.scholarship})
              });
        });
      }
    }

    onUpdateScholarship = (event: any) => {
      
      const scholarship = {
        ...this.state.scholarship,
        [event.target.name]: event.target.value,
      }

      this.setState({scholarship});
    };

    onSaveScholarship = () => {

      const {scholarship: newScholarship} = this.state;

      chrome.storage.sync.get("savedScholarships", (items : any) => {
        let savedScholarships: Scholarship[] = [];
        newScholarship.date_created = new Date().toISOString();

        console.log({items});

        if (items.savedScholarships) {
            savedScholarships = items.savedScholarships
        }
        savedScholarships.push(newScholarship);

        chrome.storage.sync.set({ "savedScholarships" : savedScholarships });
        this.setState({isSavedScholarship: true});

      });

    };

    render(){

      const { scholarship, isSavedScholarship } = this.state;

      console.log({scholarship});
      

      return (
        <div className="ScholarshipAddForm m-3">
         <label htmlFor="scholarshipNameInput">Name</label>
         <textarea value={scholarship.name} name="name"  onChange={this.onUpdateScholarship} className="form-control mb-3" id="scholarshipNameInput" placeholder="Name">
         </textarea> 
        
        <label htmlFor="scholarshipDescriptionInput">Description</label>
        <textarea value={scholarship.description} name="description" onChange={this.onUpdateScholarship} id="scholarshipDescriptionInput" className="form-control mb-3" placeholder="Description" rows={3}></textarea>
        
        <label htmlFor="scholarshipNotesInput">Notes</label>
        <textarea value={scholarship.notes} name="notes" onChange={this.onUpdateScholarship} id="scholarshipNotesInput" className="form-control mb-3" placeholder="Notes" rows={3}></textarea>
        

        <label htmlFor="scholarshipDeadlineInput">Deadline</label>
        <input value={scholarship.deadline} name="deadline" onChange={this.onUpdateScholarship} id="scholarshipDeadlineInput" className="form-control" type="datetime-local" />
       
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