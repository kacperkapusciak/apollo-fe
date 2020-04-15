import React from 'react';
import styled from 'styled-components';

import Container from 'components/Container';
import Button from 'components/Button';
import SharePoll from 'modals/SharePoll';

import logo from 'assets/apollo_nav.png'

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

function Navigation(props) {
  const { isCreator, modal } = props;

  return (
    <Wrapper>
      <Container size='lg'>
        {isCreator ? (
          <Align>
            <img src={logo} alt='' />
            <div>
              <span>2137</span>
              <Button
                btnType="secondary"
                size="lg"
                onClick={() => modal.open(<SharePoll/>)}
              >
                udostępnij
              </Button>
            </div>
          </Align>
        ) : (
          <img src={logo} alt='' />
        )}
      </Container>
    </Wrapper>
  );
}

export default withModal(Navigation);
