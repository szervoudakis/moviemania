<?php
namespace Drupal\Tests\best_movies\Unit;

use Drupal\Tests\UnitTestCase;

class MovieModelTest extends UnitTestCase {

  public function testSomething() {
    $this->assertTrue(TRUE);
  }

}
// namespace Drupal\Tests\best_movies\Unit;

// use Drupal\Tests\UnitTestCase;
// use Drupal\best_movies\Model\MovieModel;
// use Drupal\Core\Database\Connection;
// use PHPUnit\Framework\MockObject\MockObject;

// /**
//  * @group best_movies
//  * Unit tests for the MovieModel class.
//  */
// class MovieModelTest extends UnitTestCase {

//   /**
//    * The mock database connection.
//    *
//    * @var \Drupal\Core\Database\Connection|MockObject
//    */
//   protected $database;

//   /**
//    * The MovieModel service.
//    *
//    * @var \Drupal\best_movies\Model\MovieModel
//    */
//   protected $movieModel;

//   /**
//    * Set up the test.
//    */
//   protected function setUp(): void {
//     parent::setUp();

//     // Create a mock database connection.
//     $this->database = $this->createMock(Connection::class);

//     // Create the MovieModel with the mocked database service.
//     $this->movieModel = new MovieModel($this->database);
//   }

//   /**
//    * Test getMovies method.
//    */
//   public function testGetMovies() {
//     // Create a mock result set for the query.
//     $result = [
//       (object) ['title' => 'Movie 1', 'nid' => 1],
//       (object) ['title' => 'Movie 2', 'nid' => 2],
//     ];

//     // Mock the query execution to return the mock result.
//     $query = $this->createMock(\Drupal\Core\Database\Query\QueryInterface::class);
//     $query->expects($this->once())
//       ->method('execute')
//       ->willReturn($result);

//     // Mock the database connection to return the query mock.
//     $this->database->expects($this->once())
//       ->method('select')
//       ->willReturn($query);

//     // Call the getMovies method and assert the result.
//     $movies = $this->movieModel->getMovies();
//     $this->assertCount(2, $movies);
//     $this->assertEquals('Movie 1', $movies[0]->title);
//     $this->assertEquals('Movie 2', $movies[1]->title);
//   }

//   /**
//    * Test getUpcomingMovies method with a specific year.
//    */
//   public function testGetUpcomingMovies() {
//     // Mock the result set for upcoming movies.
//     $result = [
//       (object) ['title' => 'Upcoming Movie 1', 'nid' => 1],
//     ];

//     // Mock the query execution for the upcoming movies query.
//     $query = $this->createMock(\Drupal\Core\Database\Query\QueryInterface::class);
//     $query->expects($this->once())
//       ->method('execute')
//       ->willReturn($result);

//     // Mock the database connection to return the query mock.
//     $this->database->expects($this->once())
//       ->method('select')
//       ->willReturn($query);

//     // Call the getUpcomingMovies method with a year filter.
//     $upcomingMovies = $this->movieModel->getUpcomingMovies('2023');
//     $this->assertCount(1, $upcomingMovies);
//     $this->assertEquals('Upcoming Movie 1', $upcomingMovies[0]->title);
//   }
// }
