
import express from 'express';
const router = express.Router();

const { getAllTutors, createNewTutor, updateTutor, deleteTutor, createNewPet, updatePet, deletePet } = require('../controller/vetclinic')

router.get('/', (req, res) => {
    res.send('home');
})

// /api/v1/vetclinic

router.get('/tutors', getAllTutors)

router.post('/tutor', createNewTutor)

router.put('/tutor/:id', updateTutor)

router.delete('/tutor/:id', deleteTutor)

router.post('/pet/:tutorId', createNewPet)

router.put('/pet/:petId/tutor/:tutorId', updatePet)

router.delete('/pet/:petId/tutor/:tutorId', deletePet)

export = router;
