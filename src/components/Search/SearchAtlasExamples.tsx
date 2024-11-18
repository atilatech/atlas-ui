import React from 'react';
import { Link } from 'react-router-dom';
export interface VideoItem {
  video?: string;
  title?: string;
  search: string;
  match: string;
}

function SearchAtlasExamples({onExampleClicked}: {onExampleClicked?: (video: VideoItem) => void}) {

  const handleClick = (videoItem: VideoItem) => {
    onExampleClicked?.(videoItem)
  };

  const videoItems: VideoItem[] = [
    {
        video: 'https://www.youtube.com/watch?v=cnFCGOWHQ7A',
        title: 'Joe Rogan & Lex Fridman: Lionel Messi Is The GOAT Over Cristiano Ronaldo',
        search: 'basketball',
        match: 'LeBron James and Michael Jordan'
    },
    {
        video: 'https://www.youtube.com/watch?v=TuPyVPdH814',
        title: 'the ultimate guide to closet essentials',
        search: 'best jeans to get',
        match: "If you're looking for a good pair of jeans that will last for a long time, you should look for a high-rise jean. High-rise jeans tend to last longer than low-rise ones, and they tend to be more expensive."
    },
    {
        search: 'what shoes should i wear',
        match: "If you're looking for a good pair of jeans that will last for a long time, you should look for a high-rise jean. High-rise jeans tend to last longer than low-rise ones, and they tend to be more expensive."
    },
    {
        video: 'https://www.youtube.com/watch?v=BrK7X_XlGB8',
        title: 'A visual guide to Bayesian thinking',
        search: 'city in california',
        match: 'berkeley'
    },
    {
        video: 'https://www.youtube.com/watch?v=juM2ROSLWfw',
        title: 'Krebs / citric acid cycle | Cellular respiration | Biology | Khan Academy',
        search: 'what are enzymes',
        match: "talking about how fast something is going, and you give direction..., you're talking about velocity"
    },
    {
        video: 'https://www.youtube.com/watch?v=ZCFkWDdmXG8',
        title: 'Explained | The Stock Market | FULL EPISODE | Netflix',
        search: 'best way to invest',
        match: "If you want to invest in the stock market, the best way to invest is to buy an index fund...Buy an S&P 500 Low-Cost Index Fund."
    },
    {
        video: 'https://www.youtube.com/watch?v=mj0O_6oVhts',
        title: 'LOVE LESSONS - 125+ Years of Marriage Advice in 3 Minutes',
        search: 'how to find love',
        match: "EGCG is a polyphenol found in green tea and a potent antioxidant ...EGCG has also been shown to have anti-inflammatory and anti-oxidant properties, and has been used in the treatment of cancer."
    }
  ]

  return (
    <table className="striped bordered hover">
      <thead>
        <tr>
          <th scope="col" className="wide-column">Video</th>
          <th scope="col" className="wide-column">Search Phrase</th>
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
            <td>
              <button onClick={() => handleClick(item)} className='btn btn-link'>
                <Link to={`/?q=${item.search}${item.video? '&url=' +item.video: ''}`}>
                  Search {item.video ? 'Video' : 'All Videos'}
                </Link>
                
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SearchAtlasExamples;
