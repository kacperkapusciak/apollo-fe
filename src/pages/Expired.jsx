import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import styled from 'styled-components';
import { Form, Formik } from 'formik';
import { v4 as uuidv4 } from 'uuid';

import Navigation from 'components/Navigation';

import { withModal } from 'providers/ModalProvider';

const FormStyled = styled(Form)`
  display: flex;
`;


function Expired(props) {
  const location = useLocation();
  const { modal } = props;

  useEffect(() => {
    // modal.open(<ExpiredInfo/>)
  }, []);

  return (
    <>
      <Navigation isCreator={false}/>
      <div>User</div>
    </>
  );
}


export default withModal(Expired);