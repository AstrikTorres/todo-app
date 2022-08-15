import React from "react";

function SignUp({ setOpenModalSignUp, setIsLoged, saveToken, setOpenModalLogin }) {
    const form = React.useRef(null);

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData(form.current);
		const data = {
			username: formData.get('username'),
			password: formData.get('password')
		}
		if (data.username !== '' && data.password !== '') {
			fetch('http://localhost:8080/api/users', {
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(response => response.status)
              .then(status => {
                if (status === 201) {
                    fetch('http://localhost:8080/api/login', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                    })
                    .then(response => response.headers.get('Authorization'))
                    .then(token => {
                        saveToken(token);
                        setIsLoged(true);
                        setOpenModalSignUp(prevState => !prevState);
                    })
                } else {
                    setIsLoged(false);
                }
            })
		}
	}

	const handleLogin = () => {
        setOpenModalSignUp(prevState => !prevState);
        setOpenModalLogin(prevState => !prevState);
	}
	
    return (
        <div className="sign-up">
			<div className="sign-up-container">
                <h1>Sign Up</h1>
				<form className="form" ref={form}>
					<label htmlFor="username" className="label">Username</label>
					<input type="text" name="username" placeholder="user" className="input input-username" />
					<label htmlFor="password" className="label">Password</label>
					<input type="password" name="password" placeholder="*********" className="input input-password" />
					<button
						className="primary-button sign-up-button"
						onClick={handleSubmit}
					>
						Create Account
					</button>
				</form>
				<button
					onClick={handleLogin}
					className="secondary-button login-button"
				>
					Login
				</button>
			</div>
		</div>
  );
}

export {SignUp};