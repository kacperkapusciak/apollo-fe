import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import styled from 'styled-components';
import { Form, Formik } from 'formik';
import { v4 as uuidv4 } from 'uuid';

import Navigation from 'components/Navigation';
import PollInfo from "modals/PollInfo";

import Questions from './Poll/Questions';
import Settings from './Poll/Settings';

import { withModal } from 'providers/ModalProvider';

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
  const location = useLocation();
  const { modal } = props;

  // remove slash from url
  const poll = location.pathname.substring(1);
  const pollInfoFromLocalStorage = JSON.parse(localStorage.getItem(poll)) || {};
  const isCreator = pollInfoFromLocalStorage.creator || false;

  useEffect(() => {
    // modal.open(<PollInfo/>)
  }, []);

  const defaultQuestion = () => ({
    id: uuidv4(),
    value: '',
    options: [''],
    type: 'single',
    text: ''
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
      <Navigation isCreator={isCreator}/>
      {isCreator ? (
        <Formik
          initialValues={initialValues}
          onSubmit={values => {
          }}
        >
          {({ values }) => (
            <FormStyled>
              <Layout>
                <Settings />
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


export default withModal(Poll);
