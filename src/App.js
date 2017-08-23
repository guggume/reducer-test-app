import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import RestReducer from 'redux-rest-reducer';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled from 'styled-components';
import logger from 'redux-logger';
import SkillContainer from './skills';
import SkillEditContainer from './skills/edit';
import SkillCreateContainer from './skills/create';

let store = createStore(RestReducer({
  GET: 'SKILLS_GET',
  GET_SUCCESS: 'SKILLS_GET_SUCCESS',
  GET_FAILURE: 'SKILLS_GET_FAILURE',
  GET_ALL: 'SKILLS_GET_ALL',
  GET_ALL_SUCCESS: 'SKILLS_GET_ALL_SUCCESS',
  POST: 'SKILLS_POST',
  POST_SUCCESS: 'SKILLS_POST_SUCCESS',
  PUT: 'SKILLS_PUT',
  PUT_SUCCESS: 'SKILLS_PUT_SUCCESS',
  PUT_FAILURE: 'SKILLS_PUT_FAILURE',
  DELETE: 'SKILLS_DELETE',
  DELETE_SUCCESS: 'SKILLS_DELETE_SUCCESS',
  DELETE_FAILURE: 'SKILLS_DELETE_FAILURE',
}), applyMiddleware(thunk, logger));

const RouteWrapper = styled.div``;

class App extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <RouteWrapper>
            <Route exact path="/" component={SkillContainer} />
            <Route exact path="/skills" component={SkillContainer} />
            <Route
              exact path="/skills/create" component={SkillCreateContainer}
            />
            <Route exact path="/skills/:id/edit" component={SkillEditContainer} />
          </RouteWrapper>
        </Router>
      </Provider>
    );
  }
}

export default App;
