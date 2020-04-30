import React from 'react';
import styled from 'styled-components';
import { Form, Formik } from 'formik';
import { v4 as uuidv4 } from 'uuid';

import Navigation from 'components/Navigation';

import Questions from './Poll/Questions';
import Settings from './Poll/Settings';

import { withAuth } from 'providers/AuthProvider';

const Layout = styled.div`
  display: grid;
  grid-template-columns: 160px 768px 160px;
  grid-gap: 24px;
  margin: 0 auto;
`;
const FormStyled = styled(Form)`
  display: flex;
`;

function Poll(props) {
  const { auth } = props;

  const defaultQuestion = () => ({
    id: uuidv4(),
    value: '',
    options: [''],
    type: 'single',
  });

  const initialValues = {
    questions: [defaultQuestion()],
    settings: {
      requireSignature: false,
      resultsAccess: 'me',
      expire: null
    }
  };

  return (
    <>
      <Navigation/>
      {auth.isCreator ? (
        <Formik
          initialValues={initialValues}
          onSubmit={values => {
          }}
        >
          {({ values }) => (
            <FormStyled>
              <Layout>
                <Settings/>
                {console.log(JSON.stringify(values, undefined, 2))}
                <Questions
                  defaultQuestion={defaultQuestion}
                  values={values}
                />
              </Layout>
            </FormStyled>
          )}
        </Formik>
      ) : (
        <div>User</div>
      )}
    </>
  );
}


export default withAuth(Poll);
