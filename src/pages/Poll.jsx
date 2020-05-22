import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Form, Formik } from 'formik';

import axios from 'axios-instance';

import Navigation from 'components/Navigation';
import Container from 'components/Container';
import Button from 'components/Button';
import AutoSave from 'components/AutoSave';

import Questions from './Poll/Questions';
import Answers from './Poll/Answers'
import LeftPanel from './Poll/LeftPanel';
import Results from "./Results";

import { withAuth } from 'providers/AuthProvider';


const ContainerStyled = styled(Container)`
  display: flex;
  justify-content: flex-end;
`;
const Layout = styled.div`
  display: grid;
  grid-template-columns: 200px 768px 200px;
  grid-gap: 32px;
  margin: 0 auto;
`;
const FormStyled = styled(Form)`
  display: flex;
`;


const defaultQuestion = () => ({
  _id: '',
  value: '',
  options: [''],
  type: 'multi',
});

const initialValues = {
  questions: [defaultQuestion()],
  settings: {
    requireSignature: false,
    resultsAccess: 'me',
    sendSummary: false,
    email: '',
    expire: null
  }
};

const formatAnswer = values => {
  const { answers } = values;
  const { signature } = answers;
  delete answers.signature;
  const formattedAnswer = { answer: [], signature };

  for (const id in answers) {
    const item = { id, value: [] };

    if (typeof answers[id] === 'string')
      item.value.push(answers[id]);
    else
      for (const answer in answers[id])
        if (answers[id][answer])
          item.value.push(answer);

    formattedAnswer.answer.push(item);
  }

  return formattedAnswer
};

function Poll(props) {
  const { auth } = props;
  const [questions, setQuestions] = useState(initialValues);
  const [questionPanel, setQuestionPanel] = useState(true);

  const history = useHistory();
  const location = useLocation();

  const url = location.pathname.substr(1);

  useEffect(() => {
    async function loadQuestions() {
      const { data } = await axios.get(`poll/${url}`);
      if (data) {
        if (!data.questions.length) data.questions.push(defaultQuestion());
        setQuestions(data);
      }
    }

    loadQuestions();
  }, []);

  return (
    <>
      <Navigation/>
      {auth.isCreator ? (
        <>
          <ContainerStyled size="sm">
            <Button
              btnType="tertiary"
              size="sm"
              onClick={() => setQuestionPanel(!questionPanel)}
            >
              {questionPanel ? 'odpowiedzi >' : 'pytania >'}
            </Button>
          </ContainerStyled>
          <Formik
            initialValues={questions || initialValues}
            onSubmit={async (values, {setSubmitting} )=> {
              values.url = url;
              await axios.put('poll', values);
              setSubmitting(false);
            }}
            enableReinitialize
          >
            {({ values }) => (
              <FormStyled>
                <AutoSave />
                <Layout>
                  <LeftPanel sendSummary={values.settings.sendSummary} url={url}/>
                  {questionPanel ? (
                    <Questions
                      defaultQuestion={defaultQuestion}
                      values={values}
                    />
                  ) : (
                    <Results url={url}/>
                  )}
                </Layout>
              </FormStyled>
            )}
          </Formik>
        </>
      ) : (
        <Formik
          initialValues={questions || initialValues}
          onSubmit={async values => {
            const formattedAnswer = formatAnswer(values);
            formattedAnswer.url = url;

            const result = await axios.post('answer', formattedAnswer);
            if (result.status === 200) {
              history.push(`${location.pathname}/confirmation`);
            }
          }}
          enableReinitialize
        >
          {({ values, setFieldValue }) => (
            <FormStyled>
              <Container size="sm">
                <Answers values={values} setFieldValue={setFieldValue}/>
              </Container>
            </FormStyled>
          )}
        </Formik>
      )}
    </>
  );
}


export default withAuth(Poll);
