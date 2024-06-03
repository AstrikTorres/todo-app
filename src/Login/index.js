import React from "react";
import "./Login.css";

function Login({
  setOpenModalLogin,
  saveIsLoged,
  saveToken,
  setOpenModalSignUp,
  toggleDemo
}) {
	// username must be at least 3 characters long and can contain only letters, numbers and underscores. The first character must be a letter.
	const validUsername = /^[A-Za-z][A-Za-z0-9_.]{2,11}$/
	// password must be at least 4 characters long and can contain letters, numbers and some symbols like !@#$%^&*()_+=-
	const validPassword = /[A-Za-z0-9_!@#$%^&*()_+=-]{4,20}$/
	const form = React.useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    const data = {
      username: formData.get("email"),
      password: formData.get("password"),
    };
		
		if (!data.username.match(validUsername)) {
			document.getElementById("username").style.borderColor = 'red';
			document.getElementById('username-alert').innerHTML = 'Username is not valid';
		}
		if (data.username.match(validUsername)) {
			document.getElementById("username").style.borderColor = 'green';
			document.getElementById('username-alert').innerHTML = '';
		}
		if (!data.password.match(validPassword)) {
			document.getElementById("password").style.borderColor = 'red';
			document.getElementById('password-alert').innerHTML = 'Password is not valid';
		}
		if (data.password.match(validPassword)) {
			document.getElementById("password").style.borderColor = 'green';
			document.getElementById('password-alert').innerHTML = '';
		}

    if (data.username.match(validUsername) && data.password.match(validPassword)) {
      const response = await fetch(`${process.env.REACT_APP_API}/login`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
			const status = response.status;
			if (status === 200) {
				const token = response.headers.get("Authorization");
				saveToken(token);
				saveIsLoged(true);
				setOpenModalLogin(false);
			} else {
				document.getElementById("username").style.borderColor = 'red';
				document.getElementById("password").style.borderColor = 'red';
				document.getElementById('alert').innerHTML = 'Username or password is not valid';
			}
    }
  };

  const handleSignUp = () => {
    setOpenModalLogin((prevState) => !prevState);
    setOpenModalSignUp((prevState) => !prevState);
  };

  return (
    <div className="Login">
      <div className="Login-container">
        <form className="form" ref={form}>
          <h1 className="title">Log in</h1>
          <label htmlFor="email" className="label">
            Username
          </label>
          <input
            id="username"
            type="text"
            name="email"
            placeholder="platzi@example.cm"
            className="input input-email"
          />
					<label className="label-alert" id="username-alert"></label>
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="*********"
            className="input input-password"
          />
					<label className="label-alert" id="password-alert"></label>
          <button
            className="form-button form-button-add"
            onClick={handleSubmit}
          >
            Log in
          </button>
          <label className="label-alert" id="alert"></label>
        </form>
        <button
          onClick={handleSignUp}
          className="form-button form-button-signup"
        >
          Sign up
        </button>
        <button
          onClick={toggleDemo}
          className="form-button form-button-signup"
        >
          Omitir
        </button>
      </div>
    </div>
  );
}

export { Login };
