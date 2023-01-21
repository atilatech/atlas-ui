import React, { useState }  from 'react';
import { Utils } from '../../services/Utils';
import ResponsiveEmbed from '../ResponsiveEmbed';

interface DocumentSegment {
  end: number;
  id: string;
  length: number;
  start: number;
  text: string;
  thumbnail: string;
  title: string;
  url: string;
  video_id: string;
  views: number;
}

interface PineconeData {
  id: string;
  score: number;
  values: any[];
  sparseValues: {};
  metadata: DocumentSegment;
}

export interface SearchResultsProps {
  matches: PineconeData[];
  answer?: string[]
}


interface SearchResultProps {
  item: PineconeData;
}

const SearchResult: React.FC<SearchResultProps> = ({ item }) => {
    const [showEmbed, setShowEmbed] = useState(false);

    const formattedTimestamp = Utils.secondsToMinutesAndSeconds(item.metadata.start)
    return (
      <div className="card-text">
        {showEmbed ? (
          <ResponsiveEmbed url={item.metadata.url} title={`${item.metadata.title}_${item.metadata.text.slice(0,50)}`} />
        ) : null}
        <p className='my-3'>{item.metadata.text}</p>
        <button className="btn btn-outline-primary mx-3" onClick={() => setShowEmbed(!showEmbed)}>
          {showEmbed ? 'Hide' : 'Watch'} Snippet
        </button>
        <a href={item.metadata.url} target='_blank'rel='noreferrer'>
          Watch on YouTube at ({formattedTimestamp})
        </a>
        <hr/>
      </div>
    );
};

const SearchResults: React.FC<SearchResultsProps> = ({ matches, answer }) => {
  // Group the items by video_id
  const groups:{ [key: string]: PineconeData[] } = {};
  matches.forEach((item) => {
    const videoId = item.metadata.video_id;
    if (!groups[videoId]) {
      groups[videoId] = [];
    }
    groups[videoId].push(item);
  });

  console.log({matches, answer});

  return (
    <div className="m-3 card-columns">
      {answer && 
        <>
        <div style={{fontSize: 'large'}}>
          <h2>
            Answer
          </h2>
          <p>
            {answer[0]}
          </p>
        </div>
        <h2>
          Sources
        </h2>
        </>
      
      }
      {Object.values(groups).map((group) => {
        const firstItem = group[0];
        const thumbnail = firstItem.metadata.thumbnail;
        const videoUrl = `https://www.youtube.com/watch?v=${firstItem.metadata.video_id}`

        return (
          <div key={firstItem.metadata.video_id} className="card">
            <a href={videoUrl} target='_blank'rel='noreferrer'>
            <img src={thumbnail} alt={firstItem.metadata.title} className="card-img-top m-3" style={{width: '300px'}} />
            </a>
            <div className="card-body">
              <h5 className="card-title"><a href={videoUrl} target='_blank'rel='noreferrer'>
                {firstItem.metadata.title}
                </a></h5>
              {group.map((item) => <SearchResult item={item} key={item.id} />)}
          </div>
        </div>
      );
    })}
  </div>
  );
};

export default SearchResults;
