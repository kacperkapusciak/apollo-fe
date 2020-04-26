import React from 'react';
import styled from 'styled-components';
import { Field, FieldArray } from 'formik';

import Button from 'components/Button';
import Select from 'components/Select';
import Card from 'components/QuestionCard';
import Checkbox from 'components/Checkbox';
import Radio from 'components/Radio';

import CrossIcon from 'assets/CrossIcon.svg';

const RemoveQuestion = styled.img`
  position: absolute;
  right: 14px;
  top: 14px;
  cursor: pointer;
`;
const Input = styled(Field)`
  height: 40px;
  font-size: 18px;
  border: 2px solid transparent;
  border-radius: 8px;
  padding: 8px 16px;
  color: ${({ theme }) => theme.colors.neutral[600]};
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.neutral[400]};
  }
  &:placeholder-shown {
    border: 2px solid ${({ theme }) => theme.colors.neutral[200]};
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
const InputRow = styled.div`
  display: grid;
  grid-template-columns: 400px 1fr;
  grid-gap: 32px;
  margin-bottom: 12px;
`;
const OptionInput = styled(Field)`
  border: none;
  width: 100%;
  font-size: 14px;
`;
const OptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const OptionRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
`;
const RemoveOption = styled.button`
  height: 24px;
  width: 24px;
  background: ${({ theme }) => theme.colors.primary[100]};
  color: ${({ theme }) => theme.colors.primary[600]};
  font-size: 24px;
  font-weight: bold;
  border: 1px solid transparent;
  border-radius: 50%;
  cursor: pointer;
  line-height: 0;
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary[200]};
  }
`;
const AddOption = styled(Button)`
  font-size: 14px;
  padding: 0 24px;
`;
const Textarea = styled(Field)`
  border: 1px solid ${({ theme }) => theme.colors.neutral[400]};
  border-radius: 4px;
  height: 96px;
  width: 512px;
  resize: none;
  padding: 10px 10px 0px 8px;
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
              <RemoveQuestion src={CrossIcon} alt='' onClick={questionsHelper.pop}/>
              <InputRow>
                <Input name={`questions.${qIndex}.value`} placeholder="Zadaj pytanie..."/>
                <Field
                  name={`questions.${qIndex}.type`}
                  component={Select}
                  options={questionTypes}
                />
              </InputRow>
              {question.type === 'text' ? (
                <Textarea name={`questions.${qIndex}.text`} component="textarea" disabled/>
              ) : (
                <FieldArray name={`questions.${qIndex}.options`}>
                  {optionsHelper => (
                    <>
                      <OptionWrapper>
                        {question.options.map((option, oIndex) => (
                          <OptionRow key={`question-row-${oIndex}`}>
                            {question.type === 'multi' ? (
                              <Checkbox disabled/>
                            ) : question.type === 'single' ? (
                              <Radio disabled/>
                            ) : null}
                            <OptionInput
                              name={`questions.${qIndex}.options.${oIndex}`}
                              key={`question-field-${oIndex}`}
                              placeholder="Wpisz opcję..."
                            />
                            <RemoveOption type="button" onClick={optionsHelper.pop}>-</RemoveOption>
                          </OptionRow>
                        ))}
                      </OptionWrapper>
                      <AddOption
                        type="button"
                        size="sm"
                        btnType="tertiary"
                        onClick={() => optionsHelper.push('')}
                      >
                        dodaj opcje +
                      </AddOption>
                    </>
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
export { InputRow, OptionWrapper, Textarea };
