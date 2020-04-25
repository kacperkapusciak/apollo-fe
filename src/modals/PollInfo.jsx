import React from 'react';
import styled from "styled-components";
import Button from "../components/Button";
import KeyIcon from 'assets/KeyIconHorizontal.svg';

const ButtonWrapper = styled.div`
 margin: 0 auto;
`;


const IconField = styled.div`
  height: 40px;
  width: 40px;
  background: #F5DFBD 0% 0% no-repeat padding-box;
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
  color: ${({ theme }) => theme.colors.neutral[700]};
  font-size: 30px;
  margin-bottom: 24px;
`;
const Info = styled.p`
  color: ${({ theme }) => theme.colors.neutral[700]};
  width: 550px;
  padding-bottom: 50px;
`;

const PINInfo = styled.p`
  color: ${({ theme }) => theme.colors.neutral[700]};
`;
const PINField = styled.div`
  // padding: 6px 16px;
  margin: 20px auto;
  letter-spacing: -2.3px;
  font-size: 48px;
  color: ${({ theme }) => theme.colors.neutral[700]};
`;

function PollInfo(props) {
  const {closeModal} = props;

  return (
      <>
        <IconField><Icon src={KeyIcon}/></IconField>
        <Header>Twoja ankieta jest bezpieczna</Header>
        <Info>Każda nasza ankieta zabezpieczona jest kodem PIN, dzięki któremu przekazane opinie są zawsze wiarygodne</Info>
        <PINInfo>Oto twój kod PIN:</PINInfo>
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
