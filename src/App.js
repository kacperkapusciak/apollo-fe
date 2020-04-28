import React, { lazy, Suspense, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import { ModalProvider } from 'providers/ModalProvider';
import GlobalStyle from 'styles/global';
import theme from 'styles/theme';

const Landing = lazy(() => import('pages/Landing'));
const Poll = lazy(() => import('pages/Poll'));
const Expired = lazy(() => import('pages/Expired'));


function App() {
  const [newPollInfo, setNewPollInfo] = useState({});

  const { pin } = newPollInfo;

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <ModalProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path="/">
                <Landing setNewPollInfo={setNewPollInfo}/>
              </Route>
              <Route exact path="/expired">
                <Expired />
              </Route>
              <Route path="/:pollUrl">
                <Poll pin={pin}/>
              </Route>
            </Switch>
            <GlobalStyle/>
          </Suspense>
        </ModalProvider>
      </Router>
    </ThemeProvider>
  );
}


export default App;
