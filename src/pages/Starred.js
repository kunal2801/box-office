/* eslint-disable react/function-component-definition */
import React, { useEffect, useState } from 'react';
import Mainpagelayout from '../components/Mainpagelayout';
import ShowGrid from '../components/show/ShowGrid';
import { apiGet } from '../misc/config';
import { useShows } from '../misc/custom-hooks';

const Starred = () => {
  const [starred] = useShows();
  const [shows, setshows] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (starred && starred.length > 0) {
      const promises = starred.map(showId => apiGet(`/shows/${showId}`));
      Promise.all(promises)
        .then(apiData => apiData.map(show => ({ show })))
        .then(results => {
          setshows(results);
          setisLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setisLoading(false);
        });
    } else {
      setisLoading(false);
    }
  }, [starred]);

  return (
    <Mainpagelayout>
      {isLoading && <div>Shows are still loading</div>}
      {error && <div>Error occured:{error}</div>}
      {!isLoading && !shows && <div>No shows were added</div>}
      {!isLoading && !error && shows && <ShowGrid data={shows} />}
    </Mainpagelayout>
  );
};

export default Starred;
