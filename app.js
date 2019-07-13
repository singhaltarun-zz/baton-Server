const express = require('express');
const app = express();
const tenantRoutes = require('./router/Tenant');
const resourceRoutes = require('./router/Resource');
const subscriptionRoutes = require('./router/Subscription');
const processorRoutes = require('./router/Processor');
const jobRoutes = require('./router/Job');

app.use('/Tenant',tenantRoutes);
app.use('/Resource',resourceRoutes);
app.use('/Subscription',subscriptionRoutes);
app.use('/Processor',processorRoutes);
app.use('/Job', jobRoutes);

module.exports = app;
