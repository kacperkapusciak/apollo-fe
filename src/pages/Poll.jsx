import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Form, Formik } from 'formik';
import { v4 as uuidv4 } from 'uuid';

import axios from 'axios-instance';

import Navigation from 'components/Navigation';
import Container from 'components/Container';
import { useHistory, useLocation } from 'react-router-dom';
import Questions from './Poll/Questions';
import Answers from './Poll/Answers'
import LeftPanel from './Poll/LeftPanel';

import { withAuth } from 'providers/AuthProvider';

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
  id: uuidv4(),
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

  for (const answer in answers) {
    if (typeof answers[answer] !== 'string') {
      const objCopy = { ...answers[answer] };
      answers[answer] = [];
      for (const property in objCopy)
        if (objCopy[property])
          answers[answer].push(property);
    }
  }

  return answers
};

function Poll(props) {
  const { auth } = props;
  const [questions, setQuestions] = useState(initialValues);
  const history = useHistory();
  const location = useLocation();


  useEffect(() => {
    async function loadQuestions() {
      const { data } = await axios.get('poll');
      if (data) {
        setQuestions(data);
      }
    }

    loadQuestions()
  }, []);

  return (
    <>
      <Navigation/>
      {!auth.isCreator ? (
        <Formik
          initialValues={initialValues}
          onSubmit={values => {
          }}
        >
          {({ values }) => (
            <FormStyled>
              <Layout>
                <LeftPanel sendSummary={values.settings.sendSummary}/>
                <Questions
                  defaultQuestion={defaultQuestion}
                  values={values}
                />
              </Layout>
            </FormStyled>
          )}
        </Formik>
      ) : (
        <Formik
          initialValues={questions}
          onSubmit={async values => {
            const formattedAnswer = formatAnswer(values);
            console.log(formattedAnswer);
            await axios.post('answer', formattedAnswer);
            history.push(`${location.pathname}/confirmation`);
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
