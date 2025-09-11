import React, {Suspense, lazy} from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import {store} from "./store"
import { setUser } from './store/userSlice';
 
//lazy loading the page components to enable code splitting and improve performance
const Home = lazy(() => import("./pages/Home"));
const Top250Movies = lazy(() => import("./pages/top250Movies"));
const DashboardPage = lazy(()=> import("./pages/DashboardPage"));
const WatchListPage = lazy(()=>import("./pages/WatchListPage"));

function App() {
  
  const topMoviesRoute = window.drupalSettings.movieMania.topMoviesRoute;
  const top3movies = window.drupalSettings.movieMania.top3movies;
  const api_url_movies = window.drupalSettings.movieMania.topmovies;
  const api_url_years = window.drupalSettings.movieMania.years;
  const dashboard = window.drupalSettings.movieMania.dashboardRoute;
  const user = window.drupalSettings.movieMania.user;
  const watchlist = window.drupalSettings.movieMania.watchlist_route;

  store.dispatch(setUser(user));
  
  return (
    <Provider store={store}>
          <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/" element={<Home top3movies={top3movies} />} />
                    <Route path={topMoviesRoute} element={<Top250Movies api_url_movies={api_url_movies} api_url_years={api_url_years} />} />
                    <Route path={dashboard} element={<DashboardPage user={user} />} />
                    <Route path={watchlist} element={<WatchListPage />} />
                </Routes>
            </Suspense>
          </Router>
    </Provider>
    
  );
}

export default App;
