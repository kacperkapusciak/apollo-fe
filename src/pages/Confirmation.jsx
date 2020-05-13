import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Rating from 'react-rating';
import {v4 as uuidv4} from 'uuid';
import { motion } from 'framer-motion';

import axios from 'axios-instance';

import Button from 'components/Button';
import Card from 'components/QuestionCard';

import StarOn from 'assets/StarOnIcon.svg';
import StarOff from 'assets/StarOffIcon.svg';

const Header = styled.h2`
  font-weight: normal;
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


const variants = {
  visible: { opacity: 1, height: 273 },
  fadeout: { opacity: 0, height: 0, transition: { duration: 0.5, delay: 1.5} }
};

const OpinionSentAlert = styled(motion.div).attrs(() => ({ initial: "visible", variants }))`
  font-size: 24px;
  text-align: center;
`;

const defaultResult = () => ({
    id: uuidv4(),
    value: '',
    answers: [defaultAnswer()],
    type: 'multi',
});

const defaultAnswer = () => ({
    id: uuidv4(),
    value: '',
    count: 0
});


const initialValues = [defaultResult()];

function Confirmation(props) {

    const [results, setResults] = useState(initialValues);
    const [rating, setRating] = useState(0);
    const [isOpinionSet, setIsOpinionSet] = useState(false);
    const [isOpinionSubmitted, setIsOpinionSubmitted] = useState(false);

    useEffect(() => {
    async function loadResults() {
      const { data } = await axios.get('results');
      if (data) {
        setResults(data);
      }
    }
    loadResults()
    }, []);

    return (
      <>
        <Header>Twoje odpowiedzi zostały przekazane</Header>
        {!isOpinionSubmitted ? (
          <OpinionWrapper>
          <OpinionHeader>Twoja opinia ma znaczenie</OpinionHeader>
          <OpinionText>Jak oceniasz swoje doświadczenie z Apollo?</OpinionText>
          <RatingWrapper>
            <Rating
              emptySymbol={<img src={StarOff}/>}
              fullSymbol={<img src={StarOn}/>}
              onClick = {(value) => {
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
                onClick={() => {
                  console.log(rating);
                  setIsOpinionSubmitted(true);
                }}
            >
                Prześlij
            </Button>
          </ButtonWrapper>
      </OpinionWrapper>
      ):(
      <OpinionSentAlert animate="fadeout" >
          Dziękujemy!
      </OpinionSentAlert>
      )}
      <div>
        <p>Odpowiedzi:</p>
        {results.map((result, rIndex) => (
          <Card key={rIndex}>
            {result.value}
            {result.answers.map((answer, aIndex) => (
              <>
                <br/>
                {answer.value} : {answer.count}
              </>
            ))}
          </Card>
        ))}
      </div>
    </>
    );
}

export default Confirmation;
