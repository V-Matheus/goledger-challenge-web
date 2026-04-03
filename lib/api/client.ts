import axios from "axios";

const isServer = typeof window === "undefined";

const serverApi = axios.create({
	baseURL: process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL,
	headers: { "Content-Type": "application/json" },
	auth: {
		username: process.env.API_USERNAME ?? "",
		password: process.env.API_PASSWORD ?? "",
	},
});

const clientApi = axios.create({
	baseURL: "/api/proxy",
	headers: { "Content-Type": "application/json" },
});

export const api = isServer ? serverApi : clientApi;
