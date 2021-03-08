// import { Component } from 'react';
import { lazy, Suspense } from 'react';
import './App.css';
import React from 'react';
import { Switch, Route} from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
import Container from '../Container';
//import { ToastContainer } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';


const HomePage = lazy(() =>
  import('../../views/HomePage' /* webpackChunkName: "home-view" */),
);
const NotFoundView = lazy(() =>
  import('../../views/NotFoundView'));


const App = () => (
  <div>
    <Container>
         <Suspense fallback={<h1>ЗАГРУЖАЕМ МАРШРУТ...</h1>}>
    <Switch>
          <Route path="/" component={HomePage}></Route>
          <Route>
            <NotFoundView />
          </Route>
          {/* <ToastContainer autoClose={3000} />  */}
      </Switch>
      </Suspense>
      </Container>
  </div>
);

export default App;
