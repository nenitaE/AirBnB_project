// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logoimg from './images/flairbnb_logo2.png'

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch()
  
  return (
    <div id='nav-container'>
        <div className='home-btn'>
          <li>
            <NavLink exact to="/" className='nav-logo'>
                <img className='logoimg' src={logoimg} alt='logo' />
            </NavLink>
          </li>
        </div>
        <div id='nav-bar-right'>
              <span className='profile-btn'>
                  {isLoaded && (
                    <span>
                      <li>
                        <ProfileButton user={sessionUser} />
                      </li>
                    </span>)}
              {!sessionUser || (
              <span  className='create-new-spot'>
                <li>
                    <NavLink to="/spots/new">Create a New Spot</NavLink>
                </li>
              </span>)}
              </span>
            </div>
        </div>
  );
}

export default Navigation;