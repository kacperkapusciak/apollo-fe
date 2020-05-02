import React, { useRef, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

import Button from 'components/Button';

import { withAuth } from 'providers/AuthProvider';

import mockLogin from 'mock_db/mockLogin';

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
const InputsWrapper = styled.div`
  animation: ${({ error }) => error && css`${shake} 0.82s cubic-bezier(.36,.07,.19,.97) both`};
`;
const Input = styled.input`
  &::-webkit-inner-spin-button, 
  &::-webkit-outer-spin-button { 
    -webkit-appearance: none; 
    margin: 0; 
  }
`;

const BACKSPACE_KEY = 8;
const ENTER_KEY = 13;
const LEFT_ARROW_KEY = 37;
const RIGHT_ARROW_KEY = 39;

function EnterPIN(props) {
  const { auth, closeModal } = props

  const [pin, setPin] = useState(['', '', '', '']);
  const [error, setError] = useState(null);

  const inputs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  async function authenticate(pin) {
    try {
      const { data } = await mockLogin(pin);
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
    <div>
      <p>admin: 2137</p>
      <p>user: 6969</p>
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
      <Button type="button" size="sm" onClick={() => authenticate(pin.join(''))}>wejdź</Button>
    </div>
  );
}

export default withAuth(EnterPIN);
