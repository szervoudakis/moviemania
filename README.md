# Moviemania - A Drupal-Based Movie Management System

## 📌 Project Overview
**Movie Mania** is a Drupal-based movie management system designed to fetch, store, and display movie data efficiently. This project demonstrates expertise in **Drupal module development**, **API integration**, **custom theming**, and **modern PHP development practices**.

## 🚀 Features
- **Custom Theme (`movie_mania_theme`)** - A tailored Drupal theme for a modern and user-friendly experience.
- **Custom Modules:**
  - `best_movies` - Fetches movie data from an external API and stores it in a custom content type.
  - `redirection` - Redirects users to the front page after login.
- **Structured MVC Architecture** - Organizing controllers, models, and services for maintainability.
- **Dependency Injection (DI)** - Improving testability and reusability by injecting dependencies where needed.
- **Unit Testing (In Progress)** - Implementing tests for key components like `MovieModel`.
- **AJAX-Based Filtering** - Users can filter movies dynamically via an AJAX-driven form.

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

## 📂 Project Structure
```
modules/custom/best_movies/  # Handles movie data fetching & storage
modules/custom/redirection/   # Handles user redirection
movie_mania_theme/           # Custom theme for frontend
src/Model/MovieModel.php     # Handles database queries
src/Form/FiltersForm.php     # Implements AJAX-based filtering
src/Controller/MoviesController.php  # Controls movie data display
```

## 🚧 Setup & Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/szervoudakis/movie-mania.git
   ```
2. Navigate to the project directory and start DDEV:
   ```bash
   cd movie-mania
   ddev start
   ```
3. Install dependencies:
   ```bash
   composer install
   ```
4. Import database if needed:
   ```bash
   ddev import-db --src=final.sql.gz
   ```
5. Clear Drupal caches:
   ```bash
   drush cache:rebuild
   ```

## ✅ Running Unit Tests (In Progress)
Once the unit tests are fully implemented:
```bash
phpunit --configuration core/phpunit.xml modules/custom/best_movies/tests/src/Unit
```

## 📌 Future Improvements
- Complete PHPUnit test coverage
- Implement advanced caching strategies
- Enhance AJAX-based filtering with more parameters
- Implement React to the Front-end

## 🏆 About the Author
This project is built and maintained by **Stefanos Zervoudakis**, a Full-Stack Developer specializing in **Drupal, PHP, and modern web development techniques**. Passionate about **clean code, best practices, and performance optimization**.
