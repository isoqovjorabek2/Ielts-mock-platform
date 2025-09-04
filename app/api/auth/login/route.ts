import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password } = body ?? {};

        // Simple mock auth - replace with real validation / DB lookup
        if (email === "test@example.com" && password === "password") {
            return NextResponse.json(
                {
                    token: "fake-jwt-token",
                    user: { email },
                },
                { status: 200 }
            );
        }

        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    } catch (err) {
        return NextResponse.json({ error: "Bad request" }, { status: 400 });
    }
}