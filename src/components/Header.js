import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Header extends Component {
    render() {
        return(
            <nav className="navbar navbar-expand-lg navbar-light">
            <div className="row mr-auto">
                <div className="col nav-item">
                    <NavLink exact to="/" className="nav-link links" activeStyle={{
                        backgroundColor: 'grey',
                        color: 'white',
                        borderRadius: 5
                    }}>Home</NavLink>
                </div>
                <div className="col nav-item">
                    <NavLink to="/about" className="nav-link links" activeStyle={{
                        backgroundColor: 'grey',
                        color: 'white',
                        borderRadius: 5
                    }}>About</NavLink>
                </div>
            </div>
            </nav>
        )
    }
}

export default Header;