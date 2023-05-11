// Libraries
const { Router } = require('express');

// Variables
const query = require('../queries');
const router = Router();

router.post('/login', (req, res) => { query.login(req.body).then(response => res.status(200).send(response)).catch(error => res.status(200).send(error)); });
router.post('/logout', (req, res) => { query.logout(req.body).then(response => res.status(200).send(response)).catch(error => res.status(200).send(error)); });
router.get('/profile/:id', (req, res) => { query.profile(req.params.id).then(response => res.status(200).send(response)).catch(error => res.status(200).send(error)); });
router.post('/certificate', (req, res) => { query.certificate(req.body).then(response => res.status(200).send(response)).catch(error => res.status(200).send(error)); });
router.get('/dashboard/:table', (req, res) => { query.dashboard(req.params.table).then(response => res.status(200).send(response)).catch(error => res.status(200).send(error)); });
router.post('/list/:table', (req, res) => { query.list(req.params.table, req.body).then(response => res.status(200).send(response)).catch(error => res.status(200).send(error)); });
router.get('/specific/:table/:id', (req, res) => { query.specific(req.params.table, req.params.id).then(response => res.status(200).send(response)).catch(error => res.status(200).send(error)); });
router.post('/save/:table', (req, res) => { query.save(req.params.table, req.body).then(response => res.status(200).send(response)).catch(error => res.status(200).send(error)); });
router.post('/update/:table', (req, res) => { query.update(req.params.table, req.body).then(response => res.status(200).send(response)).catch(error => res.status(200).send(error)); });
router.post('/remove/:table/:id', (req, res) => { query.remove(req.params.table, req.params.id).then(response => res.status(200).send(response)).catch(error => res.status(200).send(error)); });
router.post('/dropdown/:table', (req, res) => { query.dropdown(req.params.table, req.body).then(response => res.status(200).send(response)).catch(error => res.status(200).send(error)); });
router.post('/search/:table', (req, res) => { query.search(req.params.table, req.body).then(response => res.status(200).send(response)).catch(error => res.status(200).send(error)); });
router.post('/top', (req, res) => { query.top(req.body).then(response => res.status(200).send(response)).catch(error => res.status(200).send(error)); });
router.post('/recommend', (req, res) => { query.recommend(req.body).then(response => res.status(200).send(response)).catch(error => res.status(200).send(error)); });
router.post('/resend', (req, res) => { query.resend(req.body).then(response => res.status(200).send(response)).catch(error => res.status(200).send(error)); });
router.post('/verifying', (req, res) => { query.verifying(req.body).then(response => res.status(200).send(response)).catch(error => res.status(200).send(error)); });
router.post('/availabledates', (req, res) => { query.availabledates(req.body).then(response => res.status(200).send(response)).catch(error => res.status(200).send(error)); });
router.post('/evaluate/:table/:type', (req, res) => { query.evaluate(req.params.table, req.params.type, req.body).then(response => res.status(200).send(response)).catch(error => res.status(200).send(error)); });
router.post('/pay', (req, res) => { query.pay(req.body).then(response => res.status(200).send(response)).catch(error => res.status(200).send(error)); });
// router.get('/verify/:id', (req, res) => { query.verify(req.params.id).then(response => res.status(200).send(response)).catch(error => res.status(200).send(error)); });
// router.post('/step/:step', (req, res) => { query.step(req.params.step, req.body).then(response => res.status(200).send(response)).catch(error => res.status(200).send(err)); });

module.exports = router;