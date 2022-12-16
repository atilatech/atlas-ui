import React from 'react';
import { ChangeEventHandler, KeyboardEventHandler, useState } from 'react';
import AtilaAPI from "../../services/AtilaAPI";
import { Content } from '../../models/Content';
import { ContentCard } from '../ContentCard/ContentCard'

function Search() {
    const [searchQuery, setSearchQuery] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState("");
    const [searchResults, setSearchResults] = useState<Content[]>([]);

    const updateSearch: ChangeEventHandler<HTMLInputElement> = (event) => {
        event.preventDefault();
        setSearchQuery(event.target.value);
    };

    const keyDownHandler: KeyboardEventHandler<HTMLInputElement> = (event) => {
        if(event.currentTarget.name === "searchQuery" && event.key === "Enter" && event.shiftKey === false) {
            event.preventDefault();
            setErrorMessage("");
            setLoading("Loading search results");
            AtilaAPI.search(searchQuery)
                .then((res: any)=> {
                    const { results } = res;
                    console.log("search result: ");
                    console.log({results});
                    setSearchResults(results);
                })
                .catch((err: any) => {
                    console.log({err});
                    setErrorMessage(err.error || JSON.stringify(err));
                })
                .finally(() => {
                    setLoading("");
                })
        }
    }

    return (
        <div className="Search">
            <input className="form-control mb-3" placeholder='Enter seach query' onChange={updateSearch} onKeyDown={keyDownHandler}
                name="searchQuery"/>

            {loading &&
                <div>
                    {loading}
                    <div className="spinner-grow text-primary m-3" role="status">
                        <span className="sr-only"/>
                    </div>
                </div>
            }

            {errorMessage &&
                <div className="alert alert-danger" role="alert">
                    {errorMessage}
                </div>
            }

            {!loading && searchResults?.length > 0 ?
                <>
                <hr/>
                {searchResults.map(searchResult => <ContentCard content={searchResult} key={searchResult.id || searchResult.objectID} />)}
                </>
                :
                <p>
                    No Search results found
                </p>
            }
        </div>
    )
}

export default Search