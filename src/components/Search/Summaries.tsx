import React from 'react'
import { SearchResult } from './SearchResults';

function Summaries({summaries}: {summaries: any}) {

  console.log({summaries});
  return (
    <div className='card container shadow'>
        <div className='card-body'>
            <h5 className='card-title'>Summaries</h5>
            <p className='card-text'>
                {summaries.map((summary: any) => <SearchResult item={summary} key={summary.id} />)}
            </p>
        </div>
    </div>
  )
}

export default Summaries