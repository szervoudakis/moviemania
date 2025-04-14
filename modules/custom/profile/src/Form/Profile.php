<?php

namespace Drupal\profile\Form;

use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\profile\Controller\UserController;
use Drupal\user\Entity\User;
use Drupal\Core\Url; 

class Profile extends FormBase{
    protected $userController;

    public function __construct(UserController $user_controller) {
        $this->userController = $user_controller;
    }

    public static function create(ContainerInterface $container) {
        return new static(
            $container->get('profile.user_controller')
        );
    }
   
    public function getFormId() {
        return 'profile_view';
    }

    public function buildForm(array $form, FormStateInterface $form_state) {
        $user_data = $this->userController->userInformation();
    
        // username field
        $form['user_name'] = [
            '#type' => "textfield",
            '#default_value' => $user_data['username'] ?? '',
            '#title' => $this->t('Username'),
            '#prefix' => '<div class="col-md-6 mb-3">', // Bootstrap 5 classes for colums
            '#suffix' => '</div>',
            '#attributes' => [
                'class' => ['form-control'], // add bootstrap 5 classes
                'placeholder' => $this->t('Enter your username'),
            ],
        ];
    
        // email
        $form['email'] = [
            '#type' => "textfield",
            '#default_value' => $user_data['email'] ?? '',
            '#title' => $this->t('Email'),
            '#prefix' => '<div class="col-md-6 mb-3">',
            '#suffix' => '</div>',
            '#attributes' => [
                'class' => ['form-control'],
                'placeholder' => $this->t('Enter your email address'),
            ],
        ];

        //timezone
        $form['time_zone'] = [
            '#title' => 'Time Zone',
            '#type' => "select",
            '#options' => array_combine(
                \DateTimeZone::listIdentifiers(),
                \DateTimeZone::listIdentifiers()
            ), 
            '#default_value' => $user_data['timezone'] ?? '',
            '#prefix' => '<div class="col-md-6 mb-3">',
            '#suffix' => '</div>',
            
        ];

        $form['submit'] = [
            '#type' => 'submit',
            '#attributes' => ['class' => ['btn', 'btn-success']],
            '#value' => $this->t('Update'),
        ];

        
        return $form;
    }
    
    public function validateForm(array &$form, FormStateInterface $form_state) {
        // Add validation logic here.
    }

    public function submitForm(array &$form, FormStateInterface $form_state) {
            // Update the user's profile information using a helper method.
            $this->updateUserProfile($form_state);
            // Display a success message to the user.
        \Drupal::messenger()->addStatus($this->t('You have successfully updated your profile information.'));
    }
    /**
     * Updates the user's profile information.
     *
     * This method loads the current user and updates their profile fields
     * based on the submitted form values.
     *
     * @param \Drupal\Core\Form\FormStateInterface $form_state
     *   The form state object containing the submitted values.
     */
    protected function updateUserProfile(FormStateInterface $form_state) {
        // Get the current user data using the UserController.
        $currentUser = $this->userController->userInformation();

        // Load the user entity by UID.
        $user = User::load($currentUser['uid']);

        if ($user) {
            try {
                // Update the username.
                $user->setUsername($form_state->getValue('user_name'));
        
                // Update the email.
                $user->setEmail($form_state->getValue('email'));
        
                // Update the timezone in a custom field (replace 'field_timezone' with your field name).
                $user->set('timezone', $form_state->getValue('time_zone'));
        
                // Save the user entity.
                $user->save();
        
                \Drupal::messenger()->addMessage($this->t('User details updated successfully.'));
            } catch (\Exception $e) {
                \Drupal::messenger()->addError($this->t('An error occurred while updating user details: @message', ['@message' => $e->getMessage()]));
                \Drupal::logger('user_update')->error($e->getMessage());
            }
        }
        
    }
}