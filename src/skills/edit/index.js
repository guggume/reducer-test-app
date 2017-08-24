import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { store } from 'redux-rest-reducer';
import Loader from '../../components/loader';
import { get, put, remove } from '../../actions/skills';

class SkillEdit extends PureComponent {
  onSubmit = (e) => {
    e.preventDefault();

    const { skill, skill__, onPUT } = this.props;

    !skill__.isUpdating && onPUT(skill.id, {
      ...skill,
      name: this.nameEl.value,
    }, skill__.__ETAG__);
  }

  onDelete = () => {
    const { skill, onDELETE } = this.props;

    onDELETE(skill.id);
  }

  render() {
    const { skill, skill__ } = this.props;

    return (
      <form onSubmit={this.onSubmit}>
        <label>Name:</label>
        <input
          type="text" placeholder="Name" defaultValue={skill.name}
          ref={(el) => { this.nameEl = el; }}
        />
        <button type="submit">Update</button>
        <button type="button" onClick={this.onDelete}>Delete</button>
        <br/>
        <div>
          { skill__.isUpdating && 'Updating...' }
          { skill__.isUpdated && 'Updated' }
          { skill__.isUpdateFailed && 'Failed to Update' }
        </div>
        <div>
          { skill__.isDeleting && 'Deleting...' }
          { skill__.isDeleted && 'Deleted' }
          { skill__.isDeleteFailed && 'Failed to Delete' }
        </div>
      </form>
    );
  }
}

class SkillEditContainer extends PureComponent {
  componentDidMount() {
    const { skill } = this.props;

    if (!skill || !skill.isLoading)
      this.props.actions.get(this.props.skillId);
  }

  render() {
    const { skill, actions } = this.props;

    if (skill && skill.isLoadFailed) {
      return <h1>404, Not Found</h1>
    } else if (skill && skill.data && !skill.isLoading) {
      return (
        <SkillEdit
          skill={skill.data} skill__={skill}
          onPUT={actions.put}
          onDELETE={actions.remove}
        />
      );
    }

    return <Loader />;
  }
}

const selector = (state, { match }) => ({
  skill: store.get(state)({ id: match.params.id }),
  skillId: match.params.id,
});

const dispatcher = dispatch => ({
  actions: bindActionCreators({ get, put, remove }, dispatch),
});

export default connect(selector, dispatcher)(SkillEditContainer);
