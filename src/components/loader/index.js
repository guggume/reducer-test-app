import React, { PureComponent } from 'react';

export default class Loader extends PureComponent {
  state = {
    hide: true,
  };

  componentDidMount() {
    this.timer = setTimeout(() => this.setState({ hide: false }), 300);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    return this.state.hide ? <div></div> : <div>Loading...</div>;
  }
}
