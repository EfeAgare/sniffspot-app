import axios from "axios";

// Solve Can't verify CSRF token authenticity. ActionController::InvalidAuthenticityToken

const CSRFtoken = document.querySelector('[name="csrf-token"]') || {
	content: "no-csrf-token",
};

const dev_url = `http://localhost:3000/api/v1`
const prod_url = "https://sniffspot-app.onrender.com/api/v1"

export default axios.create({
	baseURL: prod_url,
	headers: {
		"Content-Type": "application/json",
		common: {
			"X-CSRF-Token": CSRFtoken.content,
		},
	},
});

export const multipartAPi = axios.create({
	baseURL: prod_url,
	headers: {
		"Content-Type": "multipart/form-data",
		common: {
			"X-CSRF-Token": CSRFtoken.content,
		},
	},
});
