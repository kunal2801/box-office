/* eslint-disable react/function-component-definition */
import React, { useState, useCallback } from 'react';
import ActorGrid from '../components/actor/ActorGrid';
import Mainpagelayout from '../components/Mainpagelayout';
import ShowGrid from '../components/show/ShowGrid';
import { apiGet } from '../misc/config';
import { useLastQuery } from '../misc/custom-hooks';
import CustomRadio from '../components/CustomRadio';
import {
  RadioInputsWrapper,
  SearchButtonWrapper,
  SearchInput,
} from './Home.styled';

const renderResults = results => {
  if (results && results.length === 0) {
    return <div>No Results</div>;
  }
  if (results && results.length > 0) {
    return results[0].show ? (
      <ShowGrid data={results} />
    ) : (
      <ActorGrid data={results} />
    );
  }
  return null;
};
const Home = () => {
  const [input, setInput] = useLastQuery();
  const [results, setResults] = useState(null);
  const [searchOption, setsearchOption] = useState('shows');
  const isShowsSearch = searchOption === 'shows';
  const onSearch = () => {
    // https://api.tvmaze.com/search/shows?q=men
    apiGet(`/search/${searchOption}?q=${input}`).then(result => {
      setResults(result);
    });
  };
  const OnInputChange = useCallback(
    ev => {
      setInput(ev.target.value);
    },
    [setInput]
  );

  const onKeyDown = ev => {
    if (ev.keyCode === 13) {
      onSearch();
    }
  };
  const onRadioChange = useCallback(ev => {
    setsearchOption(ev.target.value);
  }, []);

  return (
    <Mainpagelayout>
      <SearchInput
        type="text"
        placeholder="Search for Something"
        onChange={OnInputChange}
        onKeyDown={onKeyDown}
        value={input}
      />

      <RadioInputsWrapper>
        <div>
          <CustomRadio
            label="Shows"
            id="shows-search"
            value="shows"
            checked={isShowsSearch}
            onChange={onRadioChange}
          />
        </div>
        <div>
          <CustomRadio
            label="Actors"
            id="actors-search"
            value="people"
            checked={!isShowsSearch}
            onChange={onRadioChange}
          />
        </div>
      </RadioInputsWrapper>
      <SearchButtonWrapper>
        <button type="button" onClick={onSearch}>
          Search
        </button>
      </SearchButtonWrapper>
      {renderResults(results)}
    </Mainpagelayout>
  );
};

export default Home;
