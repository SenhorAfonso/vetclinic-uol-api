
import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.send('home');
})

router.get('/tutors', (req, res) => {
    res.send('Retrieve all tutors!');
})

router.post('/tutor', (req, res) => {
    res.send('Create a new tutor');
})

router.put('/tutor/:id', (req, res) => {
    res.send('Updates a tutor');
})

router.delete('/tutor/:id', (req, res) => {
    res.send('Delete a tutor');
})

router.post('/pet/:tutorId', (req, res) => {
    res.send('Creates a pet and adds it to a tutor');
})

router.put('/pet/:petId/tutor/:tutorId', (req, res) => {
    res.send('Updates a pets info');
})

router.delete('/pet/:petId/tutor/:tutorId', (req, res) => {
    res.send('Deletes a pet from a tutor');
})

export = router;
