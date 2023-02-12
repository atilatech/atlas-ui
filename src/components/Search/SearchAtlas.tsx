import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AtlasService } from '../../services/AtlasService';
import { Utils } from '../../services/Utils';
import SearchAtlasExamples, { VideoItem } from './SearchAtlasExamples';
import SearchResults, { SearchResultsProps } from './SearchResults';
import Summaries from './Summaries';

function SearchAtlas() {
  const [searchResults, setSearchResults] = useState<Partial<SearchResultsProps>>({});
  const [video, setVideo] = useState<Partial<any>>({});
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
        const {data: { results, video }} = await (await AtlasService.search(query, url));
        setSearchResults(results);
        setVideo(video);
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

            <ul className="nav nav-tabs" id="popupTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-link active" id="save-tab" data-bs-toggle="tab" data-bs-target="#save" type="button" role="tab" aria-controls="save" aria-selected="true">
                Summary
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" id="search-tab" data-bs-toggle="tab" data-bs-target="#search" type="button" role="tab" aria-controls="search" aria-selected="false">
                Search Results
            </button>
          </li>
        </ul>
        <div className="tab-content" id="popupTabContent">
          <div className="tab-pane fade show active" id="save" role="tabpanel" aria-labelledby="save-tab">
            {video?.summaries?.length > 0 ? <Summaries summaries={video.summaries} />: <button>Generate Summary</button>}
          </div>
          <div className="tab-pane fade" id="search" role="tabpanel" aria-labelledby="search-tab">
            {searchResults && searchResults.matches && 
          <SearchResults matches={searchResults.matches} answer={searchResults.answer} />}
          </div>
        </div>
        
    </div>
  );
}

export default SearchAtlas;
