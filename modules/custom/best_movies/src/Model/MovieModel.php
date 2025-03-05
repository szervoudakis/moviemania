<?php
namespace Drupal\best_movies\Model;

use Drupal\Core\Database\Connection;
use DateTime;
class MovieModel {
  
    protected $database;

    // Constructor with Dependency Injection for database connection
    public function __construct(Connection $database) {
        $this->database = $database;
    }

    //helper method to build the base query for movies
    protected function buildMovieQuery($year = NULL){
        $query = $this->database->select('node_field_data', 'n');
        $query->fields('n', ['title', 'nid']);
        $query->join('node__field_release_year', 'rd', 'n.nid = rd.entity_id');
        $query->join('node__body', 'bd', 'n.nid = bd.entity_id');
        $query->join('node__field_type', 'mt', 'n.nid = mt.entity_id');
        $query->join('node__field_url_imdb', 'l', 'n.nid = l.entity_id');
        $query->condition('n.type', 'movies');
        $query->addField('rd', 'field_release_year_value', 'release_date');
        $query->addField('mt', 'field_type_value', 'field_type');
        $query->addField('bd', 'body_value', 'description');
        $query->addField('l', 'field_url_imdb_uri', 'url');

        // Apply the year filter if provided
        if ($year != '') {
            $dateTime = new DateTime($year);
            $dateTime->modify('+1 year');
            $increaseDate = $dateTime->format('Y-m-d');
            $query->condition('rd.field_release_year_value', $year, '>=');
            $query->condition('rd.field_release_year_value', $increaseDate, '<');
        }
       $query->orderBy('rd.field_release_year_value','DESC');
       
        return $query;
    }

    // Fetch upcoming movies based on a specific year
    public function getUpcomingMovies($year) {
       
       $query = $this->buildMovieQuery($year);

       $results = $query->execute()->fetchAll();
      
      return $results;
    }

    // Fetch all movies
    public function getMovies() {
        
        $query = $this->buildMovieQuery(); //create the base query for movie table
        
        $results = $query->execute()->fetchAll();

        return $results;
    }

    public function insertMovies($results=false){

        foreach ($results as $movieData) {
            // check if realease date exists
            if (!empty($movieData['releaseDate'])) {
                $date = DateTime::createFromFormat('Y-m-d', $movieData['releaseDate']);
                $formattedDate = $date ? $date->format('Y-m-d') : null;
            } else {
                $formattedDate = null;
            }
           //insert into content type movies the best 250 movies based on IMdb
            $node = \Drupal::entityTypeManager()->getStorage('node')->create([
                'type' => 'movies',
                'title' => $movieData['originalTitle'],
                'field_type' => $movieData['type'], 
                'field_movie_title' => $movieData['primaryTitle'],
                'field_url_imdb' => $movieData['url'],
                'body' => [
                    'value' => $movieData['description'],
                    'format' => 'full_html', 
                ],
                'field_release_year' => $formattedDate ? ['value' => $formattedDate] : null,
            ]);
        
            $node->save();
        } 

    }
    
}
