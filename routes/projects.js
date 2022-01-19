const express = require('express');
const db = require('../util/db');

const router = express.Router();

router.get('/', (req, res, next) => {
    db.loadDatabase({}, () => {
        const projectData = db.getCollection('projects').data;
        const newProjectData = projectData.map(m => {
            return {
                id: m.id,
                name: m.name,
                description: m.description,
                date: m.date,
                empIds: m.empIds
            }
        });
        res.status(200).json(newProjectData);
    });
});

router.post('/', (req, res, next) => {
    db.loadDatabase({}, () => {
        db.getCollection('projects').insert(req.body);
        db.saveDatabase(() => {
            res.status(200).json({
                message: 'Data inserted successfully'
            });
        });

    });

});

router.patch('/:projectId', (req, res, next) => {
    db.loadDatabase({}, () => {
        const projectId = req.params.projectId;
        const nameTobeUpdated = req.body.name;
        const descToBeUpdated = req.body.description;
        const dateToBeUpdated = req.body.date;
        const empIdsToBeUpdated = req.body.empIds;
    
        db.getCollection('projects').updateWhere(data => {
            return data.id === parseInt(projectId);
        }, data => {
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

router.delete('/:projectId', (req, res, next) => {
    db.loadDatabase({}, () => {
        const projectId = req.params.projectId;

        db.getCollection('projects')
            .findAndRemove(data => data.id === parseInt(projectId))

        db.saveDatabase(() => {
            res.status(200).json({
                message: 'Data deleted successfully'
            });
        });

    });
});


module.exports = router;