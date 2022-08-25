import React from "react";

function SignUp({
  setOpenModalSignUp,
  saveIsLoged,
  saveToken,
  setOpenModalLogin,
}) {
	// username must be at least 3 characters long and can contain only letters, numbers and underscores. The first character must be a letter.
	const validUsername = /^[A-Za-z][A-Za-z0-9_.]{2,11}$/
	// password must be at least 4 characters long and can contain letters, numbers and some symbols like !@#$%^&*()_+=-
	const validPassword = /[A-Za-z0-9_!@#$%^&*()_+=-]{4,20}$/
  const form = React.useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    const data = {
      username: formData.get("username"),
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
      fetch("http://localhost:8080/api/users", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.status)
        .then((status) => {
          if (status === 201) {
            fetch("http://localhost:8080/api/login", {
              method: "POST",
              body: JSON.stringify(data),
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((response) => response.headers.get("Authorization"))
              .then((token) => {
                saveToken(token);
                saveIsLoged(true);
                setOpenModalSignUp((prevState) => !prevState);
              });
          } else if (status === 303) {
            saveIsLoged(false);
						document.getElementById("username").style.borderColor = 'red';
						document.getElementById("alert").innerHTML = 'Username already exists';
          }
        });
    }
  };

  const handleLogin = () => {
    setOpenModalSignUp((prevState) => !prevState);
    setOpenModalLogin((prevState) => !prevState);
  };

  return (
    <div className="sign-up">
      <div className="sign-up-container">
        <form className="form" ref={form}>
          <h1 className="title">Sign Up</h1>
          <label htmlFor="username" className="label">
            Username
          </label>
          <input
            type="text"
            name="username"
            placeholder="user"
            className="input input-username"
						id="username"
          />
					<label className="label-alert" id="username-alert"></label>
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="*********"
            className="input input-password"
						id="password"
          />
					<label className="label-alert" id="password-alert"></label>
          <button
            className="form-button form-button-add"
            onClick={handleSubmit}
          >
            Create Account
          </button>
          <label className="label-alert" id="alert"></label>
        </form>
        <button
          onClick={handleLogin}
          className="form-button form-button-signup"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export { SignUp };
