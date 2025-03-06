<?php

namespace Drupal\Tests\best_movies\Unit;

use Drupal\Core\Database\Connection;
use PHPUnit\Framework\TestCase;
use Drupal\best_movies\Model\MovieModel;
use Drupal\Core\Database\Query\SelectInterface;
use Drupal\Core\Database\StatementInterface;

class MovieModelTest extends TestCase {

  /**
   * @var \PHPUnit\Framework\MockObject\MockObject|\Drupal\Core\Database\Connection
   */
  protected $database;

  /**
   * @var \Drupal\best_movies\Model\MovieModel
   */
  protected $movieModel;

  /**
   * Set up the test case
   */
  protected function setUp(): void {
    // Create a mock of the database connection.
    $this->database = $this->createMock(Connection::class);
    
    // Create an instance of MovieModel with the mocked database connection.
    $this->movieModel = new MovieModel($this->database);
  }

  /**
   * Test getMovies method
   */
  public function testGetMovies() {
    // Set up expected query result (mocked data).
    $mockResults = [
      (object) [
        'title' => 'Test Movie 1',
        'nid' => 1,
        'release_date' => '2025-01-01',
        'field_type' => 'Action',
        'description' => 'Test Description 1',
      ],
      (object) [
        'title' => 'Test Movie 2',
        'nid' => 2,
        'release_date' => '2025-02-01',
        'field_type' => 'Comedy',
        'description' => 'Test Description 2',
      ],
    ];

    // Create a mock for the Select query.
    $selectMock = $this->createMock(SelectInterface::class);

    // Create a mock for the Statement result.
    $statementMock = $this->createMock(StatementInterface::class);
    
    // Configure the statement mock to return the mock results when fetchAll is called.
    $statementMock->method('fetchAll')
      ->willReturn($mockResults);

    // Configure the select mock to return the statement mock when execute is called.
    $selectMock->method('execute')
      ->willReturn($statementMock);

    // Configure the database mock to return the select mock when select is called.
    $this->database->method('select')
      ->willReturn($selectMock);

    // Run the getMovies method.
    $movies = $this->movieModel->getMovies();

    // Assert that the results are as expected.
    $this->assertCount(2, $movies);
    $this->assertEquals('Test Movie 1', $movies[0]->title);
    $this->assertEquals('Test Movie 2', $movies[1]->title);
  }
}
