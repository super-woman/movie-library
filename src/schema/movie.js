import  mongoose from 'mongoose';

const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  title: { type:String, require:true },
  director: { type: String, require:true },
  description: { type: String, require:true },
  genre:{type: String, require:true },
  releaseDate: { type: Date, require:true },
  imageUrl:{type:String},
  trailer: {type:String },
  createdAt:  { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Movie = mongoose.model('Movie', MovieSchema);

export default Movie;