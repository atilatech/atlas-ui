import React from 'react'
import { Video } from '../../models/Video'

function VideoDisplay({video}: {video: Partial<Video>}) {

  return (
    <div key={video.id} className="card mb-3">
          <h5 className="card-title m-3">
            <a href={video.url} target='_blank'rel='noreferrer'>
              {video.title}
              </a>
          </h5>
          <a href={video.url} target='_blank'rel='noreferrer'>
            <img src={video.image} alt={video.title} className="card-img-top m-3" style={{width: '300px'}} />
          </a>
          <div className="card-body">
            <p>
              {video.description}
            </p>
          </div>
      </div>
  )
}

export default VideoDisplay