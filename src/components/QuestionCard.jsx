import styled from 'styled-components'

const QuestionCard = styled.div`
  position: relative;
  width: 100%;
  padding: 32px;
  margin-bottom: 32px;
  background: ${({ theme }) => theme.colors.neutral[0]};
  border: 1px solid transparent;
  border-radius: 16px;
  box-shadow: ${({ theme }) => theme.shadow};
  
  &:last-child {
    margin-bottom: 24px;
  }
`;

export default QuestionCard;
