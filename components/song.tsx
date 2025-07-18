"use client";
import { useState } from "react";
import { Button } from "@heroui/button";

export default function SongGenerator() {
  const [songs, setSongs] = useState<any[]>([]);
  const [mood, setMood] = useState("");
  const [isLoading, setLoading] = useState(false);

  const loadingbtn = async () => {
    setLoading(true);
    try {
      // Your logic to fetch songs here
      await loadingbtn(); // Example async function
    } finally {
      setLoading(false);
    }
  };

  const generateSongs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        body: JSON.stringify({ mood }),
      });

      const data = await res.json();
      setSongs(data.songs);
    } catch (error) {
      console.log("Error fetching songs", error);
    } finally {
      setLoading(false); //stop loading
    }
  };

  return (
    <div className="m-5">
      <h1 className="mb-4 font-serif text-2xl underline font-bold">
        Haitian Music Discovery 🎶
      </h1>

      <input
        type="text"
        className="p-3 m-2 rounded-lg "
        placeholder="Type your fav song.."
        value={mood}
        onChange={(e) => setMood(e.target.value)}
      />
      <Button onClick={generateSongs} color="primary">
        {isLoading ? "Loading..." : "Get songs"}
      </Button>

      <ul>
        {songs.map((song, index) => (
          <li key={index} style={{ marginBottom: "1rem" }}>
            <strong>{song.title}</strong> - {song.artist} <br />
            <audio controls src={song.preview}></audio> <br />
            <Button color="primary" variant="shadow">
              <a href={song.link} target="_blank" rel="noopener noreferrer">
                Listen on Deezer
              </a>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
