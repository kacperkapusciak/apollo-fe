import styled from 'styled-components';

const Label = styled.label`
  display: block;
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 0.7px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.neutral[500]};
`;

export default Label;
