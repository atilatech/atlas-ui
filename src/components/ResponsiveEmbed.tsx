import * as React from 'react';

interface Props {
  url: string;
  title: string;
}

const ResponsiveEmbed: React.FC<Props> = ({ url, title }) => {
    let videoId = url.replace("https://youtu.be/", "").replace("https://www.youtube.com/","")
    videoId = videoId.replace("?t=", "?start=")
    // Youtube iFrame embed uses start not t
    // https://sites.edb.utexas.edu/wordpress/blog/embedding-a-youtube-video-with-start-and-stop-time/
    console.log({videoId})

  return (
    <div className="ratio ratio-16x9">
      <iframe
        title={title}
        allowFullScreen
        src={`//www.youtube.com/embed/${videoId}`}
        className="embed-responsive-item" />
    </div>
    );
};

        
export default ResponsiveEmbed;
        