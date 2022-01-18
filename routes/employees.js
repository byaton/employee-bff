const express = require('express');
const db = require('../util/db');

const router = express.Router();

router.get('/', (req, res, next) => {
    console.log('Amit1234');

    db.loadDatabase({}, () => {
        console.log('Amit2');
        const empData = db.getCollection('employees').data;
        console.log('Amit3', empData);
        const newEmpData = empData.map(m => {
            return {
                id: m.id,
                name: m.name
            }
        });
        console.log('Amit4', newEmpData);
        res.status(200).json(newEmpData);
    });
    
});

router.post('/', (req, res, next) => {
    console.log('Amit1', req.body);
    db.loadDatabase({}, () => {
        console.log('Amit2', req.body);
        db.getCollection('employees').insert(req.body);
        db.saveDatabase(() => {
            res.status(200).json({
                message: 'Data inserted successfully'
            });
        });

    });

});

router.patch('/:employeeId', (req, res, next) => {
    console.log('Amit1', req.params, req.body);
    db.loadDatabase({}, () => {
        const emplId = req.params.employeeId;
        const nameTobeUpdated = req.body.name;
    
        console.log('Amit2', emplId, nameTobeUpdated);
        db.getCollection('employees').updateWhere(data => {
            console.log('Amit3', data);
            return data.id === parseInt(emplId);
        }, data => {
            console.log('Amit4', data);
            data.name = nameTobeUpdated;
            db.saveDatabase(() => {
                res.status(200).json(data);
            });
        
        });

    });
});

module.exports = router;