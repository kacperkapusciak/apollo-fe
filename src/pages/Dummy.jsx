import React, {useEffect} from 'react';


import Navigation from 'components/Navigation';
import EnterPIN from 'modals/EnterPIN';

import { withModal} from 'providers/ModalProvider';

function Dummy(props) {
  const { modal } = props;

  useEffect(() => {
    modal.open(<EnterPIN/>, false)
  }, []);

  return <Navigation />;
}


export default withModal(Dummy);
