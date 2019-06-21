import React, { Component } from 'react';
import axios from 'axios';

export default class App extends Component {
  state = { jargon: [] };

  componentDidMount() {
    axios.get('/api/jargon/')
      .then((res) => {
        this.setState({ jargon: res.data });
      });
  }

  render() {
    const { jargon } = this.state;
    return (
      <ul>
        {jargon.map(term => (
          <div key={term._id}>
            <h4>{term.name}</h4>
            <p>{term.description}</p>
          </div>
        ))}
      </ul>
    );
  }
}
