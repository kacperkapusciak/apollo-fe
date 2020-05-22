import React, { useState } from 'react';
import styled from 'styled-components';
import Rating from 'react-rating';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

import axios from 'axios-instance';

import Container from 'components/Container';
import Button from 'components/Button';

import StarOn from 'assets/StarOnIcon.svg';
import StarOff from 'assets/StarOffIcon.svg';

import Results from "./Results";

const Header = styled.h2`
  font-weight: normal;
  text-align: center;
  font-size: 36px;
  margin: 44px 0 67px 0;
`;
const OpinionHeader = styled.h3`
  font-size: 20px;
  font-weight: bold;
`;
const OpinionText = styled.p`
  margin-bottom: 24px;
`;
const RatingWrapper = styled.div`
  margin-bottom: 14px;
`;
const ButtonWrapper = styled.div`
  margin: 20px auto 32px;
`;
const OpinionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 34px;
`;
const ResultsHeader = styled.p`
  margin-bottom: 8px;
`;

const variants = {
  visible: { opacity: 1, height: 273 },
  fadeout: { opacity: 0, height: 0, transition: { duration: 0.5, delay: 1.5 } }
};

const OpinionSentAlert = styled(motion.div).attrs(() => ({ initial: "visible", variants }))`
  font-size: 24px;
  text-align: center;
`;

function Confirmation(props) {
  const [rating, setRating] = useState(0);
  const [isOpinionSet, setIsOpinionSet] = useState(false);
  const [isOpinionSubmitted, setIsOpinionSubmitted] = useState(false);

  let location = useLocation();
  const url = location.pathname.match(/[^/](.*)[/]/)[0].slice(0, -1);

  async function submitRating() {
    const result = await axios.post('rating', {
      url,
      rating
    });
    if (result.status === 200) {
      setIsOpinionSubmitted(true);
    }
  }

  return (
    <Container size="sm">
      <Header>Twoje odpowiedzi zostały przekazane</Header>
      {!isOpinionSubmitted ? (
        <OpinionWrapper>
          <OpinionHeader>Twoja opinia ma znaczenie</OpinionHeader>
          <OpinionText>Jak oceniasz swoje doświadczenie z Apollo?</OpinionText>
          <RatingWrapper>
            <Rating
              emptySymbol={<img src={StarOff}/>}
              fullSymbol={<img src={StarOn}/>}
              onClick={(value) => {
                setRating(value);
                setIsOpinionSet(true);
              }}
            />
          </RatingWrapper>
          <ButtonWrapper>
            <Button
              btnType="secondary"
              size="lg"
              disabled={!isOpinionSet}
              onClick={submitRating}
            >
              Prześlij
            </Button>
          </ButtonWrapper>
        </OpinionWrapper>
      ) : (
        <OpinionSentAlert animate="fadeout">
          Dziękujemy!
        </OpinionSentAlert>
      )}
      <ResultsHeader>Odpowiedzi:</ResultsHeader>
      <Results url={url}/>
    </Container>
  );
}

export default Confirmation;
