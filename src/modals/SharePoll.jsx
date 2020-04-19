import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from "styled-components";
import Button from "../components/Button";
import ShareIcon from 'assets/ShareIcon.png';

const ModalIconField = styled.div`
  height: 50px;
  width: 50px;
  background: #F5DFBD 0% 0% no-repeat padding-box;
  border-radius: 50%;
  display: inline-block;
  align-self: center;
`;

const ModalHeader = styled.h5`
  text-align: center;
  letter-spacing: 0px;
  color: #000000;
  opacity: 1;
  font-weight: normal;
  font-size: 30px;
  padding-top: 20px;
  padding-bottom: 22px;
`;

const ModalIcon = styled.img`
  height: 32px;
  width: 36px;
  position: relative;
  left: 7px;
  top: 9px;
`;

const ModalContent = styled.p`
    text-align: left;
    letter-spacing: 0px;
    color: #343A40;
    opacity: 1;
    font-weight: normal;
    font-size: 16px;
    padding-bottom: 56px;
`;

const ModalFooter = styled.footer`
    text-align: left;
    letter-spacing: 0px;
    color: #343A40;
    opacity: 1;
    font-weight: normal;
    font-size: 14px;
    padding-top: 56px;
    padding-bottom: 10px;
`;

const URLfield = styled.div`
    background: #FFFFFF 0% 0% no-repeat padding-box;
    border: 2px solid #E8EBEE;
    border-radius: 10px;
    position: relative;
    padding-top: 6px;
    padding-bottom: 3px; 
    padding-left: 20px;
    left: 5%;
    width: 90%;
    opacity: 1;
    font-size: 18px;
    letter-spacing: 0px;
    color: #343A40;
    opacity: 1;
`;

function SharePoll(props) {
    const {closeModal} = props;
    let location = useLocation();

    return (
        <>
            <ModalIconField>
                <ModalIcon src={ShareIcon}></ModalIcon>
            </ModalIconField>
            <ModalHeader>
                Udostępnij ankietę innym
            </ModalHeader>
            <ModalContent>
                Aby udostępnić ankietę po prostu skopiuj i prześlij ten link:
            </ModalContent>
            <URLfield>{location.pathname}</URLfield>
            <ModalFooter>
                Psst! Nie zapomnij przekazać także kodu PIN: 2137
            </ModalFooter>
            <Button
                btnType="primary"
                size="sm"
                onClick={closeModal}
            >
                gotowe
            </Button>
        </>
    );
}

export default SharePoll;
