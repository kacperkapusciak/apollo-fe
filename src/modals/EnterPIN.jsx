import React, { useRef, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useLocation } from 'react-router-dom';

import axios from 'axios-instance';

import Button from 'components/Button';

import { withAuth } from 'providers/AuthProvider';

import KeyIcon from "assets/KeyIconHorizontal.svg";

const shake = keyframes`
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }
  
  20%, 80% {
    transform: translate3d(1px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-2px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(2px, 0, 0);
  }
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
const ButtonWrapper = styled.div`
  margin: 16px auto 0;
`;
const Header = styled.h5`
  text-align: center;
  font-weight: normal;
  font-size: 30px;
  margin-bottom: 8px;
`;
const Info = styled.p`
  width: 448px;
  padding-bottom: 50px;
`;
const InputsWrapper = styled.div`
  animation: ${({ error }) => error && css`${shake} 0.82s cubic-bezier(.36,.07,.19,.97) both`};
  margin: 32px auto 42px;
`;
const Input = styled.input`
  &::-webkit-inner-spin-button, 
  &::-webkit-outer-spin-button { 
    -webkit-appearance: none; 
  }
  -moz-appearance: textfield;
  font-size: 48px;
  font-weight: 300;
  text-align: center;
  width: 48px;
  height: 64px;
  margin: 4px;
  border-radius: 8px;
  border: 2px solid ${({ theme }) => theme.colors.neutral[300]};
`;
const Footer = styled.p`
  font-size: 14px;
`;

const BACKSPACE_KEY = 8;
const ENTER_KEY = 13;
const LEFT_ARROW_KEY = 37;
const RIGHT_ARROW_KEY = 39;

function EnterPIN(props) {
  const { auth, closeModal } = props;

  const location = useLocation();
  const url = location.pathname.replace(/\//g, '');

  const [pin, setPin] = useState(['', '', '', '']);
  const [error, setError] = useState(null);

  const inputs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  async function authenticate(pin) {
    try {
      const payload = {
        pin: parseInt(pin),
        url
      };
      const { data } = await axios.post('core/login', payload);
      auth.authenticate();
      auth.setIsCreator(data.isCreator);
      closeModal();
    } catch (err) {
      setError(err);
      setPin(['', '', '', '']);
      inputs[0].current.focus();

      setTimeout(() => {
        setError(null);
      }, 820)
    }
  }

  function setDigit(place, digit) {
    const copy = [...pin];
    copy[place] = digit;
    setPin(copy);
  }

  function handleChange(e, id) {
    const next = Math.min(id + 1, 3);

    const { value } = e.target;
    if (value.length <= 1)
      setDigit(id, value);

    if (value.length !== 0)
      inputs[next].current.focus();
  }

  function handleKeyDown(e, id) {
    const next = Math.min(id + 1, 3);
    const prev = Math.max(id - 1, 0);

    switch (e.keyCode) {
      case BACKSPACE_KEY:
        if (pin[id] === '')
          inputs[prev].current.focus();
        break;

      case LEFT_ARROW_KEY:
        inputs[prev].current.focus();
        break;

      case RIGHT_ARROW_KEY:
        inputs[next].current.focus();
        break;

      case ENTER_KEY:
        authenticate(pin.join(''))
    }
  }

  return (
    <>
      <IconField><Icon src={KeyIcon}/></IconField>
      <Header>Bezpieczeństwo to podstawa</Header>
      <Info>
        Każda nasza ankieta zabezpieczona jest kodem PIN, dzięki któremu przekazane opinie są zawsze wiarygodne.
      </Info>
      <p>Wprowadź PIN aby uzyskać dostęp:</p>
      <InputsWrapper error={error}>
        {inputs.map((ref, id) => (
          <Input
            type="number"
            autoFocus={id === 0}
            ref={ref}
            onChange={e => handleChange(e, id)}
            onKeyDown={e => handleKeyDown(e, id)}
            value={pin[id]}
            min={0}
            max={9}
            key={`input_${id}`}
          />
        ))}
      </InputsWrapper>
      <Footer>Nie masz PINu? Poproś o niego twórcę ankiety.</Footer>
      <ButtonWrapper>
        <Button type="button" size="sm" onClick={() => authenticate(pin.join(''))}>wejdź</Button>
      </ButtonWrapper>
    </>
  );
}

export default withAuth(EnterPIN);
