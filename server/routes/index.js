// Libraries
const { Router, response } = require('express');
const query = require('../queries');

// Variables
const router = Router();

router.post('/authentication/:type', (req, res) => { query.authentication(req.body, req.params.type).then(response => { res.status(200).send(response);  }).catch(error => res.status(200).send(error)); });
router.get('/profile/:table/:query', (req, res) => { query.profile(req.params.table,req.params.query).then(response => { res.status(200).send(response); }).catch(error => res.status(200).send(error)); });

module.exports = router;