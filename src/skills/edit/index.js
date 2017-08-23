import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { store, actions } from 'redux-rest-reducer';
import Loader from '../../components/loader';

const get = actions.get(id => `/api/skills/${id}` , {
  PENDING: 'SKILLS_GET',
  SUCCESS: 'SKILLS_GET_SUCCESS',
  FAILURE: 'SKILLS_GET_FAILURE',
});

const put = actions.put(id => `/api/skills/${id}` , {
  PENDING: 'SKILLS_PUT',
  SUCCESS: 'SKILLS_PUT_SUCCESS',
  FAILURE: 'SKILLS_PUT_FAILURE',
});

const remove = actions.remove(id => `/api/skills/${id}` , {
  PENDING: 'SKILLS_DELETE',
  SUCCESS: 'SKILLS_DELETE_SUCCESS',
  FAILURE: 'SKILLS_DELETE_FAILURE',
});

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
