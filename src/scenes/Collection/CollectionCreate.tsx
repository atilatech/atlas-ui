import React, { useState } from 'react';
import { AtlasService } from '../../services/AtlasService';

interface CollectionCreateProps {}

const CollectionCreate: React.FC<CollectionCreateProps> = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [videos, setVideos] = useState([]);
  const [videosMetadata, setVideosMetadata] = useState<any>({});

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVideoUrl(event.target.value);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await AtlasService.getVideoCollectionInfo(videoUrl);
    const { data } = response;
    setVideos(data.videos);
    setVideosMetadata(data.metadata);

  };

  return (
    <div>
        <div className="card shadow my-5 p-5">
            <div className="container">
            <div className="row">
                <div className="col-md-12">
                <form onSubmit={handleFormSubmit}>
                    <div className="form-group">
                    <label htmlFor="videoUrl">Video URL:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="videoUrl"
                        value={videoUrl}
                        onChange={handleInputChange}
                    />
                    </div>
                    <button type="submit" className="btn btn-primary">
                    Submit
                    </button>
                </form>
                </div>
            </div>

            <div className="row mt-5">
                <div className="col-md-12">
                {videos.length > 0 && (
                    <div>
                    <h2>Video Collection</h2>
                    <div className="row mt-3">
                        {videos.map((video: any, index: number) => (
                        <div key={index} className="col-md-4 mb-3">
                            <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{video.title}</h5>
                                <p className="card-text">{video.description}</p>
                            </div>
                            <div className="card-footer">
                                <small className="text-muted">{video.duration}</small>
                            </div>
                            </div>
                        </div>
                        ))}
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-12">
                        <div className="alert alert-info" role="alert">
                            Total Videos: {videos.length}, <br/>
                            Total Hours: {videosMetadata.totalHours}<br/>
                            Total Cost: {videosMetadata.totalCost}
                        </div>
                        </div>
                    </div>
                    </div>
                )}
                </div>
            </div>
            </div>
        </div>
    </div>
  );
};

export default CollectionCreate;
