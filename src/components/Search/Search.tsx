import React from 'react';
import { ChangeEventHandler, KeyboardEventHandler, useEffect, useState } from 'react';
import AtilaAPI from "../../services/AtilaAPI";
import { Content } from '../../models/Content';
import { ContentCard } from '../ContentCard/ContentCard'

function Search() {
    const [searchQuery, setSearchQuery] = useState("");
    const [initializingAPIKey, setInitializingAPIKey] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState("");
    const [searchResults, setSearchResults] = useState<Content[]>([]);

    const updateSearch: ChangeEventHandler<HTMLInputElement> = (event) => {
        event.preventDefault();
        setSearchQuery(event.target.value);
    };

    useEffect(() => {
        chrome.storage?.sync.get(['hasAtlasAPIKeyCredit'], function(result) {

        const { hasAtlasAPIKeyCredit } = result;
        if (!hasAtlasAPIKeyCredit) {
            initializeSearchAPIKeyCredit();
        }
    });

    const initializeSearchAPIKeyCredit = () => {
        const atlasAPIKeyCredit = localStorage.getItem('atlasAPIKeyCredit');
        if (!atlasAPIKeyCredit) {
            setInitializingAPIKey("Initializing API Key...");
            AtilaAPI.getNewAPIKeyCredit()
                .then((res: any)=> {
                    console.log({res});
                    const { api_key_credit } = res;
                    localStorage.setItem('atlasAPIKeyCredit', api_key_credit.public_key);
                })
                .catch((err: any) => {
                    console.log({err});
                })
                .then(()=> {
                    setInitializingAPIKey("");
                })
        }
    }

    }, []);

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

            {initializingAPIKey &&
                <div>
                    {initializingAPIKey}
                    <div className="spinner-grow text-primary m-3" role="status">
                    <span className="sr-only"/>
                    </div>
                </div>
            }

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

            {searchResults?.length > 0 &&
                <>
                <hr/>
                {searchResults.map(searchResult => <ContentCard content={searchResult} key={searchResult.id || searchResult.objectID} />)}
                </>
            }
        </div>
    )
}

export default Search