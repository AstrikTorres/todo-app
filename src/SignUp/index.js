import React from "react";

function SignUp({ setOpenModalSignUp, setIsLoged, saveToken, setOpenModalLogin }) {
    const form = React.useRef(null);

	const handleSubmit = (e) => {
		e.preventDefault();
		
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
						className="primary-sbutton sign-up-button"
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