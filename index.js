const express = require('express');
const JSZip = require('jszip');
const mongoose = require('mongoose');
const packageModel = require('./models/package');
const { basename } = require('node:path');

const app = express();
const initMongo = require('./utils/mongodb');

initMongo();

async function getDependents(zip, dependents) {
    //console.log('TRIGGERED WITH: ', dependents);
    let pkg;
    for (let i = 0; i < dependents.length; i++) {

        pkg = await packageModel.findOne({name: dependents[i]});
        if (pkg == null) return; // continue?

        await getDependents(zip, pkg.dependents);
        zip.file(dependents[i] + '.pres', pkg.content);
    }
}

app.get('/download/:package', async (req, res) => {
    const zip = new JSZip();
    let package = await packageModel.findOne({name: req.params.package});
    zip.file(req.params.package + '.pres', package.content);
    let dependents = package.dependents;
    let dependentsContent = {};


    await getDependents(zip, dependents);

    let pkg;


    res.setHeader('content-disposition', 'attachment; filename=files.zip');
    res.setHeader('content-type', 'application/zip');
    res.send(await zip.generateAsync({ type: 'nodebuffer' }));

    
});

app.listen(2302, () => console.log('http://localhost:2302/download/little_redoverflow'));