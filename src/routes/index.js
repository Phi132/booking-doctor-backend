const express = require ('express');
const routerHome = require('./home');
const routerCreate = require('./create');
const routerArichive = require('./archive');
const routerEdit = require('./edit');
const routerDelete = require('./delete');
const routerApi = require('./api');
let index = (app) => {

    app.use('/api', routerApi);
    app.use('/delete', routerDelete);
    app.use('/edit', routerEdit);
    app.use('/archive', routerArichive);
    app.use('/create', routerCreate);
    app.use('/', routerHome);
}

module.exports = index;
