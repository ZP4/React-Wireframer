import React from 'react';
import { NavLink } from 'react-router-dom';

class LoggedOutLinks extends React.Component {
  render() {
    return (
      <ul className = "right" >
        <li><NavLink to="/register"><span style={{color:"white"}}>Register</span></NavLink></li>
      </ul>
    );
  }
}

export default LoggedOutLinks;