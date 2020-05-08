import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import Button from 'components/Button';

const Wrapper = styled.nav`
  display: flex;
  justify-content: space-between;
`;
export const Header = styled.h5`
  text-align: center;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.neutral[700]};
  font-size: 28px;
  margin-bottom: 64px;
`;

function DeletePoll(props) {
  const { closeModal } = props;
  const history = useHistory();

  function deletePoll() {
    // TODO: request backend to set poll as expired
    closeModal();
    history.push("/expired");
  }

  return (
    <>
      <Header>Czy na pewno chcesz usunąć ankietę?</Header>
      <Wrapper>
        <Button btnType="tertiary" onClick={closeModal} size="sm">anuluj</Button>
        <Button btnType="primary" onClick={deletePoll} size="sm">usuń</Button>
      </Wrapper>
    </>
  );
}

export default DeletePoll;
