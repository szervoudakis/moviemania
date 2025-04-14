# Moviemania - A Drupal-Based Movie Management System

## 📌 Project Overview
**Moviemania** is a Drupal-based movie management system designed to fetch, store, and display movie data efficiently. This project demonstrates expertise in 
**Drupal module development**, **API integration**, **custom theming**,**modern PHP development practices** **Progressively decoupled React frontend**.

## 🚀 Features
- **Custom Theme (movie_mania_theme)** - A tailored Drupal theme for a modern and user-friendly experience.
- **Custom Modules**:
  - **best_movies** - Fetches movie data from an external API and stores it in a custom content type.
  - **redirection** - Redirects users to the front page after login.
- **Structured MVC Architecture** - Organizing controllers, models, and services for maintainability.
- **Dependency Injection (DI)** - Improving testability and reusability by injecting dependencies where needed.
- **Unit Testing** - Implementing tests for key components like MovieModel.
- **Dynamic Filtering via API** - Users can filter movies by year through a dynamic, AJAX-driven form that makes API requests to fetch filtered results.
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
modules/custom/
├── best_movies/ # Custom module for fetching and managing movie data
│   ├── src/
│   │   ├── Controller/              # Contains controllers to handle incoming requests and responses
│   │   ├── Model/                   # Contains classes for data interactions (e.g., database queries, API calls)
│   │   ├── Service/                 # Contains services for handling business logic and reusable functionality
│   │   └── Form/                    # Contains forms (e.g., filters, user input forms) for frontend interactions
│   └── tests/
├── redirection/
├── profile/
│   ├── src/
│   │   ├── Controller/              # Controller for handling user profile-related requests
│   │   ├── Model/                   # Model to interact with user profile data (e.g., fetch or store user info)
│   │   ├── Form/                    # Forms to capture user input for updating profile (e.g., username, email)
theme/movie_mania_theme/
react_app/
├── public/                           # Static files
│   ├── index.html                    # Main HTML file for the React app
│   └── favicon.ico                   # Favicon
├── src/
│   ├── assets/                       # Static assets like images, icons, etc.
│   │   └── logo.svg                  # Example logo asset
│   ├── components/                   # Reusable UI components
│   │   ├── MovieCard.js              # Movie card component
│   ├── pages/                        # Individual pages of the app
│   │   ├── HomePage.js               # Homepage component
│   │   ├── MoviesPage.js             # Page displaying movies
│   │   └── Top250Page.js             # Page displaying top 250 movies
│   ├── services/                     # API calls and services
│   │   └── moviesService.js          # Handles API calls for movies
│   ├── App.js                        # Main entry point for the React app
│   ├── App.css                       # Global styles for the app
│   └── index.js                      # React app entry point

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

- **MoviesController**  Controls the movie data display and returns the data to the front-end. For example:
  1. Loading the React app on the homepage (react_homepage template).
  2. Fetching movies and rendering them on the movies page with the movies-page.html.twig template.

- **MovieApiService**  Manages the API calls to fetch movie data from IMDb using RapidAPI. Dependency injection is used for configuration and API client setup.

## ⚛️ React Architecture
The React app is progressively decoupled from Drupal and resides in the themes/movie_mania_theme/react_app folder:
   1. App Structure:
         ```
         react_app/src/App.js - The main entry point for the React app.
         react_app/src/pages/ - The folder contains all the pages of the React app
         react_app/src/services/moviesService.js - Fetches data from the provided API URL.
         react_app/src/components/  - This folder contains all reusable UI components used throughout the application.
        ```
The React app is integrated into Drupal via dynamic JavaScript injection, where routes from Drupal are passed to the React frontend.


## 🏆 About the Author
This project is built and maintained by **Stefanos Zervoudakis**, a Full-Stack Developer specializing in **Drupal, PHP, and modern web development techniques**. Passionate about **clean code, best practices, and performance optimization**.
