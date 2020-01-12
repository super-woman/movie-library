import express from 'express';
import  mongoose from 'mongoose';
import bodyParser from 'body-parser';
import  dotenv from  'dotenv';
import cors from 'cors';
import routes from './routes';

dotenv.config();

const port = process.env.PORT || 4000;
const startServer = async ()=>{
  const app = express();
  app.use(cors());
  app.use( bodyParser.json());

    await  mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (err)=>{ /* eslint-disable no-undef */
      if (!err) console.log('MongoDB has connected successfully');
    });

  //app routes
  routes(app)

  app.listen(port, () => {
    console.log('now listening for requests on port ' +port);
  });
};
startServer();
