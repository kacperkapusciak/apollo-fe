import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import axios from 'axios-instance';

import Navigation from 'components/Navigation';
import EnterPIN from 'modals/EnterPIN';

import { withModal} from 'providers/ModalProvider';

function Dummy(props) {
  const { modal } = props;
  // temporary solution, need "expired" endpoint on the backend
  const [poll, setPoll] = useState();

  const history = useHistory();
  const location = useLocation();

  const url = location.pathname.substr(1);

  useEffect(() => {
    async function loadPoll() {
      const { data } = await axios.get(`poll/${url}`);
      if (data) {
        setPoll(data);
      }
    }

    loadPoll();
    modal.open(<EnterPIN/>, false)
  }, []);

  if (poll && poll.settings.expired) {
    history.push("/expired");
  }

  return <Navigation />;
}


export default withModal(Dummy);
