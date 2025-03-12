# Moviemania - A Drupal-Based Movie Management System

## 📌 Project Overview
**Moviemania** is a Drupal-based movie management system designed to fetch, store, and display movie data efficiently. This project demonstrates expertise in 
**Drupal module development**, **API integration**, **custom theming**,**modern PHP development practices** **Progressively decoupled React frontend**.

## 🚀 Features
- **Custom Theme (`movie_mania_theme`)** - A tailored Drupal theme for a modern and user-friendly experience.
- **Custom Modules:**
  - `best_movies` - Fetches movie data from an external API and stores it in a custom content type.
  - `redirection` - Redirects users to the front page after login.
- **Structured MVC Architecture** - Organizing controllers, models, and services for maintainability.
- **Dependency Injection (DI)** - Improving testability and reusability by injecting dependencies where needed.
- **Unit Testing** - Implementing tests for key components like `MovieModel`.
- **AJAX-Based Filtering** - Users can filter movies dynamically via an AJAX-driven form.
- **Progressively Decoupled Frontend** - React.js is used for dynamic subpages like the homepage and top 250 movies page.

## 🛠️ Technologies Used
- **Drupal** (CMS)
- **PHP** (Object-Oriented Programming, MVC architecture)
- **Composer** (Dependency Management)
- **Guzzle HTTP Client** (API Integration)
- **MySQL** (Database)
- **Twig** (Templating Engine)
- **AJAX** (Dynamic Filtering)
- **Unit Testing (PHPUnit, Drupal Testing Framework)**
- **Docker (DDEV)** - Local development environment
- **Git & GitHub** (Version Control)
- **React** (Frontend Framework)
- **npm** (Node package manager)

## 📂 Project Structure
```
modules/custom/best_movies/       # Handles movie data fetching & storage
modules/custom/redirection/        # Manages user redirection logic
movie_mania_theme/                # Custom Drupal theme for frontend presentation
src/Model/MovieModel.php          # Database interaction & queries
src/Form/FiltersForm.php          # Implements AJAX-based filtering
src/Controller/MoviesController.php  # Controls movie data display
src/Service/MovieApiService.php   # Manages API calls with IMDb
modules/custom/best_movies/tests  # PHPUnit & Drupal tests for the `best_movies` module
modules/custom/best_movies/Commands/BatchCommands.php # Custom Drush commands
movie_mania_theme/react_app       # React app for frontend components
movie_mania_theme/movie_mania_theme.theme.php  # Passes React app and Drupal routes using dynamically injected JavaScript

```

## 🚧 Setup & Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/szervoudakis/moviemania.git
   ```
2. Navigate to the project directory and start DDEV:
   ```bash
   cd movie-mania
   ```
3. Install dependencies:
   ```bash
   composer install
   ```
4. Import database if needed:
   ```bash
   ddev import-db --src=final.sql.gz
   ```
5. Install Node.js dependencies for React app
   ```bash
   cd themes/movie_mania_theme/react_app
   npm install
   ```
6. Before run project, build react app
   ```bash
   cd themes/movie_mania_theme/react_app
   npm run build
   ```
7. Run Project, in root of the project type the following
   ```bash
     ddev start
   ```      

## ✅ Running Unit Tests 
Run PHPUnit tests inside the DDEV container:
```bash
vendor/bin/phpunit
```
This command will execute all defined test cases and provide a summary of results.

## 🔍 PHP Architecture
- **MovieModel** Handles all database interactions and queries, such as:
 1. Fetching upcoming movies
 2. Fetching top 250 movies 
 3. Inserting movie data from the API
 4. Deleting movie data from the Movies content type

- **FiltersForm** Implements AJAX-based filtering for the movie data.

- **MoviesController**  Controls the movie data display and returns the data to the front-end. For example:
  1. Loading the React app on the homepage (react_homepage template).
  2. Fetching movies and rendering them on the movies page with the movies-page.html.twig template.

- **MovieApiService**  Manages the API calls to fetch movie data from IMDb using RapidAPI. Dependency injection is used for configuration and API client setup.

## ⚛️ React Architecture
The React app is progressively decoupled from Drupal and resides in the movie_mania_theme/react_app folder:
   1. App Structure:
         ```
         react_app/src/App.js - The main entry point for the React app.
         react_app/src/pages/Home.js - Home page component.
         react_app/src/services/top3MovieService.js - Service for fetching top 3 movie data.
         react_app/src/App.css - Styling for the React components.
        ```
The React app is integrated into Drupal via dynamic JavaScript injection, where routes from Drupal are passed to the React frontend.

## 📌 Future Improvements
- Complete PHPUnit test coverage
- Implement advanced caching strategies
- Enhance AJAX-based filtering with more parameters
- Implement React to the Front-end

## 🏆 About the Author
This project is built and maintained by **Stefanos Zervoudakis**, a Full-Stack Developer specializing in **Drupal, PHP, and modern web development techniques**. Passionate about **clean code, best practices, and performance optimization**.
