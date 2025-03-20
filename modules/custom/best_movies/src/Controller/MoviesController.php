<?php
namespace Drupal\best_movies\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\best_movies\Model\MovieModel;
use Drupal\best_movies\Form\FiltersForm;
use DateTime;
use Drupal\profile\Model\UserModel;
use Drupal\best_movies\Service\TopMoviesService;
use Symfony\Component\HttpFoundation\JsonResponse;

class MoviesController extends ControllerBase {

    protected $movieModel;
    protected $topMoviesService;

    // Constructor with Dependency Injection
    public function __construct(MovieModel $movieModel, UserModel $userModel, TopMoviesService $topMoviesService) {
        $this->movieModel = $movieModel;
        $this->userModel = $userModel;
        $this->topMoviesService = $topMoviesService;
    }

    // Static method to create the controller with the dependency injection
    public static function create(ContainerInterface $container) {
        return new static(
            $container->get('best_movies.movie_model'),
            $container->get('profile.profile_model'),
            $container->get('best_movies.top_movies_service'),
        );
    }

    //this function loads the react app in front end, in specific template called react_homepage
    public function homepage() {
        $infouser = $this->userModel->getUsername(); //because username is not sensitive info, we call UserModel getUsername function without using service based functions
    
        return [
            '#theme' => 'react_homepage',
            '#attached' => [
                'library' => [
                    'movie_mania_theme/react_app',
                ],
                'drupalSettings' => [
                    'movieMania' => [
                        'username' => $infouser,
                    ],
                ],
            ],
        ];
    }
    
    
    // Get Movies from db and return object for react
    public function renderMovies() {
       
        return [
            '#theme' => 'movies_page',
            '#attached' => [
                'library' => [
                    'movie_mania_theme/react_app',
                ],
            ],
        ];
    }
     /**
     * Returns all the years JSON response.
     */
    public function getAllyears() {
        $years = $this->topMoviesService->getAllYearsResponse();
      return new JsonResponse($years);
    }
    //this function is responsible to send the data to front end
    public function renderSortMovies($value = NULL) {
      $results = [];

       // Use the movie model to get upcoming movies
       //  if ($value != '') {
       $results = $this->movieModel->getUpcomingMovies($value);
       //}

      return [
        '#theme' => 'movies_page',
        '#attached' => [
            'library' => [
                'movie_mania_theme/react_app',
            ],
        ],
    ];
  }
}
