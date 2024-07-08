import type { HttpContext } from '@adonisjs/core/http'
import { ofetch } from 'ofetch'

export default class MoviesController {
  constructor() {}

  async find({ request }: HttpContext) {
    try {
      const { page, type } = request.qs()
      const movies = await ofetch(
        `https://api.themoviedb.org/3/trending/${type}/day?api_key=${process.env.TMDB_API_KEY_AUTH}&language=en-US&page=${page}`
      )
      return movies
    } catch (error) {
      return error
    }
  }

  async get({ request }: HttpContext) {
    const { id } = request.params()
    const { type } = request.qs()
    try {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.TMDB_API_KEY_AUTH}`,
        },
      }
      const movie = await ofetch(
        `https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.TMDB_API_KEY_AUTH}&language=en-US`,
        options
      )
      const videos = await ofetch(
        `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${process.env.TMDB_API_KEY_AUTH}&language=en-US`,
        options
      )
      movie.videos = videos
      console.log(movie.videos)

      return movie
    } catch (error) {
      return error
    }
  }
}
