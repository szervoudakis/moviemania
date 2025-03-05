<?php

namespace Drupal\best_movies\Commands;

use GuzzleHttp\Client;
use Drush\Commands\DrushCommands;
use Drupal\Core\Datetime\DrupalDateTime;
use Drupal\best_movies\Service\MovieApiService;
use Drupal\best_movies\Model\MovieModel;

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
        
        //$data=$this->movieApiService->fetchTop250Movies(); 
       // print_r($data);
       $jsonData = file_get_contents('temp.json');
       $data = json_decode($jsonData, true);

        // $results=$data['results'];  //put only results into php array
        
        $this->ModelMovie->insertMovies($data);
        echo"the top 250 movies stored in db!";
        echo"\n";
    }
    
}