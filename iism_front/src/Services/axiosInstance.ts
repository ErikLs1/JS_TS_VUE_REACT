import axios from "axios";
import {ILoginDto} from "@/Types/ILoginDto";

const axiosInstance = axios.create({
	baseURL: "http://localhost:5176/api/v1.0/",
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json"
	}
});

axiosInstance.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("_jwt");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);


axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},

	async (error) => {
		const originalRequest = error.config;
		if (error.response && error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				const jwt = localStorage.getItem("_jwt");
				const refreshToken = localStorage.getItem("_refreshToken");
				console.log("Refreshing with:", { jwt, refreshToken });
				const response = await axiosInstance.post<ILoginDto>(
					`Account/RenewRefreshToken?jwtExpiresInSeconds=5`,
					{ jwt, refreshToken }
				);

				console.log("RenewRefreshToken", response);

				if (response && response.status <= 300) {
					localStorage.setItem("_jwt", response.data.jwt);
					localStorage.setItem("_refreshToken", response.data.refreshToken);
					originalRequest.headers.Authorization = `Bearer ${response.data.jwt}`;
					return axiosInstance(originalRequest);
				}

				return Promise.reject(error)
			} catch(error) {
				console.error("Error refreshing token:", error);
				return Promise.reject(error);
			}
		}

		return Promise.reject(error);
	}
);

export default axiosInstance;
