/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
import Mainpagelayout from '../components/Mainpagelayout';
import { apiGet } from '../misc/config';

const Home = () => {
  const [input, setInput] = useState(' ');
  const [results, setResults] = useState(null);
  const onSearch = () => {
    // https://api.tvmaze.com/search/shows?q=men
    apiGet(`/search/shows?q=${input}`).then(result => {
      setResults(result);
    });
  };
  const OnInputChange = ev => {
    setInput(ev.target.value);
  };

  const onKeyDown = ev => {
    if (ev.keyCode === 13) {
      onSearch();
    }
  };
  const renderResults = () => {
    if (results && results.length === 0) {
      return <div>No Results</div>;
    }
    if (results && results.length > 0) {
      return (
        <div>
          {results.map(item => {
            return <div key={item.show.id}>{item.show.name}</div>;
          })}
        </div>
      );
    }
    return null;
  };
  return (
    <Mainpagelayout>
      <input
        type="text"
        onChange={OnInputChange}
        onKeyDown={onKeyDown}
        value={input}
      />
      <button type="button" onClick={onSearch}>
        Search
      </button>
      {renderResults()}
    </Mainpagelayout>
  );
};

export default Home;
