'use strict';

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const errorHandler = require('./lib/error-handler');


const dbUrl = process.env.MONGODB_URI || 'mongodb://localhost/dev_db';

mongoose.connect(dbUrl);

const userRoutes = require('./route/user-routes');
const transitRoutes = require('./route/transit_routes');
const alertRoutes = require('./route/alert_routes');
const authRoutes = require('./route/auth_routes');
const hookRoutes = require('./route/hook_routes');
const routeRoutes = require('./route/route_routes');


app.use(morgan('dev'));
app.use('/user', userRoutes);
app.use('/', authRoutes);
app.use('/user/:id/alert', alertRoutes);
app.use('/transit', transitRoutes);
app.use('/hook', hookRoutes);
app.use('/user/:id/routes', routeRoutes);
app.use(errorHandler);

//TODO on / routes say res.json({message:'One Minute Away API V1'})

app.use((req, res) => {
  res.status(404).json({message: 'not found'});
});


app.listen(process.env.PORT || 3000, () => {
  console.log('up on 3000');
});
