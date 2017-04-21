import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './work.css';

class Work extends Component {
  render() {
    return (
      <div className="work">
        <h1>Work</h1>
        <Link to="/">Home</Link>
      </div>
    );
  }
}

export default Work;
