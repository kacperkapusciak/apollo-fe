import React, { lazy, Suspense } from 'react';
import { ThemeProvider } from 'styled-components';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import { ModalProvider } from 'providers/ModalProvider';
import { withAuth } from 'providers/AuthProvider';

import GlobalStyle from 'styles/global';
import theme from 'styles/theme';

const Dummy = lazy(() => import('pages/Dummy'));
const Landing = lazy(() => import('pages/Landing'));
const Poll = lazy(() => import('pages/Poll'));
const Expired = lazy(() => import('pages/Expired'));
const Confirmation = lazy(() => import('pages/Confirmation'));


function App(props) {
  const { auth } = props;

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <ModalProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path="/" component={Landing}/>
              <Route exact path="/expired" component={Expired}/>
              <Route exact path="/:pollUrl">
                {auth.isAuthenticated ? <Poll/> : <Dummy/>}
              </Route>
               <Route exact path="/:pollUrl/confirmation" component={Confirmation}/>
            </Switch>
            <GlobalStyle/>
          </Suspense>
        </ModalProvider>
      </Router>
    </ThemeProvider>
  );
}


export default withAuth(App);
