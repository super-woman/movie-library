import Movie from '../schema/movie';
import { isRequired, resHandler,newError } from '../helpers';

class MovieController {
    static async addMovie(req,res){
        const {title,director,description,genre,releaseDate,imageUrl,trailer} = req.body

        const validate = isRequired({title,director,description,genre,releaseDate,})

        if(validate){
           return resHandler(res,false,validate)
        }

        const movie = new Movie({
            title,
            director,
            description,
            genre,
            releaseDate: new Date(releaseDate),
            imageUrl,
            trailer
          });

        try {
            await movie.save()

            return resHandler(res,true,movie,201)
        } catch (error) {
            return resHandler(res,false,error.message)
        }
    }

    static async getMovies(req,res){
        try {
            const result = await Movie.find().sort({'createdAt': -1})

            return resHandler(res,true,result,200)
        } catch (error) {
            return resHandler(res,false,error.message)
        }
    }

    static async getOneMovie(req,res){
        try {
            const result = await Movie.findById(req.params.id)

            if(!result){
                return resHandler(res,false,'Movie not found',200)
            }

            return resHandler(res,true,result,200)
        } catch (error) {
            if(error.name==='CastError'){
                return resHandler(res,false,'Movie not found', 404)
            }

         return resHandler(res,false,error.message)
        }
    }


    static async updateMovie(req,res){
        const {title,director,description,genre,releaseDate,imageUrl,trailer} = req.body

        const validate = isRequired({title,director,description,genre,releaseDate})

        if(validate){
           return resHandler(res,false,validate)
        }

        Movie.findByIdAndUpdate(req.params.id, {
            $set:{
                title,
                director,
                description,
                genre,
                releaseDate: new Date(releaseDate),
                imageUrl,
                trailer,
                updatedAt: new Date() } },
          { new:true,useFindAndModify: false }, ( error,movie)=>{
            if (error){
                if(error.name==='CastError'){
                    return resHandler(res,false,'Movie not found', 404)
                }
                return resHandler(res,false,error.message)
            }
            if (!movie){

                return resHandler(res,false,'Movie not found')
            }
            return resHandler(res,true,movie,200);
          }
          );
    }

    static async deleteMovie(req,res){
        try {
            const result = await Movie.findById(req.params.id)

        if(!result){
            return resHandler(res,false,'Movie not found', 404)
        }
        result.remove()

        return resHandler(res,true,result,200)

        } catch (error) {
            if(error.name==='CastError'){
                return resHandler(res,false,'Movie not found', 404)
            }

         return resHandler(res,false,error.message)

        }
}
}
export default MovieController;
