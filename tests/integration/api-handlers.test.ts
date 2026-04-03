import axios from "axios";
import { describe, expect, it } from "vitest";
import { handlers } from "../mocks/handlers";

const BASE_URL = "http://ec2-50-19-36-138.compute-1.amazonaws.com";

describe("MSW API Handlers", () => {
	it("search tvShows returns mocked data", async () => {
		const { data } = await axios.post(`${BASE_URL}/api/query/search`, {
			query: { selector: { "@assetType": "tvShows" } },
		});
		expect(data.result).toBeDefined();
		expect(data.result.length).toBeGreaterThan(0);
		expect(data.result[0]["@assetType"]).toBe("tvShows");
	});

	it("search non-tvShows returns empty result", async () => {
		const { data } = await axios.post(`${BASE_URL}/api/query/search`, {
			query: { selector: { "@assetType": "unknown" } },
		});
		expect(data.result).toEqual([]);
	});

	it("readAsset returns mocked show", async () => {
		const { data } = await axios.post(`${BASE_URL}/api/query/readAsset`, {
			key: { "@assetType": "tvShows", "@key": "tvShows:1" },
		});
		expect(data["@assetType"]).toBe("tvShows");
		expect(data["@key"]).toBe("tvShows:1");
	});

	it("handlers array is exported and non-empty", () => {
		expect(handlers).toBeDefined();
		expect(handlers.length).toBeGreaterThan(0);
	});
});
