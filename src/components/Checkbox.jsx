import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  cursor: pointer;
  user-select: none;
  border: 1px solid ${({ theme }) => theme.colors.neutral[700]};
  border-radius: 4px;
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
  border-radius: 2px;
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

function Checkbox(props) {
  const { disabled, field } = props;

  return (
    <Wrapper>
      <Input
        type="checkbox"
        checked={field.value}
        disabled={disabled}
        {...field}
      />
      <Checkmark checked={field.value}/>
    </Wrapper>
  );
};

export default Checkbox;
