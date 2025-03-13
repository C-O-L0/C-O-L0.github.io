import React from "react";
import styled from "styled-components";

const RegisterForm = () => {
  return (
    <StyledWrapper>
      <form className="register-form">
        <p className="form-title">Register</p>
        <p className="form-message">New user? Sign-up now.</p>
        <div className="form-flex">
          <label className="form-label">
            <input className="form-input" type="text" required />
            <span className="form-span">Firstname</span>
          </label>
          <label className="form-label">
            <input className="form-input" type="text" required />
            <span className="form-span">Lastname</span>
          </label>
        </div>
        <label className="form-label">
          <input className="form-input" type="email" required />
          <span className="form-span">Email</span>
        </label>
        <label className="form-label">
          <input className="form-input" type="password" required />
          <span className="form-span">Password</span>
        </label>
        <label className="form-label">
          <input className="form-input" type="password" required />
          <span className="form-span">Confirm password</span>
        </label>
        <button className="form-submit">Submit</button>
        <p className="form-signin">
          Already have an account? <a href="#">Signin</a>
        </p>
      </form>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f0f0;
  font-family: "Poppins", sans-serif;
  padding: 0px;
  margin: 0px;

  .register-form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 100%;
    width: 350px;
    padding: 20px;
    border-radius: 20px;
    background-color: #1a1a1a;
    color: #fff;
    border: 1px solid #333;
  }

  .form-title {
    font-size: 28px;
    font-weight: 600;
    letter-spacing: -1px;
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 30px;
    color: #00bfff;
  }

  .form-title::before {
    width: 18px;
    height: 18px;
  }

  .form-title::after {
    width: 18px;
    height: 18px;
    animation: pulse 1s linear infinite;
  }

  .form-title::before,
  .form-title::after {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    border-radius: 50%;
    left: 0px;
    background-color: #00bfff;
  }

  .form-message,
  .form-signin {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.7);
  }

  .form-message {
    background: linear-gradient(to right, #1a1a1a, #00bfff, #ffffff);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-fill-color: transparent;
    background-size: 500% auto;
    animation: textShine 5s ease-in-out infinite alternate;
  }

  .form-signin {
    text-align: center;
  }

  .form-signin a:hover {
    text-decoration: underline royalblue;
  }

  .form-signin a {
    color: #00bfff;
  }

  .form-flex {
    display: flex;
    width: 100%;
    gap: 10px;
    flex-wrap: wrap;
  }

  .form-label {
    position: relative;
    flex: 1;
    min-width: calc(50% - 10px);
  }

  .form-input {
    background-color: #333;
    color: #fff;
    width: 100%;
    padding: 12px 0px 10px;
    outline: 0;
    border: 1px solid rgba(105, 105, 105, 0.397);
    border-radius: 10px;
  }

  .form-span {
    color: rgba(255, 255, 255, 0.5);
    position: absolute;
    left: 10px;
    top: 8px;
    font-size: 0.9em;
    cursor: text;
    transition: 0.3s ease;
  }

  .form-input:placeholder-shown + .form-span {
    top: 12.5px;
    font-size: 0.9em;
  }

  .form-input:focus + .form-span,
  .form-input:valid + .form-span {
    color: #00bfff;
    top: 0px;
    font-size: 0.7em;
    font-weight: 600;
  }

  .form-submit {
    border: none;
    outline: none;
    padding: 10px;
    border-radius: 10px;
    color: #fff;
    font-size: 16px;
    transition: 0.3s ease;
    background-color: #00bfff;
  }

  .form-submit:hover {
    background-color: #00bfff96;
  }

  @keyframes pulse {
    from {
      transform: scale(0.9);
      opacity: 1;
    }

    to {
      transform: scale(1.8);
      opacity: 0;
    }
  }

  @keyframes textShine {
    0% {
      background-position: 0% 50%;
    }
    100% {
      background-position: 100% 50%;
    }
  }

  @media (max-width: 768px) {
    .form-flex {
      flex-direction: column;
    }

    .form-label {
      min-width: 100%;
    }
  }
`;

export default RegisterForm;
