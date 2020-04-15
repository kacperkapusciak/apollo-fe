import styled from 'styled-components';

const Container = styled.div`
  width: ${({size}) => {
    switch (size) {
      case 'xl':
        return '1607px';
      case 'lg':
        return '1366px';
      case 'sm':
        return '768px';
      }
  }};
  margin: 0 auto;
`;

export default Container;
