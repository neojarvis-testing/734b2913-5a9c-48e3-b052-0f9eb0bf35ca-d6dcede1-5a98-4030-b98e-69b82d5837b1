import React from 'react';

const Login = () => {
  return (
    <div className="login-container">
      <h1>BookFinder</h1>
      <p>BookFinder—an app to discover, explore, and recommend books tailored to your reading preferences.</p>

      <h2>Login</h2>

      <form>
        <div className="input-group">
          <label>Email</label>
          <input type="email" name="email" required />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input type="password" name="password" required />
        </div>

        <button type="submit">Login</button>
      </form>

      <p>Don't have an account? <a href="/signup">Signup</a></p>
    </div>
  );
}

export default Login;
