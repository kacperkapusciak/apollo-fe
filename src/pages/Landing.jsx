import React  from 'react';
import { useHistory } from 'react-router-dom';

import axios from 'axios-instance';

import Button from 'components/Button';

function Landing(props) {
  let history = useHistory();
  const { setNewPollInfo } = props;

  const getNewPollInfo = async () => {
    const { data } = await axios.get('init');
    if (data) {
      setNewPollInfo(data);
      // add entry to local storage
      localStorage.setItem(data.url, JSON.stringify({creator: true}));
      // redirect to new poll
      history.push(data.url);
    }
  };

  return (
    <Button
      type="button"
      onClick={getNewPollInfo}
    >
      Stwórz ankietę
    </Button>
  );
}

export default Landing;
