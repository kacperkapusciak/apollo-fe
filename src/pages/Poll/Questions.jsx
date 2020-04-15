import React from 'react';
import styled from "styled-components";
import { Field, FieldArray } from "formik";

import Button from 'components/Button';
import Select from 'components/Select';
import Checkbox from "components/Checkbox";
import Card from 'components/QuestionCard';

const Input = styled.input`
  width: 400px;
  font-size: 18px;
  border: 2px solid ${({ theme }) => theme.colors.neutral[200]};
  border-radius: 8px;
  padding: 10px 16px;
  color: ${({ theme }) => theme.colors.neutral[600]};
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.neutral[400]};
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

function Questions(props) {
  const { defaultQuestion, values } = props;

  const questionTypes = [
    { value: 'single', label: 'jednokrotny wybór' },
    { value: 'multi', label: 'wielokrotny wybór' },
    { value: 'text', label: 'odpowiedź tekstowa' },
  ];

  return (
    <FieldArray name="questions">
      {questionsHelper => (
        <div>
          {values.questions.map((question, qIndex) => (
            <Card key={qIndex}>
              <Field name={`questions.${qIndex}.value`}/>
              <Field
                name={`questions.${qIndex}.type`}
                component={Select}
                options={questionTypes}
              />
              {question.type === 'text' ? (
                <Field name={`questions.${qIndex}.text`} component="textarea"/>
              ) : (
                <FieldArray name={`questions.${qIndex}.options`}>
                  {optionsHelper => (
                    <div>
                      {values.questions[qIndex].options.map((option, oIndex) => (
                        <Field name={`questions.${qIndex}.options.${oIndex}`}/>
                      ))}
                      <Button
                        type="button"
                        size="sm"
                        btnType="tertiary"
                        onClick={() => optionsHelper.push('')}
                      >
                        dodaj opcje +
                      </Button>
                    </div>
                  )}
                </FieldArray>
              )}
            </Card>
          ))}
          <ButtonWrapper>
            <Button
              type="button"
              size="lg"
              btnType="tertiary"
              onClick={() => questionsHelper.push(defaultQuestion())}
            >
              dodaj pytanie +
            </Button>
          </ButtonWrapper>
        </div>
      )}
    </FieldArray>
  );
}

export default Questions;
