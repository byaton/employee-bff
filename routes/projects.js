const express = require('express');
const db = require('../util/db');

const router = express.Router();

router.get('/', (req, res, next) => {
    db.loadDatabase({}, () => {
        console.log('Amit234');
        const projectData = db.getCollection('projects').data;
        console.log('Amit3', projectData);
        const newProjectData = projectData.map(m => {
            return {
                id: m.id,
                name: m.name,
                description: m.description,
                date: m.date,
                empIds: m.empIds
            }
        });
        console.log('Amit4', newProjectData);
        res.status(200).json(newProjectData);
    });
});

router.post('/', (req, res, next) => {
    console.log('Amit1', req.body);
    db.loadDatabase({}, () => {
        console.log('Amit2', req.body);
        db.getCollection('projects').insert(req.body);
        db.saveDatabase(() => {
            res.status(200).json({
                message: 'Data inserted successfully'
            });
        });

    });

});

router.patch('/:projectId', (req, res, next) => {
    console.log('Amit1', req.params, req.body);
    db.loadDatabase({}, () => {
        const projectId = req.params.projectId;
        const nameTobeUpdated = req.body.name;
        const descToBeUpdated = req.body.description;
        const dateToBeUpdated = req.body.date;
        const empIdsToBeUpdated = req.body.empIds;
    
        console.log('Amit2', projectId, nameTobeUpdated);
        db.getCollection('projects').updateWhere(data => {
            console.log('Amit3', data);
            return data.id === parseInt(projectId);
        }, data => {
            console.log('Amit4', data);
            data.name = nameTobeUpdated;
            data.description = descToBeUpdated;
            data.date = dateToBeUpdated;
            data.empIds = empIdsToBeUpdated
            db.saveDatabase(() => {
                res.status(200).json(data);
            });
        
        });

    });
});


module.exports = router;