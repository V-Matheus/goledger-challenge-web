import { type NextRequest, NextResponse } from "next/server";

const API_BASE_URL = process.env.API_URL ?? "";
const API_USERNAME = process.env.API_USERNAME ?? "";
const API_PASSWORD = process.env.API_PASSWORD ?? "";

const authHeader = `Basic ${Buffer.from(`${API_USERNAME}:${API_PASSWORD}`).toString("base64")}`;

export async function POST(
	request: NextRequest,
	{ params }: { params: Promise<{ path: string[] }> },
) {
	const { path } = await params;
	const targetPath = `/${path.join("/")}`;
	const body = await request.json();

	const response = await fetch(`${API_BASE_URL}${targetPath}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: authHeader,
		},
		body: JSON.stringify(body),
	});

	const data = await response.json();
	return NextResponse.json(data, { status: response.status });
}

export async function PUT(
	request: NextRequest,
	{ params }: { params: Promise<{ path: string[] }> },
) {
	const { path } = await params;
	const targetPath = `/${path.join("/")}`;
	const body = await request.json();

	const response = await fetch(`${API_BASE_URL}${targetPath}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: authHeader,
		},
		body: JSON.stringify(body),
	});

	const data = await response.json();
	return NextResponse.json(data, { status: response.status });
}

export async function DELETE(
	request: NextRequest,
	{ params }: { params: Promise<{ path: string[] }> },
) {
	const { path } = await params;
	const targetPath = `/${path.join("/")}`;
	const body = await request.json();

	const response = await fetch(`${API_BASE_URL}${targetPath}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			Authorization: authHeader,
		},
		body: JSON.stringify(body),
	});

	const data = await response.json();
	return NextResponse.json(data, { status: response.status });
}
