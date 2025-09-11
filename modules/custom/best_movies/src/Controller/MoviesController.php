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
use Symfony\Component\HttpFoundation\Request;

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
    
    public function renderDashboard(){
        return [
            '#theme' => 'dashboard_page',
            '#attached' => [
                'library' => [
                    'movie_mania_theme/react_app',
                ],
             ]
            ];
    }

    public function renderWatchlist(){
        return [
            '#theme' => 'watchlist_page',
            '#attached' => [
                'library' => [
                    'movie_mania_theme/react_app',
                ],
             ]
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
   
    public function addToWatchlistRequest(Request $request) {
        $data = json_decode($request->getContent(), TRUE);
        $uid = \Drupal::currentUser()->id();
        $movie_id = $data['movie_id'] ?? NULL;
    
        if (!$uid || !$movie_id) {
          return new JsonResponse(['error' => 'Invalid request'], 400);
        }
    
        $this->movieModel->addToWatchList($movie_id, $uid);
        return new JsonResponse(['status' => 'success']);
    }

    public function removeFromWatchlistRequest(Request $request) {
        $data = json_decode($request->getContent(), TRUE);
        $uid = \Drupal::currentUser()->id();
        $movie_id = $data['movie_id'] ?? NULL;
    
        if (!$uid || !$movie_id) {
          return new JsonResponse(['error' => 'Invalid request'], 400);
        }
    
        $this->movieModel->removeFromWatchList($movie_id, $uid);
        return new JsonResponse(['status' => 'deleted']);
    }

    //return array of movies for user's watchlist
    public function myWatchlist() {
        
        $uid = \Drupal::currentUser()->id();
        $watchlist = $this->movieModel->mywatchlist($uid);
       //return a JsonResponse with the watchlist ids
      return new JsonResponse($watchlist);
    }

    public function myWatchListWithInfo(){
        $uid = \Drupal::currentUser()->id();
        $watchlist = $this->topMoviesService->getWatchListResponse($uid);
    
        return new JsonResponse($watchlist);
    }
      
}
