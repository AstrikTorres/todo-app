import React from 'react';
import { TodoContext } from '../TodoContext';

function Login() {
  const {
    setOpenModalLogin,
		setIsLoged,
		saveToken,
	} = React.useContext(TodoContext);

  const onOut = () => {
    setOpenModalLogin(prevState => !prevState);
  };
  
  const form = React.useRef(null);

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData(form.current);
		const data = {
			username: formData.get('email'),
			password: formData.get('password')
		}
		if (data.username !== '' && data.password !== '') {
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
					setOpenModalLogin(prevState => !prevState);
				}
			)

		}
	}
	
  return (
    <div className="Login">
			<div className="Login-container">
				<form className="form" ref={form}>
					<label htmlFor="email" className="label">Email address</label>
					<input type="text" name="email" placeholder="platzi@example.cm" className="input input-email" />
					<label htmlFor="password" className="label">Password</label>
					<input type="password" name="password" placeholder="*********" className="input input-password" />
					<button
						className="primary-button login-button"
						onClick={handleSubmit}>
						Log in
					</button>
					<a href="/">Forgot my password</a>
				</form>
				<button
					className="secondary-button signup-button">
					Sign up
				</button>
			</div>
		</div>
  );
}

export { Login };