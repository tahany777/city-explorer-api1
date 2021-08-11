'use strict';

class Movies {
  constructor(selected) {
    this.title = selected.original_title;
    this.vot = selected.vote_count;
    this.img = `https://image.tmdb.org/t/p/w500${selected.poster_path}`;
  }
}

module.exports=Movies;
