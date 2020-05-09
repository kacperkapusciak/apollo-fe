import React from 'react';
import styled from 'styled-components';

import Label from 'components/Label';
import Button from 'components/Button';

import KeyIcon from 'assets/KeyIconHorizontal.svg';
import UserPINIcon from 'assets/UserPINIcon.svg';
import AdminPINIcon from 'assets/AdminPINIcon.svg';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
const Header = styled.h5`
  text-align: center;
  font-weight: normal;
  font-size: 30px;
  margin-bottom: 8px;
`;
const Info = styled.p`
  padding-bottom: 32px;
`;
const PINContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 16px 1fr;
  grid-column-gap: 90px;
  margin-bottom: 28px;
`;
const PIN = styled.div`
  display: flex;
  justify-content: center;
  font-size: 48px;
  letter-spacing: -2.3px;
  
  & > img {
    margin-right: 6px;
  }
`;


function PollInfo(props) {
  const { closeModal, pinUser, pinCreator } = props;

  return (
    <Wrapper>
      <IconField><Icon src={KeyIcon}/></IconField>
      <Header>Twoja ankieta jest bezpieczna</Header>
      <Info>
        Każda nasza ankieta zabezpieczona jest dwoma kodami PIN. Pierwszy z nich daje dostęp dla udzielającego
        odpowiedzi, drugi do edycji ankiety. Ten prosty mechanizm sprawia, że przekazane opinie są zawsze wiarygodne.
      </Info>
      <PINContainer>
        <Label>odpowiadający</Label>
        <PIN>
          <img src={UserPINIcon} alt=''/>
          {pinUser}
        </PIN>
        <Label>administrator</Label>
        <PIN>
          <img src={AdminPINIcon} alt=''/>
          {pinCreator}
        </PIN>
      </PINContainer>
      <Button
        btnType="primary"
        size="sm"
        onClick={closeModal}
      >
        gotowe
      </Button>
    </Wrapper>
  );
}

export default PollInfo;
