import styled from 'styled-components';

const Button = styled.button`
  ${({ btnType, theme }) => {
  switch (btnType) {
    case 'primary':
      return `
        color: ${theme.colors.neutral[0]};
        background: ${theme.colors.primary[600]};
        border: 1px solid transparent;
        box-shadow: ${theme.shadow};
      `;
    case 'secondary':
      return `
        color: ${theme.colors.primary[700]};
        background: transparent;
        border: 2px solid ${theme.colors.primary[700]};
      `;
    case 'tertiary':
      return `
        color: ${theme.colors.neutral[600]};
        background: transparent;
        border: none;
      `;
    default:
      return `
        color: ${theme.colors.neutral[0]};
        background: ${theme.colors.primary[600]};
        border: 1px solid transparent;
      `;
    }
  }};
  ${({ size }) => {
    switch (size) {
      case 'sm':
        return `
          height: 40px;
          width: 100px;
          position: relative;
          align-self: center;
          padding: 0 28px;
          font-size: 16px;
        `;
      case 'lg':
        return `
          height: 48px;
          padding: 0 32px;
          font-size: 18px;
        `;
      default:
        return `
          height: 48px;
          padding: 0 32px;
          font-size: 18px;
        `;
    }  
  }};
  
  min-width: 128px;
  border-radius: 6px;
  text-transform: uppercase;
  font-weight: bold;
  transition: all 0.2s ease-in-out;
  
  &:hover {
    ${({ btnType, theme }) => {
      switch (btnType) {
        case 'primary':
          return `
            background: ${theme.colors.primary[700]};
          `;
        case 'secondary':
          return `
            color: ${theme.colors.primary[600]};
            border: 2px solid ${theme.colors.primary[600]};
          `;
        case 'tertiary':
          return `
            color: ${theme.colors.accent[400]};
          `;
        default:
          return `
            background: ${theme.colors.primary[700]};
          `;
      }
    }};
    cursor: pointer;
  }
  
  &:disabled {
    ${({ btnType, theme }) => {
    switch (btnType) {
      case 'primary':
        return `
            background: ${theme.colors.neutral[500]};
          `;
      case 'secondary':
        return `
            color: ${theme.colors.neutral[500]};
            border: 2px solid ${theme.colors.neutral[500]};
          `;
      case 'tertiary':
        return `
            color: ${theme.colors.neutral[500]};
          `;
      default:
        return `
            background: ${theme.colors.neutral[500]};
          `;
      }
    }};
    cursor: not-allowed;
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

export default Button;
