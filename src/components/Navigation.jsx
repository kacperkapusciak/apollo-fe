import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import Container from 'components/Container';
import Button from 'components/Button';
import SharePoll from 'modals/SharePoll';

import logo from 'assets/apollo_nav.png'

import { withAuth } from 'providers/AuthProvider';
import { withModal } from 'providers/ModalProvider';

const Wrapper = styled.nav`
  display: flex;
  align-items: center;
  height: 64px;
  width: 100%;
  background: ${({ theme }) => theme.colors.neutral[0]};
  box-shadow: ${({ theme }) => theme.shadow};
  margin-bottom: 28px;
`;
const Align = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Logo = styled.img`
  &:hover {
    cursor: pointer;
  }
`;

function Navigation(props) {
  const { auth, modal } = props;
  const history = useHistory();

  return (
    <Wrapper>
      <Container size='lg'>
        {auth.isCreator ? (
          <Align>
            <Logo src={logo} alt='' onClick={() => history.push('/')} />
            <Button
              btnType="secondary"
              size="lg"
              onClick={() => modal.open(<SharePoll/>)}
            >
              udostępnij
            </Button>
          </Align>
        ) : (
          <img src={logo} alt='' />
        )}
      </Container>
    </Wrapper>
  );
}

export default withAuth(withModal(Navigation));
