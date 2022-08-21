/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
import Mainpagelayout from '../components/Mainpagelayout';
import { apiGet } from '../misc/config';

const Home = () => {
  const [input, setInput] = useState(' ');
  const [results, setResults] = useState(null);
  const [searchOption, setsearchOption] = useState('shows');
  const isShowsSearch = searchOption === 'shows';
  const onSearch = () => {
    // https://api.tvmaze.com/search/shows?q=men
    apiGet(`/search/${searchOption}?q=${input}`).then(result => {
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
  const onRadioChange = ev => {
    setsearchOption(ev.target.value);
  };
  const renderResults = () => {
    if (results && results.length === 0) {
      return <div>No Results</div>;
    }
    if (results && results.length > 0) {
      return results[0].show
        ? results.map(item => {
            return <div key={item.show.id}>{item.show.name}</div>;
          })
        : results.map(item => {
            return <div key={item.person.id}>{item.person.name}</div>;
          });
    }
    return null;
  };
  return (
    <Mainpagelayout>
      <input
        type="text"
        placeholder="Search for Something"
        onChange={OnInputChange}
        onKeyDown={onKeyDown}
        value={input}
      />

      <div>
        <label htmlFor="shows-search">
          Shows
          <input
            id="shows-search"
            type="radio"
            value="shows"
            checked={isShowsSearch}
            onChange={onRadioChange}
          />
        </label>
        <label htmlFor="actors-search">
          Actors
          <input
            id="actors-search"
            type="radio"
            value="people"
            checked={!isShowsSearch}
            onChange={onRadioChange}
          />
        </label>
      </div>

      <button type="button" onClick={onSearch}>
        Search
      </button>
      {renderResults()}
    </Mainpagelayout>
  );
};

export default Home;
