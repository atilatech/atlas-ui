import * as React from 'react';
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

interface Props {
  data: PineconeData[];
}

const SearchResults: React.FC<Props> = ({ data }) => {
  // Group the items by video_id
  const groups:{ [key: string]: PineconeData[] } = {};
  data.forEach((item) => {
    const videoId = item.metadata.video_id;
    if (!groups[videoId]) {
      groups[videoId] = [];
    }
    groups[videoId].push(item);
  });

  return (
    <div className="card-columns">
      {Object.values(groups).map((group) => {
        const firstItem = group[0];
        const thumbnail = firstItem.metadata.thumbnail;

        return (
          <div key={firstItem.metadata.video_id} className="card m-3">
            <img src={thumbnail} alt={firstItem.metadata.title} className="card-img-top m-3" style={{width: '300px'}} />
            <div className="card-body">
              <h5 className="card-title">{firstItem.metadata.title}</h5>
              {group.map((item) => {
                const formattedTimestamp = Utils.secondsToMinutesAndSeconds(item.metadata.start)

                return (
                  <div key={item.id} className="card-text">
                    <ResponsiveEmbed url={item.metadata.url} title={`${item.metadata.title}_${item.metadata.text.slice(0,50)}`} />
                    <p>{item.metadata.text}</p>
                    <a href={item.metadata.url} target='_blank'rel='noreferrer'>
                      Watch at ({formattedTimestamp})
                    </a>
                    <hr/>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SearchResults;
