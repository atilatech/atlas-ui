import React from 'react';
import { useNavigate } from 'react-router-dom';

interface VideoItem {
  video: string;
  title: string;
  search: string;
  match: string;
}

const SearchAtlasExamples: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = (video: string, search: string) => {
    const url = new URL(video);
    const q = search;
    navigate({
      pathname: window.location.pathname,
      search: `?url=${url}&q=${q}`
    });
  };

  const videoItems: VideoItem[] = [
    {
        video: 'https://www.youtube.com/watch?v=TuPyVPdH814',
        title: 'the ultimate guide to closet essentials',
        search: 'how much were your jeans',
        match: "their jeans do run like a hundred to two hundred dollars but if you catch them on sale i bought madewell jeans for like twenty dollars"
    },
    {
        video: 'https://www.youtube.com/watch?v=bGk8qcHc1A0',
        title: 'Joe Rogan & Lex Fridman: Lionel Messi Is The GOAT Over Cristiano Ronaldo',
        search: 'basketball',
        match: 'LeBron James and Michael Jordan'
    },
    {
        video: 'https://www.youtube.com/watch?v=BrK7X_XlGB8',
        title: 'A visual guide to Bayesian thinking',
        search: 'city in california',
        match: 'berkeley'
    },
    {
        video: 'https://www.youtube.com/watch?v=Ubo9UaRxdVg',
        title: 'Startup Grind hosts Patrick Collison (founder of Stripe)',
        search: 'city in argentina',
        match: 'Buenos Aires'
    },
    {
        video: 'https://www.youtube.com/watch?v=ihNZlp7iUHE',
        title: 'Intro to vectors & scalars | One-dimensional motion | Physics | Khan Academy',
        search: 'what is velocity',
        match: "talking about how fast something is going, and you give direction..., you're talking about velocity"
    }
  ]

  return (
    <table className="striped bordered hover">
      <thead>
        <tr>
          <th scope="col" className="wide-column">Video</th>
          <th scope="col" className="wide-column">Search</th>
          <th scope="col" className="wide-column">Match Result</th>
          <th scope="col" className="wide-column">Search Video</th>
        </tr>
      </thead>
      <tbody>
        {videoItems.map((item, index) => (
          <tr key={index}>
            <td>
              <a href={item.video}>{item.title}</a>
            </td>
            <td>{item.search}</td>
            <td>{item.match}</td>
            <td>
              <button onClick={() => handleClick(item.video, item.search)} className='btn btn-link'>
                Search Video
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SearchAtlasExamples;
