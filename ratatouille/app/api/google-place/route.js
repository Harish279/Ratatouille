import { NextResponse } from "next/server";

const BASE_URL = "https://maps.googleapis.com/maps/api/place";
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const radius = searchParams.get("radius");
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");

    if (!category || !lat || !lng) {
      return NextResponse.json(
        { error: "Missing required query params" },
        { status: 400 }
      );
    }

    const apiUrl = `${BASE_URL}/textsearch/json?query=${category}&location=${lat},${lng}&radius=${radius}&key=${GOOGLE_API_KEY}`;

    console.log("👉 Fetching:", apiUrl); // 🔎 Log request

    const res = await fetch(apiUrl);

    const product = await res.json();

    console.log("👉 Google Response:", product); // 🔎 Log response

    if (product.error_message) {
      return NextResponse.json(
        { error: product.error_message },
        { status: 500 }
      );
    }

    return NextResponse.json({ product });
  } catch (error) {
    console.error("Google API error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
