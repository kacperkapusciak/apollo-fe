import React from 'react';
import styled from 'styled-components';
import { Field, FieldArray } from 'formik';

import Button from 'components/Button';
import Card from 'components/QuestionCard';
import Checkbox from 'components/Checkbox';
import Radio from 'components/Radio';
import { InputRow, OptionWrapper, Textarea } from './Questions'

const Head = styled.div`
  font-weight: normal;
  font-size: 18px;
  margin-bottom: 20px;
`;
const Name = styled.div`
  font-weight: normal;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.14px;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: left;
  width: 100%;
  padding: 20px 0 40px 0;
`;
const Input = styled(Field)`
  height: 40px;
  font-size: 18px;
  border: 2px solid transparent;
  border-radius: 8px;
  padding: 8px 16px;
  color: ${({ theme }) => theme.colors.neutral[600]};
  border: 2px solid ${({ theme }) => theme.colors.neutral[200]};
`;
const OptionRow = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
`;
const Answer = styled.div`
  font-size: 14px;
`;

function Answers(props) {
  const { values } = props;

  return (
    <FieldArray name="questions">
      <div>
        {values.questions.map((question, qIndex) => (
          <Card key={qIndex}>
            <Head>{question.value}</Head>
            {question.type === 'text' ? (
              <Textarea
                name={`questions.${qIndex}.text`}
                component="textarea"
                placeholder="Możesz tutaj opisać co dręczy twoją duszę własnymi słowami..."
              />
            ) : (
              <FieldArray name={`questions.${qIndex}.options`}>
                <OptionWrapper>
                  {question.options.map((option, oIndex) => (
                    <OptionRow key={`question-row-${oIndex}`}>
                      {question.type === 'multi' ? (
                        <Field name={`cb${qIndex}-${oIndex}`}>
                          {({ field }) => <Checkbox field={field}/>}
                        </Field>
                      ) : question.type === 'single' ? (
                        <Field name={`rd${qIndex}-${oIndex}`}>
                          {({ field }) => <Radio field={field}/>}
                        </Field>
                      ) : null}
                      <Answer>{option}</Answer>
                    </OptionRow>
                  ))}
                </OptionWrapper>
              </FieldArray>
            )}
          </Card>
        ))}
        {settings.requireSignature && (
          <>
            <Name>imie i nazwisko</Name>
            <InputRow><Input name='signature'/></InputRow>
          </>
        )}
        <ButtonWrapper>
          <Button
            btnType="secondary"
            size="lg"
            type="submit"
          >
            Wyślij
          </Button>
        </ButtonWrapper>
      </div>
    </FieldArray>
  );
}

export default Answers;
