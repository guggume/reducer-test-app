import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled from 'styled-components';
import logger from 'redux-logger';
import skillsReducer from './reducers/skills';
import SkillContainer from './skills';
import SkillEditContainer from './skills/edit';
import SkillCreateContainer from './skills/create';

let store = createStore(skillsReducer, applyMiddleware(thunk, logger));

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
