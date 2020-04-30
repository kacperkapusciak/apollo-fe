import React from 'react';
import styled from 'styled-components';
import { useHistory } from "react-router-dom";

import Navigation from 'components/Navigation';
import Button from 'components/Button';
import Container from 'components/Container';
import HistoryIcon from 'assets/history.svg';

const IconField = styled.div`
  height: 80px;
  width: 80px;
  background: ${({ theme }) => theme.colors.primary[200]};
  border-radius: 50%;
  display: inline-block;
  align-self: center;
  margin-bottom: 45px;
`;
const Icon = styled.img`
  height: 40px;
  width: 50px;
  position: relative;
  left: 13px;
  top: 20px;
`;
const Wrapper = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 512px;
`;
const Text = styled.p`
  font-size: 28px;
  margin-bottom: 64px;
`;

function Expired(props) {
  const history = useHistory();

  return (
    <>
      <Navigation isCreator={false}/>
      <Wrapper size='sm'>
        <IconField><Icon src={HistoryIcon}/></IconField>
        <Text>Ankieta wygasła lub została usunięta</Text>
        <Button
          btnType="secondary"
          onClick={() => history.push("/")}
          size="sm"
        >
          Wróć do strony głównej
        </Button>
      </Wrapper>
    </>
  );
}


export default Expired;
