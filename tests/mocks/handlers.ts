import { HttpResponse, http } from "msw";

const BASE_URL = "http://ec2-50-19-36-138.compute-1.amazonaws.com";

export const handlers = [
	http.post(`${BASE_URL}/api/query/search`, async ({ request }) => {
		const body = (await request.json()) as Record<string, unknown>;
		const selector = (body?.query as Record<string, Record<string, string>>)
			?.selector;
		const assetType = selector?.["@assetType"];

		if (assetType === "tvShows") {
			return HttpResponse.json({
				result: [
					{
						"@assetType": "tvShows",
						"@key": "tvShows:1",
						name: "Breaking Bad",
						genre: "Drama",
					},
				],
			});
		}

		return HttpResponse.json({ result: [] });
	}),

	http.post(`${BASE_URL}/api/query/readAsset`, () => {
		return HttpResponse.json({
			"@assetType": "tvShows",
			"@key": "tvShows:1",
			name: "Breaking Bad",
			genre: "Drama",
		});
	}),
];
