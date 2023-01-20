import React from 'react';

function Footer() {
  return (
    <footer className="py-5">
      <div className="container">
        <p className="float-end mb-1">
          Built by{' '}
          <a href="https://twitter.com/atilatech" target="_blank" rel="noopener noreferrer">
            @atilatech
          </a>{' '}
          and{' '}
          <a href="https://twitter.com/tomiwa1a" target="_blank" rel="noopener noreferrer">
            @tomiwa1a
          </a>
        </p>
        <p className="mb-0">
          <a href="https://atila.ca/blog/tomiwa/atlas" target="_blank" rel="noopener noreferrer">
          What is Atlas? How was it made?
          </a>
        </p>
        <p className="mb-1">
        See the <a href="https://github.com/atilatech/atlas-ui" target="_blank" rel="noopener noreferrer">
            code used to make this website
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
