<?php

namespace Drupal\best_movies\Commands;

use GuzzleHttp\Client;
use Drush\Commands\DrushCommands;
use Drupal\Core\Datetime\DrupalDateTime;
use Drupal\best_movies\Service\MovieApiService;
use Drupal\best_movies\Model\MovieModel;
use Psr\Log\LoggerInterface;

class BatchCommands extends DrushCommands {

    protected $movieApiService;
    protected $modelMovie;

     // Constructor with Dependency Injection
     public function __construct(MovieApiService $movieApiService, MovieModel $modelMovie) {
        $this->movieApiService = $movieApiService;
        $this->ModelMovie = $modelMovie;
    }

    public static function create(ContainerInterface $container) {
        return new static(
            $container->get('best_movies.movie_api_service'),
            $container->get('best_movies.movie_model')
        );
    }
    
    /**
    * call this for all movies
    *
    * @command best_movies:movies
    *
    * @aliases gmovies
    *
    * @usage best_movies:movies
    *
    */
    public function populateMovies() {
        
       $data=$this->movieApiService->fetchTop250Movies(); 
        
        $this->ModelMovie->insertMovies($data);
        $this->logger()->success("Successfully stored the best 250 movies (based on rating in IMDb)");
    }

    /**
     * Deletes all movies from the 'movies' content type.
     *
     * @command best_movies:deletemovies
     * @aliases deletemovies
     * @usage best_movies:deletemovies
     *   Deletes all nodes of type 'movies'.
     */
    public function deleteMovies() {
        $contentType = 'movies';

        // Ensure the MovieModel service is available
        if (!$this->ModelMovie) {
            $this->logger()->error('MovieModel service is not available.');
            return;
        }

        // Call the delete function from MovieModel
        $deletedCount = $this->ModelMovie->deleteMovies($contentType);

        // Log the outcome of the operation
        if ($deletedCount > 0) {
            $this->logger()->success("Successfully deleted $deletedCount movies from content type: $contentType.");
        } else {
            $this->logger()->warning("No movies found for deletion in content type: $contentType.");
        }
    }


}