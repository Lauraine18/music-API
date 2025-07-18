import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { mood } = await req.json();

  // Build the search query for Haitian music based on the mood
  const query = `Haitian ${mood}`;

  try {
    // Call Deezer API
    const res = await fetch(
      `https://api.deezer.com/search?q=${encodeURIComponent(query)}`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch from Deezer API");
    }

    const data = await res.json();

    // Select the top 5 results
    const songs = data.data.slice(0, 5).map((track: any) => ({
      title: track.title,
      artist: track.artist.name,
      preview: track.preview, // 30-second audio preview
      link: track.link, // Link to full track on Deezer
    }));

    return NextResponse.json({ songs });
  } catch (error) {
    console.error("Error fetching songs:", error);
    return NextResponse.json(
      { error: "Failed to fetch songs" },
      { status: 500 }
    );
  }
}
