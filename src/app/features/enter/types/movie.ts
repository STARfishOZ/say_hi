export interface Movie {
  title: string,
}
export interface MovieModel {
  Poster: string,
  Title: string,
  Type: string,
  Year: string,
  imdbID: string
}

export interface MovieDataResponse {
  Response: string,
  Search: MovieModel[],
  totalResults: string
}
