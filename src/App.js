import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import Feedback from './Feedback';
import AllFeedbacks from './AllFeedbacks'
import Modal from './Modal';


const hist = createBrowserHistory();


function App() {
  return (<>
    <Modal />
    <Router history={hist}>
      <Switch>
        <Route exact path="/" component={Feedback} />
        <Route exact path="/allFeedbacks" component={AllFeedbacks} />
      </Switch>
    </Router>
  </>);
}


export default App;
