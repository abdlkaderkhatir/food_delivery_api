import express, { Request, Response } from 'express';
import multer  from 'multer';
import {Database}  from './utils/database';
// import foodRoutes from './interfaces/routes/FoodRoutes';
// import authRoutes from './interfaces/routes/AuthRoutes';
// import syncRoutes from './interfaces/routes/SyncRoutes';
// import bannerRoutes from './interfaces/routes/BannerRoutes';
import indexRoutes from './interfaces/routes/index';
import path from 'path';
// import orderRoutes from './interfaces/routes/OrderRoutes';

const app : express.Application = express();
const db = Database.getInstance();

db.connectToDatabase();

// cors
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// });


// body parser
app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(express.json());


// Single file upload

// app.post('/upload', upload.single('file'), (req: Request, res: Response) => {
//   if (!req.file) {
//     return res.status(400).send('No file uploaded.');
//   }
//   res.status(200).send(`File uploaded successfully: ${req.file.filename}`);
// });

// // Multiple file upload

// app.post('/uploads', upload.array('files', 10), (req: Request, res: Response) => {
//   if (!req.files) {
//     return res.status(400).send('No files uploaded.');
//   }
//   const fileNames = (req.files as Express.Multer.File[]).map(file => file.filename);
//   res.status(200).send(`Files uploaded successfully: ${fileNames.join(', ')}`);
// });


app.use('/src/uploads', express.static('src/uploads'));
// app.use('/src/uploads', express.static(path.join(__dirname, 'src/uploads')));
// app.use('/src/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/api', indexRoutes);


export default app;