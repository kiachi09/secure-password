import React, { useState } from 'react';
import { FaClipboard } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	const [password, setPassword] = useState('');
	const [isgenerated, setIsGenerated] = useState(false);
	const [length, setLength] = useState(4);
	const [isError, setIsError] = useState(false);
	const [attributes, setAttributes] = useState({
		upperCase: true,
		lowerCase: true,
		numbers: true,
		symbols: true,
	});
	// toastify functions
	const clipboard = () => toast('Copied to clipboard');
	const choiceError = () => toast('Please select atleast one choice');
	const lengthError = () =>
		toast(`Password length is not between 4 and 20 characters`);
	const passwordGenerated = () => toast('Password is Generated.');

	const random = (min = 0, max = 1) => {
		return Math.floor(Math.random() * (max + 1 - min) + min);
	};

	const randomLower = () => {
		return String.fromCharCode(random(97, 122));
	};
	const randomUpper = () => {
		return String.fromCharCode(random(65, 90));
	};
	const randomSymbol = () => {
		const symbols = "~*$%@!?*'-=/.{}()[]<>";
		return symbols[random(0, symbols.length - 1)];
	};

	const generatePassword = () => {
		let newpassword = '';
		for (let i = 0; i < length; i++) {
			let choice = random(0, 3);
			if (attributes.lowerCase && choice === 0) {
				newpassword += randomLower();
			} else if (attributes.upperCase && choice === 1) {
				newpassword += randomUpper();
			} else if (attributes.numbers && choice === 2) {
				newpassword += random(0, 9);
			} else if (attributes.symbols && choice === 3) {
				newpassword += randomSymbol();
			} else {
				i--;
			}
		}
		return newpassword;
	};

	const handleChange = e => {
		const name = e.target.name;
		const value = e.target.checked;
		setAttributes({ ...attributes, [name]: value });
	};

	const handleSubmit = e => {
		e.preventDefault();
		if (!isgenerated) {
			setIsGenerated(true);
		}
		const typesCount = Object.values(attributes).filter(
			type => type === true,
		).length;

		if (!typesCount) {
			setPassword('');
			choiceError();
			setIsError(true);
		}
		if (length < 4 || length > 20) {
			lengthError();
			setIsError(true);
		}

		setPassword(generatePassword());
		passwordGenerated();
	};

	return (
		<>
			<main>
				<div className="container">
					<h2>Password Generator</h2>
					{isgenerated && !isError && (
						<div className="result-container">
							<span id="result">{password}</span>
							<button
								className="btn"
								id="clipboard"
								onClick={() => {
									navigator.clipboard.writeText(password);
									setPassword('');
									clipboard();
								}}
							>
								<FaClipboard />
							</button>
							<ToastContainer
								position="bottom-center"
								autoClose={3000}
								hideProgressBar={false}
								newestOnTop
								closeOnClick
								rtl={false}
								pauseOnFocusLoss
								draggable
								pauseOnHover
								theme="dark"
							/>
						</div>
					)}
					<div className="settings">
						<div className="setting">
							<label htmlFor="password-length">Password Length</label>
							<input
								type="number"
								name="length"
								min="4"
								max="20"
								value={length}
								onChange={e => setLength(e.target.value)}
							/>
						</div>
						<div className="setting">
							<label htmlFor="uppercase">Include uppercase letters</label>
							<input
								type="checkbox"
								name="upperCase"
								checked={attributes.upperCase}
								onChange={handleChange}
							/>
						</div>
						<div className="setting">
							<label htmlFor="lowercase">Include lowercase letters</label>
							<input
								type="checkbox"
								name="lowerCase"
								checked={attributes.lowerCase}
								onChange={handleChange}
							/>
						</div>
						<div className="setting">
							<label htmlFor="numbers">Include numbers</label>
							<input
								type="checkbox"
								name="number"
								checked={attributes.numbers}
								onChange={handleChange}
							/>
						</div>
						<div className="setting">
							<label htmlFor="symbols">Include symbols</label>
							<input
								type="checkbox"
								name="symbol"
								checked={attributes.symbols}
								onChange={handleChange}
							/>
						</div>
					</div>
					<button
						className="btn btn-large"
						type="submit"
						onClick={handleSubmit}
					>
						Generate password
					</button>
					<ToastContainer
						position="bottom-center"
						autoClose={2000}
						hideProgressBar={false}
						newestOnTop
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover
						theme="dark"
					/>
				</div>
			</main>
		</>
	);
}

export default App;
