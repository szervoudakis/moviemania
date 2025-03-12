<?php
namespace Drupal\profile\Model;

use Drupal\Core\Database\Connection;

class UserModel{
    protected $database;

    // Constructor with Dependency Injection for database connection
    public function __construct(Connection $database) {
        $this->database = $database;
    }
    //because username is not sensitive info, we can build function without create services
    public function getUsername() {
        $user = \Drupal::currentUser();
        $username = $user->getAccountName();
    
        return $username;
    }
    
}