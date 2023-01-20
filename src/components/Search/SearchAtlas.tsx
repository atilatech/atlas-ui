import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AtlasService } from '../../services/AtlasService';
import SearchResults from './SearchResults';

function SearchAtlas() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const [url, setUrl] = useState('');
  const [networkResponse, setNetworkResponse] = useState<{ status: null | 'pending' | 'complete' | 'error', message: string | React.ReactElement }>({
    status: null,
    message: '',
  });

  useEffect(() => {
    const searchParamsUrl = searchParams.get("url");
    const searchParamsQuery = searchParams.get("q");

    if (searchParamsUrl) {
      setUrl(searchParamsUrl);
    }

    if (searchParamsQuery) {
      setQuery(searchParamsQuery);
    }
  
  }, [searchParams])
  

  const handleSearch = async () => {
    setNetworkResponse({
      status: 'pending',
      message: '',
    });
    try {
        const {data: {results}} = await (await AtlasService.search(query, url));
        console.log({results})
        setSearchResults(results.matches);
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
        {searchResults && <SearchResults data={searchResults} />}
    </div>
  );
}

export default SearchAtlas;
