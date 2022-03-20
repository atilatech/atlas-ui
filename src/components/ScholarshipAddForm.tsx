import { Component } from "react";
import { ImportPageContentRequest, ImportPageContentResponse, LoadPageDataResponse, LoadParentPageRequest, ResponseMessage } from "../models/ExtensionMessage";
import { Scholarship } from "../models/Scholarship";
import StorageHelper, { ActionTypes } from "../services/StorageHelper";
import ReactDatePicker from "react-datepicker";
import "./ScholarshipAddForm.css";
import { BlogContent } from "../models/BlogContent";

const NOTION_DOMAIN_NAME: string = "www.notion.so";

export class ScholarshipAddForm extends Component<{}, { titleIndex: number; title: string; scholarship: Scholarship;
  blogContent: BlogContent; isSavedScholarship: boolean; isNotionPage: boolean; isSavedBlogContent: boolean }> {
  constructor(props: any) {
    super(props);

    this.state = {
      titleIndex: 0,
      title: "",
      scholarship: new Scholarship(),
      blogContent: new BlogContent(),
      isSavedScholarship: false,
      isNotionPage: false,
      isSavedBlogContent: false,
    };
  }

  componentDidMount() {
    this.loadParentPageData();
    this.checkIsNotionPage();
  }

  loadParentPageData = () => {
    const { titleIndex } = this.state;
    const getTitleRequest: LoadParentPageRequest = {
      type: "LOAD_PARENT_PAGE",
      data: {
        titleIndex: titleIndex,
      },
    };
    if (chrome.tabs) {
      //for use in non chrom extension environments
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs: any) => {
        const tabId = tabs[0].id ?? 0;
        chrome.tabs.sendMessage(tabId, getTitleRequest, (response: LoadPageDataResponse) => {
          // the content script sendResponse serializes the deadline and converts it from a Date to a JSON so we must conver it back
          this.setState({ scholarship: response.data.scholarship });
        });
      });
    }
  };

  checkIsNotionPage = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      let domain = new URL(tabs[0].url!).hostname;
      this.setState({ isNotionPage: domain === NOTION_DOMAIN_NAME });
    });
  };

  onUpdateScholarship = (event: any) => {
    let value = event.target.value;
    const name = event.target.name;

    if (name === "deadline" && value instanceof Date) {
      value = value.toISOString();
    }
    const scholarship = {
      ...this.state.scholarship,
      [name]: value,
    };
    this.setState({ scholarship });
  };

  onSaveScholarship = () => {
    const { scholarship } = this.state;

    StorageHelper.performAction(ActionTypes.ADD, "savedScholarships", Object.assign({}, scholarship), (savedScholarships) => {
      this.setState({ isSavedScholarship: true });
    });
  };

  onImportContent = () => {
    const { titleIndex } = this.state;

    const getTitleRequest: ImportPageContentRequest = {
      type: "IMPORT_PAGE_CONTENT",
      data: {
        titleIndex: titleIndex,
      },
    };

    if (chrome.tabs) {
      //for use in non chrom extension environments
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs: any) => {
        const tabId = tabs[0].id ?? 0;
        chrome.tabs.sendMessage(tabId, getTitleRequest, (response: ResponseMessage) => {
          StorageHelper.performAction(ActionTypes.ADD, "importBlogContent", (response as ImportPageContentResponse).data.blogContent, (savedBlogContent) => {
            this.setState({isSavedBlogContent: true});
          });
        });
      });
    }
  };

  render() {
    const { scholarship, isSavedScholarship, isNotionPage, isSavedBlogContent } = this.state;
    const deadlineDate = new Date(scholarship.deadline);

    return (
      <div className="ScholarshipAddForm m-3">
        {isNotionPage ? (
          <>
            <h5>Import as Blog Post</h5>
            <hr/>
            <button id="importContentButton" className="btn btn-primary mt-3" onClick={this.onImportContent}>
              Import
            </button>
            {isSavedBlogContent ? <p className="text-success mt-2">Saved Blog Post!</p> : <></>}
            <hr/>
          </>
        ) : (
          <>
            <label htmlFor="scholarshipNameInput">Name</label>
            <textarea value={scholarship.name} name="name" onChange={this.onUpdateScholarship} className="form-control mb-3" id="scholarshipNameInput" placeholder="Name" />

            <label htmlFor="scholarshipDescriptionInput">Description</label>
            <textarea value={scholarship.description} name="description" onChange={this.onUpdateScholarship} id="scholarshipDescriptionInput" className="form-control mb-3" placeholder="Description" rows={2} />

            <label htmlFor="scholarshipFundingAmountInput">Funding Amount</label>
            <input value={scholarship.funding_amount} name="funding_amount" onChange={this.onUpdateScholarship} id="scholarshipFundingAmountInput" className="form-control mb-3" placeholder="Funding Amount" type="number" />

            <label htmlFor="scholarshipNotesInput">Notes</label>
            <textarea value={scholarship.notes} name="notes" onChange={this.onUpdateScholarship} id="scholarshipNotesInput" className="form-control mb-3" placeholder="Notes" rows={2} />

            <label htmlFor="scholarshipDeadlineInput">Deadline</label>
            {/* TODO use a shared component for ReactDatePicker in ScholarshipAddForm and ScholarshipTableRow */}
            <ReactDatePicker
              selected={deadlineDate}
              onChange={(date) => this.onUpdateScholarship({ target: { value: date, name: "deadline" } })}
              showTimeSelect
              showMonthDropdown
              showYearDropdown
              timeFormat="h:mm aa"
              timeIntervals={60}
              timeCaption="Time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="col-12"
            />

            {isSavedScholarship ? (
              <p className="text-success">Saved Scholarship!</p>
            ) : (
              <button id="saveScholarshipButton" className="btn btn-primary mt-3" onClick={this.onSaveScholarship}>
                Save
              </button>
            )}
            <hr />
            <a href={`chrome-extension://${chrome?.runtime?.id}/index.html`} target="_blank" rel="noopener noreferrer">
              See all Saved Scholarships
            </a>
          </>
        )}
      </div>
    );
  }
}

export default ScholarshipAddForm;
