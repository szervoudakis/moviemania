<?php

namespace Drupal\best_movies\Service;

use Drupal\best_movies\Model\MovieModel;

class TopMoviesService {
  protected $movieModel;

  public function __construct(MovieModel $movieModel) {
    $this->movieModel = $movieModel;
  }

  /**
   * Get the top 3 movies from the database.
   */
  public function getTopThreeMovies() {
    $movies = $this->movieModel->getMovies();
    $top3=array_slice($movies,0,3);
    return json_encode($top3,TRUE); 
  }
}
