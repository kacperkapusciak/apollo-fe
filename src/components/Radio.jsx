import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  cursor: pointer;
  user-select: none;
  border: 1px solid ${({ theme }) => theme.colors.neutral[700]};
  border-radius: 50%;
  height: 16px;
  width: 16px;
  margin-right: 8px;
`;
const Checkmark = styled.span`
  position: absolute;
  top: 3px;
  left: 3px;
  height: 8px;
  width: 8px;
  background-color: ${({ theme }) => theme.colors.accent[300]};
  display: ${({ checked }) => checked ? 'block' : 'none'};
  border: solid transparent;
  border-radius: 50%;
`;
const Input = styled.input`
  position: absolute;
  z-index: 1;
  opacity: 0;
  cursor: pointer;
  height: 18px;
  width: 18px;
  
  &:disabled {
    cursor: auto;
  }
`;

function Radio(props) {
  const { disabled, field = {}, setFieldValue, option = '' } = props;

  return (
    <Wrapper>
      <Input
        type="radio"
        name={field.name}
        checked={field.value === option}
        onChange={() => setFieldValue(field.name, option)}
        disabled={disabled}
      />
      <Checkmark checked={field.value === option}/>
    </Wrapper>
  );
};

export default Radio;
