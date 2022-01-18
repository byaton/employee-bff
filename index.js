// // import express from 'express';
// // import cors from 'cors';
// // import {join, dirname} from 'path';
// // import { Low, JSONFile } from 'lowdb';
// // import { fileURLToPath } from 'url';
// // import bodyParser from 'body-parser';

// const express = require('express');
// const cors = require('cors');
// const {join, dirname} = require('path');
// const { Low, JSONFile } = require('lowdb');
// const { fileURLToPath } = require('url');
// const bodyParser = require('body-parser');


// //const __dirname = dirname(fileURLToPath(import.meta.url));

// // Use JSON file for storage
// // const file = join(__dirname, 'db.json');
// const file = join('db.json');
// const adapter = new JSONFile(file);
// const db = new Low(adapter);

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// const PORT = 4000;

// app.get('/employees', (req, res) => {
//   // const data = await db.read();
//   return res.json(data);
// });

// app.listen(PORT, () => {
//   console.log(`Backend is running at ${PORT}`);
// });

// // // Read data from JSON file, this will set db.data content
// // await db.read()

// // // If file.json doesn't exist, db.data will be null
// // // Set default data
// // db.data = db.data || { posts: [] } // Node < v15.x
// // // db.data ||= { posts: [] } 

// // db.data.posts.push('hello world')
// // db.data.posts[0]

// // // You can also use this syntax if you prefer
// // const { posts } = db.data
// // posts.push('hello world')

// // // Write db.data content to db.json
// // await db.write()


const http = require('http');
const app = require('./app');

const port = process.env.port || 3000;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is listening to ${port}`)
});