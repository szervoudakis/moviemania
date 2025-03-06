<?php
namespace Drupal\best_movies\Service;

use GuzzleHttp\Client;
use Drupal\Core\Config\ConfigFactoryInterface;

class MovieApiService {
    protected $httpClient;
    protected $apiKey;
    protected $apiHost;
    //dependency injection for httpCliend and configs for apikey apihost
    public function __construct(Client $httpClient, ConfigFactoryInterface $configFactory) {
        $this->httpClient = $httpClient;
        $this->apiKey = $configFactory->get('best_movies.settings')->get('api_key');
        $this->apiHost = $configFactory->get('best_movies.settings')->get('api_host');
    }
     //fetch top250 movies, create headers, and url
     public function fetchTop250Movies() {
        $url = 'https://imdb236.p.rapidapi.com/imdb/top250-movies';
        $headers = [
            'x-rapidapi-host' => $this->apiHost,
            'x-rapidapi-key' => $this->apiKey,
        ];

        // echo $this->apiKey;
        
        $response = $this->httpClient->request('GET', $url, ['headers' => $headers]);

        return json_decode($response->getBody()->getContents(), true);
    }
}
