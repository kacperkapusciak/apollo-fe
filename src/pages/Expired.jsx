import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import styled from 'styled-components';
import { Form, Formik } from 'formik';
import HistoryIcon from 'assets/history.svg';

import Navigation from 'components/Navigation';

import { withModal } from 'providers/ModalProvider';

const FormStyled = styled(Form)`
  display: flex;
`;

const IconField = styled.div`
  height: 40px;
  width: 40px;
  background: ${({ theme }) => theme.colors.primary[200]};
  border-radius: 50%;
  display: inline-block;
  align-self: center;
  margin-bottom: 8px;
`;
const Icon = styled.img`
  height: 24px;
  width: 24px;
  position: relative;
  left: 10px;
  top: 8px;
`;


function Expired(props) {
  const location = useLocation();
  const { modal } = props;

  useEffect(() => {
    // modal.open(<ExpiredInfo/>)
  }, []);

  return (
    <>
      <Navigation isCreator={ false }/>
      <IconField><Icon src={HistoryIcon}/></IconField>
      <div>Ankieta wygasła lub została usunięta</div>
    </>
  );
}


export default withModal(Expired);