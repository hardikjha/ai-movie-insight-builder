import Image from "next/image"
import { fetchMovie } from "@/services/omdb"

interface Props {
  params: Promise<{ id: string }>
}

export default async function MoviePage({ params }: Props) {
  const { id } = await params

  const movie = await fetchMovie(id)

  if (movie.Response === "False") {
    return <div className="p-10 text-red-500">Movie not found</div>
  }

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <div className="max-w-4xl mx-auto flex gap-8">
        <Image
          src={movie.Poster}
          alt={movie.Title}
          width={300}
          height={450}
          className="rounded-lg"
        />

        <div>
          <h1 className="text-4xl font-bold">{movie.Title}</h1>

          <p className="text-gray-400 mt-2">
            {movie.Year} • Rating: {movie.imdbRating}
          </p>

          <p className="mt-4">{movie.Plot}</p>

          <h2 className="mt-6 font-semibold">Cast</h2>
          <p>{movie.Actors}</p>
        </div>
      </div>
    </div>
  )
}