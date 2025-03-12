<?php

namespace Drupal\best_movies\Controller;

use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Controller\ControllerBase;
use Drupal\best_movies\Service\TopMoviesService;
use Symfony\Component\HttpFoundation\JsonResponse;
class TopMoviesController extends ControllerBase {
  protected $topMoviesService;

  public function __construct(TopMoviesService $topMoviesService) {
    $this->topMoviesService = $topMoviesService;
  }

  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('best_movies.top_movies_service')
    );
  }



    /**
     * Returns top 3 movies as JSON response.
     */
    public function getTopMovies() {
        $topMovies = $this->topMoviesService->getTopThreeMovies();
        return new JsonResponse($topMovies);
    }

}