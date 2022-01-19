const express = require('express');
const db = require('../util/db');

const router = express.Router();

router.get('/', (req, res, next) => {

    db.loadDatabase({}, () => {
        const empData = db.getCollection('employees').data;
        const newEmpData = empData.map(m => {
            return {
                id: m.id,
                name: m.name
            }
        });
        res.status(200).json(newEmpData);
    });
    
});

router.post('/', (req, res, next) => {
    db.loadDatabase({}, () => {
        db.getCollection('employees').insert(req.body);
        db.saveDatabase(() => {
            res.status(200).json({
                message: 'Data inserted successfully'
            });
        });

    });

});

router.patch('/:employeeId', (req, res, next) => {
    db.loadDatabase({}, () => {
        const emplId = req.params.employeeId;
        const nameTobeUpdated = req.body.name;
    
        db.getCollection('employees').updateWhere(data => {
            return data.id === parseInt(emplId);
        }, data => {
            data.name = nameTobeUpdated;
            db.saveDatabase(() => {
                res.status(200).json(data);
            });
        
        });

    });
});

module.exports = router;