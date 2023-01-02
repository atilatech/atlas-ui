import React, { useState } from 'react';
import { AtlasService } from '../../services/AtlasService';
import SearchResults from './SearchResults';

function SearchAtlas() {
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState('');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
        const {data: {results}} = await (await AtlasService.search(query, url));
        console.log({results})
        setSearchResults(results.matches);
    } catch (error) {
        console.log({error});
    }
    setLoading(false);
  };

  return (
    <div>

    <form className="d-flex justify-content-center">
      <div className="form-group mx-sm-3 mb-2">
        <input
          type="text"
          className="form-control"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Query"
        />
      </div>
      <div className="form-group mx-sm-3 mb-2">
        <input
          type="text"
          className="form-control"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="URL"
        />
      </div>
      <button type="button" className="btn btn-primary mb-2" onClick={handleSearch}>
        Search
      </button>
    </form>
      <hr/>
      {loading ? (
        <>
        <div className='text-primary'>
        <div className="spinner-border mx-3" role="status">
        </div>
        <span className="sr-only">Loading...</span>
        </div>
        </>
      ) : (
        <SearchResults data={searchResults} />
      )}
    </div>
  );
}

export default SearchAtlas;
