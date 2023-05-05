// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logoimg from './images/flairbnb_logo2.png'

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div id='nav-container'>
        <div className='home-btn'>
          <li>
            <NavLink exact to="/" className='nav-logo'>
                <img className='logoimg' src={logoimg} alt='logo' />
            </NavLink>
          </li>
        </div>
            {isLoaded && (
              <div className='profile-btn'>
                <li>
                  <ProfileButton user={sessionUser} />
                </li>
              </div>
            )}
            {!sessionUser || (
              <div  className='create-new-spot'>
                <li>
                    <NavLink to="/spots/new">Create a New Spot</NavLink>
                </li>
              </div>
            )}
    </div>
  );
}

export default Navigation;