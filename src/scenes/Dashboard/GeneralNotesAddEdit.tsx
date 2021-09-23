import { useEffect, useState } from 'react';
import { GeneralNotes } from "../../models/GeneralNotes";
import StorageHelper, { ActionTypes } from '../../services/StorageHelper';

export function GeneralNotesAddEdit() {

    const [generalNotes, setGeneralNotes] = useState<GeneralNotes>(new GeneralNotes());
    const [isEditingNotes, setIsEditingNotes] = useState<boolean>(false);

    useEffect(() => {
        if(!chrome.storage) {
          // TODO find a way to globally use mock data for all chrome API calls if ATILA_MOCK_API_DATA === "true"
          return;
        }

        StorageHelper.performAction(ActionTypes.GET, "generalNotes", null, (generalNotes) => {
            setGeneralNotes(generalNotes as GeneralNotes);
          })
    }, []);

    const onUpdateGeneralNotes = (event: any) => {

        const notes: string =  event!.target!.value;
        const updatedGeneralNotes = {
            ...generalNotes,
            notes,
        }

        setGeneralNotes(updatedGeneralNotes);
        StorageHelper.performAction(ActionTypes.UPDATE, "generalNotes", {notes: notes})

    };

    const toggleEditingNotes = () => {
        setIsEditingNotes(!isEditingNotes);
    }

  return (
    <div>
        <>
        <label htmlFor="scholarshipNotesInput">Notes</label>
        
        <div style={{height: "100px", overflow: "auto"}}>
            { isEditingNotes ?
            <textarea value={generalNotes.notes} name="notes" onChange={onUpdateGeneralNotes} 
            id="scholarshipNotesInput" className="form-control mb-3" placeholder="Notes" rows={3}></textarea>
            :

            <div style={{ whiteSpace: "pre-line"}}>
                {generalNotes.notes}
            </div>
            }

        </div>
        <button onClick={toggleEditingNotes} className="btn btn-link">
        { isEditingNotes ? "View General Notes" : "Edit General Notes"}
        </button>
        </>
    </div>
    );
}
