import Movie from '../controllers/movie';

const { addMovie,getMovies,getOneMovie,updateMovie,deleteMovie }= Movie

const routes = (app )=>{
    app.get('/api/v1/movies', getMovies);
    app.get('/api/v1/movies/:id', getOneMovie);
    app.post('/api/v1/movies', addMovie);
    app.put('/api/v1/movies/:id', updateMovie);
    app.delete('/api/v1/movies/:id', deleteMovie);
  };

export default routes;