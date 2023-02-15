import React from 'react'
import { Video } from '../../models/Video';
import { SearchResult } from './SearchResults';

function Summaries({video, summaries}: {video: Partial<Video>, summaries: any}) {

  return (
    <div className='my-3 card container shadow'>
        <div className='card-body'>
            <h5 className='card-title'>Summaries</h5>
            <p className='card-text'>
                {
                summaries
                .map((summary: any) => ({
                    ...summary,
                    url: `${video.url}&t=${Math.floor(summary.start)}`,
                }))
                .map((summary: any) => <SearchResult item={summary} key={summary.id} />)}
            </p>
        </div>
    </div>
  )
}

export default Summaries