import React from 'react';
import ScholarshipAddForm from '../../components/ScholarshipAddForm';
import Search from '../../components/Search/Search';
import Settings from '../../components/Settings/Settings';
import "./PopUp.css";

function PopUp() {
  return (
    <div className="PopUp">
        <div className="p-3">
        <ul className="nav nav-tabs" id="popupTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-link active" id="save-tab" data-bs-toggle="tab" data-bs-target="#save" type="button" role="tab" aria-controls="save" aria-selected="true">
                Save
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" id="search-tab" data-bs-toggle="tab" data-bs-target="#search" type="button" role="tab" aria-controls="search" aria-selected="false">
                Search
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" id="settings-tab" data-bs-toggle="tab" data-bs-target="#settings" type="button" role="tab" aria-controls="settings" aria-selected="false">
                Settings
            </button>
          </li>
        </ul>
        <div className="tab-content" id="popupTabContent">
          <div className="tab-pane fade show active" id="save" role="tabpanel" aria-labelledby="save-tab">
            <ScholarshipAddForm />
          </div>
          <div className="tab-pane fade" id="search" role="tabpanel" aria-labelledby="search-tab">
            <Search />
          </div>
          <div className="tab-pane fade" id="settings" role="tabpanel" aria-labelledby="settings-tab">
            <Settings />
          </div>
        </div>

        
        </div>
    </div>
  )
}

export default PopUp