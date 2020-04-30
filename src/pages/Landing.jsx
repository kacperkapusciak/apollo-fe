import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import axios from 'axios-instance';

import Button from 'components/Button';
import Container from 'components/Container';

import BlobImg from 'assets/LandingPageBlob.svg';
import LogoImg from 'assets/apollo_landing.png';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${BlobImg});
  background-repeat: no-repeat;
  background-position: top -300px right -256px;
`;
const Line = styled.div`
  height: 4px;
  background: ${({ theme }) => theme.colors.primary[700]};
`;
const Logo = styled.img`
  margin: 64px 0 200px 0;
`;
const Title = styled.h1`
  font-size: 48px;
  margin-bottom: 40px;
`;
const Text = styled.p`
  font-size: 24px;
  width: 800px;
  margin-bottom: 100px;
`;

function Landing(props) {
  let history = useHistory();
  const { setNewPollInfo } = props;

  const getNewPollInfo = async () => {
    const { data } = await axios.get('init');
    if (data) {
      setNewPollInfo(data);
      // add entry to local storage
      localStorage.setItem(data.url, JSON.stringify({ creator: true }));
      // redirect to new poll
      history.push(data.url);
    }
  };

  return (
    <Wrapper>
      <Line/>
      <Container size="lg">
        <Logo src={LogoImg} alt=''/>
        <Title>Błyskawiczne ankiety, którym możesz zaufać</Title>
        <Text>
          Twórz ankiety zabezpieczone PINem by móc w wiarygodny sposób poznawać opinię osób,
          na których najbardziej Ci zależy. Całkowicie za darmo.
        </Text>
        <Button type="button" onClick={getNewPollInfo}>Stwórz ankietę</Button>
      </Container>
    </Wrapper>
  );
}

export default Landing;
