import { type NextRequest, NextResponse } from "next/server";

const API_BASE_URL = process.env.API_URL ?? "";
const API_USERNAME = process.env.API_USERNAME ?? "";
const API_PASSWORD = process.env.API_PASSWORD ?? "";

const authHeader = `Basic ${Buffer.from(`${API_USERNAME}:${API_PASSWORD}`).toString("base64")}`;

async function parseBody(request: NextRequest) {
	try {
		return await request.json();
	} catch {
		return undefined;
	}
}

async function proxyRequest(
	request: NextRequest,
	params: Promise<{ path: string[] }>,
	method: string,
) {
	const { path } = await params;
	const targetPath = `/${path.join("/")}`;
	const body = await parseBody(request);

	const response = await fetch(`${API_BASE_URL}${targetPath}`, {
		method,
		headers: {
			"Content-Type": "application/json",
			Authorization: authHeader,
		},
		...(body !== undefined && { body: JSON.stringify(body) }),
	});

	const data = await response.json();
	return NextResponse.json(data, { status: response.status });
}

export async function POST(
	request: NextRequest,
	{ params }: { params: Promise<{ path: string[] }> },
) {
	return proxyRequest(request, params, "POST");
}

export async function PUT(
	request: NextRequest,
	{ params }: { params: Promise<{ path: string[] }> },
) {
	return proxyRequest(request, params, "PUT");
}

export async function DELETE(
	request: NextRequest,
	{ params }: { params: Promise<{ path: string[] }> },
) {
	return proxyRequest(request, params, "DELETE");
}
