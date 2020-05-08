import React, {useEffect, useState} from 'react';
import Rating from 'react-rating';
import styled from "styled-components";
import Button from "../components/Button";
import Card from "../components/QuestionCard";
import axios from "../axios-instance";
import StarOn from "assets/StarOnIcon.svg"
import StarOff from "assets/StarOffIcon.svg"
import {v4 as uuidv4} from "uuid";

const Header = styled.h2`
  text-align: center;
  font-weight: normal;
  font-size: 30px;
  padding: 44px 0px 67px 0px;
`;

const OpinionHeader = styled.h3`
  font: Bold 20px/1px;
  text-align: center;
`;
const OpinionText = styled.p`
  font: Bold 18px/1px;
  text-align: center;
  padding-bottom: 24px;
`;
const RatingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-bottom: 14px;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 20px 0 40px 0;
`;
const OpinionWrapper = styled.div`
  padding-bottom: 34px;
`;
const AnswersWrapper = styled.div`
  margin: 0 auto;
  width: 50%;
`;
const OpinionSentText = styled.p`
  margin: 0 auto;
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
    const [isOpinionSent, setIsOpinionSent] = useState(false);

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
        {!isOpinionSent ? (
          <OpinionWrapper>
          <OpinionHeader>Twoja opinia ma znaczenie</OpinionHeader>
          <OpinionText>Jak oceniasz swoje doświadczenie z Apollo?</OpinionText>
          <RatingWrapper>
            <Rating
              emptySymbol={<img src={StarOff}/>}
              fullSymbol={<img src={StarOn}/>}
              onClick = {(value) => {
                  setRating(value);
                  setIsOpinionSent(true);
              }}
            />
          </RatingWrapper>
          <ButtonWrapper>
            <Button
                btnType="secondary"
                size="lg"
                onClick={console.log(rating)}
            >
                Prześlij
            </Button>
          </ButtonWrapper>
      </OpinionWrapper>
      ):(
      <OpinionSentText>
          Dziękujemy!
      </OpinionSentText>
      )}
      <AnswersWrapper>
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
        </AnswersWrapper>
    </>
    );
}

export default Confirmation;