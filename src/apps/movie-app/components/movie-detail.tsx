import * as React from 'react';

import { HttpClient } from 'lupa/utils/http-client';

import { Movie } from '../domains/movie';
import { API_KEY } from '../domains/api';

import '../styles/movie-detail.scss';

interface MovieDetailState {
  movie: Movie;
}
export class MovieDetail extends React.Component<{ match: any }, MovieDetailState> {

  fetching: boolean;
  fetchOptions = {
    api_key: API_KEY,
  };

  constructor(props: any) {
    super(props);
    this.state = {
      movie: null,
    };
  }

  componentDidMount() {
    this.fetchMovie();
  }

  fetchMovie() {
    if (this.fetching) {
      return;
    }
    this.fetching = true;
    const endpoint = `https://api.themoviedb.org/3/movie/${this.props.match.params.id}`;

    HttpClient.getInstance().fetch(endpoint, this.fetchOptions)
      .then((data: any) => this.onFetchMovieDone(data))
      .catch();
  }

  onFetchMovieDone(data: any) {
    const movie = Movie.createMovieDetailFromResponse(data);
    this.setState({ movie });
    this.fetching = false;
  }

  renderTitle(movie: Movie) {
    if (!movie.title) {
      return;
    }
    return (
      <div className="header-title">
        {movie.title}
        <span className="text-md ml-2">Relase date : {movie.releaseDate}</span>
      </div>
    );
  }

  renderPlayTrailerButton(movie: Movie) {
    return (
      <div className="play-trailer text-grey has-cursor">
        <i className="fa fa-play fa-1x text-grey" aria-hidden="true"></i>
        <span className="text-grey text-bold">Watch trailer</span>
      </div>
    );
  }

  renderMovieOverview(movie: Movie) {
    if (!movie.overview) {
      return;
    }
    return (
      <div>
        <div className="about">Overview</div>
        <div className="text-md">{this.state.movie.overview}</div>
      </div>
    );
  }

  renderMovieContent(movie: Movie) {
    if (!movie) {
      return;
    }

    return (
      <div className="movie-header" style={movie.getBackdropImageStyle()}>
        <div className="custom_bg">
          <div className="container">
            <a className="header-link has-cursor">
              <i className="fa fa-chevron-left" aria-hidden="true"></i>
              <span>Back to search results</span>
            </a>
            <div className="row">
              <div className="col-md-4">
                <div className="card has-cursor">
                  <div className="card-cover" style={movie.getBannerStyle()}></div>
                </div>
              </div>
              <div className="col-md-8 movie-content">
                {this.renderTitle(movie)}
                {this.renderPlayTrailerButton(movie)}
                {this.renderMovieOverview(movie)}
              </div>
            </div>
          </div>
        </div>
      </div >
    );
  }

  render() {
    const movie = this.state.movie;
    return <div className="movie-detail-page">{this.renderMovieContent(movie)}</div>;
  }
}