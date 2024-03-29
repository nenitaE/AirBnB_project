import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from 'react-router-dom';
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const demoUserLogin = (e) =>{
    e.preventDefault()
    dispatch(sessionActions.login({
      credential: 'Demo-lition',
      password: 'password'
    }))
    .then(closeModal)
    history.push('/');
  }

  return (
    <>
    <div class="login">
      <h1 className="login-h1">Log In</h1>
      <form onSubmit={handleSubmit}>
        <span>
        <label>
         <p> Username or Email</p>
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <p></p>
        <label>
          <p>Password</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        </span>
        <div className="login-button">
            {errors.credential && (
              <p>{errors.credential}</p>
            )}
            <button 
              type="submit"
              disabled={credential.length < 4 || password.length < 6} 
              id="submitButton"
              >Log In</button>
        </div>
        <div onClick={demoUserLogin} >
            <button id="demoButton">Demo User</button>
        </div>
      </form>
      </div>
    </>
  );
}

export default LoginFormModal;