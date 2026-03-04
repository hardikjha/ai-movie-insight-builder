import { Movie } from "@/types/movie"

export async function fetchMovie(id: string): Promise<Movie> {
  const res = await fetch(
    `https://www.omdbapi.com/?i=${id}&apikey=${process.env.OMDB_API_KEY}`
  )

  if (!res.ok) {
    throw new Error("Failed to fetch movie")
  }

  return res.json()
}