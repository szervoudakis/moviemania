<?php
namespace Drupal\best_movies\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\best_movies\Model\MovieModel;
use Drupal\best_movies\Form\FiltersForm;
use DateTime;
use Drupal\profile\Model\UserModel;

class MoviesController extends ControllerBase {

    protected $movieModel;

    // Constructor with Dependency Injection
    public function __construct(MovieModel $movieModel, UserModel $userModel) {
        $this->movieModel = $movieModel;
        $this->userModel = $userModel;
    }

    // Static method to create the controller with the dependency injection
    public static function create(ContainerInterface $container) {
        return new static(
            $container->get('best_movies.movie_model'),
            $container->get('profile.profile_model')
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
    
    
    // Get Movies from db and return object for template movies-page.html.twig
    public function renderMovies() {
        $results = $this->movieModel->getMovies();
        $filters = \Drupal::formBuilder()->getForm(FiltersForm::class);

        return [
            '#theme' => 'movies_page',
            '#movies' => $results,
            '#filters' => $filters,
            '#attached' => [
                'library' => [
                    'best_movies/moreinfo',
                ],
            ],
        ];
    }

    //this function is responsible to send the data to front end
    public function renderSortMovies($value = NULL) {
      $results = [];

      // Use the movie model to get upcoming movies
      if ($value != '') {
          $results = $this->movieModel->getUpcomingMovies($value);
      }

      return [
          '#theme' => 'movies_page',
          '#movies' => $results,
          '#attached' => [
              'library' => [
                  'best_movies/moreinfo',
              ],
          ],
      ];
  }
}
