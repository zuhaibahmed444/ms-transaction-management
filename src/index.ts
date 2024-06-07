import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { container } from './inversify.config';
import './controllers/index';
import dotenv from 'dotenv';


dotenv.config();
const port = process.env.PORT || 3000;
const mongo_uri = process.env.MONGO_URI || 'mongodb://localhost:27017/transactions';

// MongoDB connection
mongoose.connect(mongo_uri).then(() =>{
    console.log("Connected to MongoDB");
}).catch(()=>{
    console.error("Failed to Connect to DB");
});

const server = new InversifyExpressServer(container);

server.setConfig((app) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
});

const app = server.build();
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
