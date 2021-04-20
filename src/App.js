import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_KEY, API_URL } from "./backend";

const App = () => {
	let cancelToken;
	const [values, setValues] = useState({
		from: "INR",
		to: "USD",
		amount: "",
	});

	const [result, setResult] = useState(0);

	const { from, to, amount } = values;

	useEffect(() => {
		convertCurrency();
	}, [amount, to]);

	// Convert
	const convertCurrency = async () => {
		if (typeof cancelToken != typeof undefined) {
			cancelToken.cancel("Canceling the previous request.");
		}

		cancelToken = axios.CancelToken.source();

		const response = await axios.get(
			`${API_URL}/${API_KEY}/pair/${from}/${to}`,
			{ cancelToken: cancelToken.token }
		);

		const r = response.data.conversion_rate * amount;
		setResult(r.toFixed(2));
		console.log(response.data.conversion_rate * amount);
	};

	const handleChange = (name) => (event) => {
		const value = event.target.value;
		setValues({ ...values, [name]: value });
	};

	return (
		<>
			<nav class="navbar navbar-light bg-light">
				<span class="navbar-brand mb-0 m-auto h1">Currency Converter</span>
			</nav>

			<div className="container">
				<div className="row mt-5" style={{justifyContent: "center"}}>
					<div className="col-lg-4 mt-2">
						<input
							type="number"
							value={amount}
							onChange={handleChange("amount")}
							placeholder="Enter amount in INR"
							className="form-control"
						/>
					</div>
					<div className="col-lg-2 mt-2">
						<select onChange={handleChange("to")} className="form-control">
							<option value="USD">USD</option>
							<option value="AED">AED</option>
							<option value="GBP">GBP</option>
							<option value="CAD">CAD</option>
							<option value="SGD">SGD</option>
							<option value="EUR">EUR</option>
							<option value="JPY">JPY</option>
							<option value="PKR">PKR</option>
							<option value="ZAR">ZAR</option>
							<option value="ALL">ALL</option>
						</select>
					</div>
				</div>

				<div className="row mt-2" style={{justifyContent: "center"}}>
					<div className="col-lg-4">
						<input
							type="number"
							value={result}
							className="form-control"
							readOnly
						/>
					</div>
          <div className="col-lg-2"></div>
				</div>
			</div>
		</>
	);
};

export default App;
