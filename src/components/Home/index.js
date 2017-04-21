import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './home.css';

class Home extends Component {
  render() {
    return (
      <div className="home">
        <h1>Home</h1>
        <Link to="/work">Work</Link>
      </div>
    );
  }
}

export default Home;
