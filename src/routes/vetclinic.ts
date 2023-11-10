import { getAllTutors, createNewTutor, updateTutor, deleteTutor, createNewPet, updatePet, deletePet } from '../controller/vetclinic'

import express from 'express'
const router = express.Router()

router.get('/', (req, res) => {
  res.send('home')
})

router.get('/tutors', getAllTutors)

router.post('/tutor', createNewTutor)

router.put('/tutor/:id', updateTutor)

router.delete('/tutor/:id', deleteTutor)

router.post('/pet/:tutorId', createNewPet)

router.put('/pet/:petId/tutor/:tutorId', updatePet)

router.delete('/pet/:petId/tutor/:tutorId', deletePet)

export = router
