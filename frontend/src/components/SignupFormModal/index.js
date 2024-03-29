import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  return (
    <>
    <div className="signup-form">
      <h1 className="signup-h1">Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p><input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          </p>
        </label>
        {errors.firstName && <p>{errors.firstName}</p>}
        <label>
          <p><input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          </p>
        </label>
        {errors.lastName && <p>{errors.lastName}</p>}
        <label>
          <p><input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          </p>
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label>
          <p><input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          </p>
        </label>
        {errors.username && <p>{errors.username}</p>}
        <label>
          <p><input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          </p>
        </label>
        {errors.password && <p>{errors.password}</p>}
        <label>
          <p><input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </p>
        </label>
        {errors.confirmPassword && (
          <p>{errors.confirmPassword}</p>
        )}
        <button 
        id="signup-button"
        disabled={!email.length || !firstName.length || password.length < 6 || !lastName.length || username.length <4 || password !== confirmPassword}  
        type="submit"
        >Sign Up</button>
      </form>
    </div>
    
    </>
    
  );
}

export default SignupFormModal;