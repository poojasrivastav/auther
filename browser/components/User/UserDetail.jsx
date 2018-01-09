import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserItem from './UserItem';
import StoryItem from '../Story/StoryItem';
import { addStory } from '../../redux/stories';

/* -----------------    COMPONENT     ------------------ */

class UserDetail extends Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  render() {
    const { user, stories } = this.props;
    if (!user) return <div />  // the user id is invalid or data isn't loaded yet
    return (
      <div className="container">
        <UserItem user={user} />
        <div className="panel panel-warning">
          <div className="panel-heading">
            <h2 className="panel-title large-font">stories</h2>
          </div>
          <ul className="list-group">
            <form className="list-group-item story-item" onSubmit={this.onSubmit}>
              <input
                name="title"
                type="text"
                className="form-like"
                required
                placeholder="Story Title"
              />
              <button type="submit" className="btn btn-warning btn-xs">
                <span className="glyphicon glyphicon-plus" />
              </button>
            </form>
            {
              stories
              .filter(story => story.author_id === user.id)
              .map(story => <StoryItem story={story} key={story.id} />)
            }
          </ul>
        </div>
      </div>
    );
  }

  onSubmit(event) {
    event.preventDefault();
    const { addStory, user } = this.props;
    const story = {
      title: event.target.title.value,
      author_id: user.id
    };
    addStory(story);
    event.target.title.value = '';
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ users, stories }, ownProps) => {
  const paramId = Number(ownProps.match.params.id);
  return {
    user: users.find(user => user.id === paramId),
    stories
  };
};

const mapDispatch = { addStory };

export default connect(mapState, mapDispatch)(UserDetail);
