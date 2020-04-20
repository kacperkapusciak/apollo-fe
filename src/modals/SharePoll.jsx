import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from "styled-components";
import Button from "../components/Button";
import ShareIcon from 'assets/SharePollIcon.svg';

const ButtonWrapper = styled.div`
 margin: 0 auto;
`;


const IconField = styled.div`
  height: 54px;
  width: 54px;
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
  left: 15px;
  top: 15px;
`;

const Header = styled.h5`
  text-align: center;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.neutral[700]};
  font-size: 30px;
  margin-bottom: 8px;
`;
const Content = styled.p`
  color: ${({ theme }) => theme.colors.neutral[700]};
`;
const Footer = styled.footer`
  color: ${({ theme }) => theme.colors.neutral[700]};
  font-size: 14px;
  margin-bottom: 10px;
`;
const URLfield = styled.div`
  padding: 6px 16px;
  margin: 40px auto;
  border: 2px solid ${({ theme }) => theme.colors.neutral[200]};
  border-radius: 10px;
  width: 90%;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.neutral[700]};
`;

function SharePoll(props) {
    const {closeModal} = props;
    let location = useLocation();

    return (
        <>
            <IconField><Icon src={ShareIcon}/></IconField>
            <Header>Udostępnij ankietę innym</Header>
            <Content>Aby udostępnić ankietę po prostu skopiuj i prześlij ten link:</Content>
            <URLfield>{location.pathname}</URLfield>
            <Footer>Psst! Nie zapomnij przekazać także kodu PIN: 2137</Footer>
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

export default SharePoll;
