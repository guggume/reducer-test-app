import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { store } from 'redux-rest-reducer';
import { Redirect } from 'react-router-dom';
import { post } from '../../actions/skills';
import uuid from 'uuid/v1';

class SkillCreate extends PureComponent {
  onSubmit = (e) => {
    e.preventDefault();

    const { skillId, onPOST } = this.props;

    console.log(skillId);
    onPOST(skillId, {
      name: this.nameEl.value,
    });
  }

  render() {
    const { skill__ } = this.props;

    return skill__ ? (
      <form onSubmit={this.onSubmit}>
        <label>Name:</label>
        <input
          type="text" placeholder="Name"
          ref={(el) => { this.nameEl = el; }}
        />
        <button type="submit">Create</button>
        <br/>
        <div>
          { skill__.isCreating && 'Creating...' }
          { skill__.isCreated && 'Created' }
          { skill__.isCreateFailed && 'Failed to Create' }
        </div>
      </form>
    ) : (
      <Redirect to={`/skills/${skill__.data.id}/edit`} />
    );
  }
}

class SkillCreateContainer extends PureComponent {
  render() {
    const { skill, skillId, actions } = this.props;

    return (
      <SkillCreate
        skill__={skill || {}}
        skillId={skillId}
        onPOST={actions.post}
      />
    );
  }
}

const selector = (() => {
  const id = uuid();

  return (state, { skillId, match }) => ({
    skill: store.get(state)({ id }),
    skillId: id,
  });
})();


const dispatcher = dispatch => ({
  actions: bindActionCreators({ post }, dispatch),
});

export default connect(selector, dispatcher)(SkillCreateContainer);
