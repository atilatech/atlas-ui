import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AtlasService } from '../../services/AtlasService';
import { Utils } from '../../services/Utils';
import SearchAtlasExamples, { VideoItem } from './SearchAtlasExamples';
import SearchResults, { SearchResultsProps } from './SearchResults';

function SearchAtlas() {
  const [searchResults, setSearchResults] = useState<Partial<SearchResultsProps>>({});
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const [url, setUrl] = useState('');
  const [showSearchExamples, setShowSearchExamples] = useState(false);
  const [networkResponse, setNetworkResponse] = useState<{ status: null | 'pending' | 'complete' | 'error', message: string | React.ReactElement }>({
    status: null,
    message: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const searchParamsUrl = searchParams.get("url") || '';
    const searchParamsQuery = searchParams.get("q") || '';
    
    setUrl(searchParamsUrl);
    setQuery(searchParamsQuery);
  
  }, [searchParams])
  

  const handleSearch = async () => {
    setNetworkResponse({
      status: 'pending',
      message: '',
    });
    try {
        const {data: {results}} = await (await AtlasService.search(query, url));
        setSearchResults(results);
        setNetworkResponse({
          status: null,
          message: '',
        });
    } catch (error: unknown) {
      console.log({error});
      let errorMessage = JSON.stringify(error)
      if (error instanceof AxiosError) {
        errorMessage = JSON.stringify(error?.response?.data)
     } 
     setNetworkResponse({
      status: 'error',
      message: errorMessage,
    });
        
    }
  };

  const handleExampleClicked = (videoItem: VideoItem) => {
    setShowSearchExamples(!showSearchExamples);
    const { search, video } = videoItem;
    const url = video ? `&url=${new URL(video)}` : '';
    const q = search;
    const searchPath = `?q=${q}` + url;
    navigate({
      pathname: window.location.pathname,
      search: searchPath
    });

  }

  return (
    <div>

    <form className="d-flex justify-content-center">
      <div className="form-group mx-sm-3 mb-2">
        <input
          type="text"
          className="form-control"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="URL"
        />
      </div>
      <div className="form-group mx-sm-3 mb-2">
          <input
            type="text"
            className="form-control"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Query"
          />
      </div>

      <button type="button" className="btn btn-primary mb-2" onClick={handleSearch}>
        Search
      </button>
    </form>
      <hr/>
      <button className='btn btn-link' onClick={()=> setShowSearchExamples(!showSearchExamples) }>
        {showSearchExamples ? 'Hide ': 'Show '} examples
      </button>
      {showSearchExamples ? <SearchAtlasExamples onExampleClicked={handleExampleClicked} /> : null}
      <hr/>

      <p className='m-3' style={{color: '#52595f', fontSize: 'large'}}>
          {Utils.sentenceCase(query)}
        </p>
       {/* Show the network response status and message TODO move inside a NetworkResponse component*/}
       {networkResponse.status && (
            <div className='m-3'>
            {networkResponse.status === "pending" && (
              <div className='text-primary'>
              <div className="spinner-border mx-3" role="status">
              </div>
              <span className="sr-only">Loading...</span>
            </div>
            )}
            {networkResponse.status === "error" && (
            <p className="text-danger">
                Error: {networkResponse.message}
            </p>
            )}
            </div>)}
        {searchResults && searchResults.matches && 
        <SearchResults matches={searchResults.matches} answer={searchResults.answer} />}
    </div>
  );
}

export default SearchAtlas;
