import React from 'react';
import styled from 'styled-components';

import Button from 'components/Button';
import KeyIcon from 'assets/KeyIconHorizontal.svg';

const ButtonWrapper = styled.div`
 margin: 0 auto;
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
  margin-bottom: 24px;
`;
const Info = styled.p`
  width: 550px;
  padding-bottom: 50px;
`;
const PINField = styled.div`
  margin: 0 auto 24px;
  letter-spacing: -2.3px;
  font-size: 48px;
`;

function PollInfo(props) {
  const { closeModal } = props;

  return (
    <>
      <IconField><Icon src={KeyIcon}/></IconField>
      <Header>Twoja ankieta jest bezpieczna</Header>
      <Info>
        Każda nasza ankieta zabezpieczona jest kodem PIN, dzięki któremu przekazane opinie są zawsze wiarygodne.
      </Info>
      <p>Oto twój kod PIN:</p>
      <PINField>2137</PINField>
      <ButtonWrapper>
        <Button
          btnType="primary"
          size="sm"
          onClick={closeModal}
        >
          gotowe
        </Button>
      </ButtonWrapper>
    </>
  );
}

export default PollInfo;
