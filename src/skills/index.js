import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { store } from 'redux-rest-reducer';
import { Link } from 'react-router-dom';
import Loader from '../components/loader';
import { getAll } from '../actions/skills';

class Skills extends PureComponent {
  render() {
    const { skills } = this.props;

    return (
      <section>
        <h3>Skills</h3>
        <Link to="/skills/create">Create</Link>
        <br />
        <div>
          {
            skills.map(skill =>
              <div key={skill.id}>
                {skill.name}
                <Link to={`/skills/${skill.id}/edit`}>Edit</Link>
              </div>
            )
          }
        </div>
      </section>
    );
  }
}

class SkillsContainer extends PureComponent {
  componentDidMount() {
    this.props.actions.getAll();
  }

  render() {
    const { skills } = this.props;

    if (skills.isLoaded) {
      return <Skills skills={skills.data} />;
    }

    return <Loader />;
  }
}

const selector = (state => ({
  skills: store.getAll(state)(),
}));

const dispatcher = dispatch => ({
  actions: bindActionCreators({ getAll }, dispatch),
});

export default connect(selector, dispatcher)(SkillsContainer);
