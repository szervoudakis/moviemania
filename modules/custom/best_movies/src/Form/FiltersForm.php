<?php

namespace Drupal\best_movies\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Ajax\ReplaceCommand;
use Drupal\Core\Ajax\CommandInterface;
use Drupal\Core\Ajax\HtmlCommand;
use Drupal\best_movies\Controller\MoviesController;

class FiltersForm extends FormBase{

    /**
      * {@inheritdoc}
    */
    public function getFormId() {
        return 'movie_filter';
    }
    
    public function buildForm(array $form, FormStateInterface $form_state) {
       //generate a dynamic list of the last 10 years
       $currentYear = date('Y');
       $years = range($currentYear, $currentYear - 9);
       $year_options = ['' => $this->t('--Top Movies by year--')];
       //store the last 10 years in array
       foreach ($years as $year) {
        $dateValue = "$year-01-01";
        $year_options[$dateValue] = $this->t('@year year Movies', ['@year' => $year]);
       }

       $form['date'] = array(
            '#title' =>'Search by date',
            '#type' => 'select',
            '#description' => '',
            '#attributes' => array('class'=>array('date-option')),
            '#options' => $year_options, 
            '#default_value'=> '',
            '#ajax' => [
                'callback' => '::renderItems',
                'event' => 'change', 
              ],
        );
        

        return $form;
    }

    public function renderItems(array &$form, FormStateInterface $form_state){
      $themename = 'render_movies';
      $results = [];
      $date=$form_state->getValue('date');
  
      // Instantiate MovieModel and get upcoming movies
      $movieModel = \Drupal::service('best_movies.movie_model');
      $results = $movieModel->getUpcomingMovies($date);
  
      // Create a render array for the updated content
      $output = [
          '#theme' => $themename,
          '#movies' => $results,
      ];
  
      // Create an AjaxResponse
      $response = new AjaxResponse();
      $response->addCommand(new ReplaceCommand('#movie-items', $output));
  
      // **Explicitly attach the JS library**
      $response->setAttachments([
          'library' => [
              'best_movies/js/moreinfo',
          ],
      ]);
  
      return $response;    
    }

    public function validateForm(array &$form, FormStateInterface $form_state) {
        //check if the user enter....
    }

    public function submitForm(array &$form, FormStateInterface $form_state) {
      return 0;
    }
}