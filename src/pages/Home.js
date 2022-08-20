/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
import Mainpagelayout from '../components/Mainpagelayout';

const Home = () => {
  const [input, setinput] = useState(' ');
  const onSearch = () => {
    // https://api.tvmaze.com/search/shows?q=men
    fetch(`https://api.tvmaze.com/search/shows?q=${input}`)
      .then(r => r.json())
      .then(result => {
        console.log(result);
      });
  };
  const OnInputChange = ev => {
    setinput(ev.target.value);
  };

  const onKeyDown = ev => {
    if (ev.keyCode === 13) {
      onSearch();
    }
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
    </Mainpagelayout>
  );
};

export default Home;
