import request from 'supertest'
import app from '../server'
import tutor from '../model/tutor'
import mongoose from 'mongoose'

afterAll(async () => {
  await mongoose.connection.close()
})

describe('CREATE TUTOR', () => {
  it('Body data is valid. Should return 201 status code', async () => {
    const res = await request(app)
      .post('/api/v1/vetclinic/tutor')
      .send({
        name: 'Pedro Afonso',
        phone: '12345678901',
        email: 'pedro@gmail.com',
        date_of_birth: '2003-10-10 11:23',
        zipcode: '20031006'
      })

    expect(res.statusCode).toBe(201)
  })

  it('Body data is invalid. Should return with 500 status code', async () => {
    const res = await request(app)
      .post('/api/v1/vetclinic/tutor')
      .send({
        name: 'Darwin Raglan Caspian Ahab Poseidon Nicodemius Watterson III',
        phone: '12345678901',
        email: 'pedro@gmail.com',
        date_of_birth: '2003-10-10 11:23',
        zipcode: '20031006'
      })

    expect(res.statusCode).toBe(500)
  })
})

describe('UPDATE TUTOR', () => {
  it('Both id and body data are valid. Should return 200 status code', async () => {
    const tutorToUpdate = await request(app)
      .post('/api/v1/vetclinic/tutor')
      .send({
        name: 'Pedro Alonso',
        phone: '12345678901',
        email: 'pedro@gmail.com',
        date_of_birth: '2003-10-10 11:23',
        zipcode: '20031006'
      })

    if (tutorToUpdate.body.newTutor != null) {
      const tutorId = tutorToUpdate.body.newTutor._id

      const res = await request(app)
        .put(`/api/v1/vetclinic/tutor/${tutorId}`)
        .send({
          name: 'Pedro Afonso'
        })

      expect(res.statusCode).toBe(200)
    } else {
      throw new Error(String(tutorToUpdate.body.newTutor))
    }
  })

  it('Id is valid but not associated with a record. Should return 404 status code', async () => {
    const res = await request(app)
      .put('/api/v1/vetclinic/tutor/12342c30d468d8bd485bb965')
      .send({
        name: 'Pedro Afonso'
      })

    expect(res.statusCode).toBe(404)
  })

  it("Tutor's id format is invalid. Should return 500 status code", async () => {
    const res = await request(app)
      .put('/api/v1/vetclinic/tutor/<invalidId>')
      .send({
        name: 'Pedro Afonso'
      })

    expect(res.statusCode).toBe(500)
  })

  it('Body data format is invalid. Should return 500 status code', async () => {
    const res = await request(app)
      .put('/api/v1/vetclinic/tutor/<invalidId>')
      .send({
        name: 'Darwin Raglan Caspian Ahab Poseidon Nicodemius Watterson III'
      })

    expect(res.statusCode).toBe(500)
  })
})

describe('CREATE PET', () => {
  it("Both tutor's id and pet's body data are valid. Should respond with 201 status code", async () => {
    const tutor = await request(app).post('/api/v1/vetclinic/tutor').send({
      name: 'Pedro Afonso',
      phone: '12345678901',
      email: 'pedro@gmail.com',
      date_of_birth: '2003-10-10 11:23',
      zipcode: '20031006'
    })

    if (tutor.body.data != null) {
      const tutorId: string = tutor.body.data._id

      const res = await request(app).post(`/api/v1/vetclinic/pet/${tutorId}`).send({
        name: "Marquinhos d'Avilla",
        species: 'Bulldog',
        carry: 'Small',
        weight: 45.5,
        date_of_birth: '2003-10-06 11:23'
      })

      expect(res.statusCode).toBe(201)
    }
  })

  it('Pet body data (carry field) is invalid. Should respond with 500 status code', async () => {
    const tutor = await request(app).post('/api/v1/vetclinic/tutor').send({
      name: 'Pedro Afonso',
      phone: '12345678901',
      email: 'pedro@gmail.com',
      date_of_birth: '2003-10-10 11:23',
      zipcode: '20031006'
    })

    if (tutor.body.data != null) {
      const tutorId: string = tutor.body.data._id

      const res = await request(app).post(`/api/v1/vetclinic/pet/${tutorId}`).send({
        name: "Marquinhos d'Avilla",
        species: 'Bulldog',
        carry: 'Pequeno',
        weight: 45.5,
        date_of_birth: '2003-10-06 11:23'
      })

      expect(res.statusCode).toBe(500)
    }
  })

  it("Tutor's id is valid but not associated with a record. Should respond with 404 status code", async () => {
    const res = await request(app).post('/api/v1/vetclinic/pet/12342c30d468d8bd485bb965').send({
      name: "Marquinhos d'Avilla",
      species: 'Bulldog',
      carry: 'Small',
      weight: 45.5,
      date_of_birth: '2003-10-06 11:23'
    })

    expect(res.statusCode).toBe(404)
  })

  it("Tutor's id format are invalid. Should respond with 500 status code", async () => {
    const res = await request(app).post('/api/v1/vetclinic/pet/<invalidId>').send({
      name: "Marquinhos d'Avilla",
      species: 'Bulldog',
      carry: 'Small',
      weight: 45.5,
      date_of_birth: '2003-10-06 11:23'
    })

    expect(res.statusCode).toBe(500)
  })
})

describe('UPDATE PET', () => {
  it("Both tutor's id and pet's body data are valid. Should respond with 200 status code", async () => {
    const tutor = await request(app).post('/api/v1/vetclinic/tutor').send({
      name: 'Pedro Marques',
      phone: '12345678901',
      email: 'pedro@gmail.com',
      date_of_birth: '2003-10-10 11:23',
      zipcode: '20031006'
    })

    if (tutor.body.data != null) {
      const tutorId: string = tutor.body.data._id

      const pet = await request(app).post(`/api/v1/vetclinic/pet/${tutorId}`).send({
        name: "Marquinhos d'Avilla",
        species: 'Bulldog',
        carry: 'Small',
        weight: 45.5,
        date_of_birth: '2003-10-06 11:23'
      })

      if (pet.body.data != null) {
        const petId = pet.body.data._id

        const res = await request(app)
          .put(`/api/v1/vetclinic/pet/${petId}/tutor/${tutorId}`)
          .send({
            name: 'Trovão'
          })

        expect(res.statusCode).toBe(200)
      }
    }
  })

  it("Both tutor's and pet id are valid but not associated with a record. Should respond with 404 status code", async () => {
    const res = await request(app)
      .put('/api/v1/vetclinic/pet/12342c30d468d8bd485bb965/tutor/12342c30d468d8bd485bb965')
      .send({
        name: 'Trovão'
      })

    expect(res.statusCode).toBe(404)
  })

  it('Pet body data are invalid. Should respond with 500 status code', async () => {
    const res = await request(app)
      .put('/api/v1/vetclinic/pet/<invaliID>/tutor/12342c30d468d8bd485bb965')
      .send({
        name: 'Darwin Raglan Caspian Ahab Poseidon Nicodemius Watterson III'
      })

    expect(res.statusCode).toBe(500)
  })

  it("Tutor's id format are invalid. Should respond with 500 status code", async () => {
    const res = await request(app)
      .put('/api/v1/vetclinic/pet/<invaliID>/tutor/12342c30d468d8bd485bb965')
      .send({
        name: 'Trovão'
      })

    expect(res.statusCode).toBe(500)
  })
})

describe('RETRIVE ALL TUTORS', () => {
  it('Should respond with 200 status code', async () => {
    const res = await request(app)
      .get('/api/v1/vetclinic')

    expect(res.statusCode).toBe(200)
  })
})

describe('DELETE TUTOR', () => {
  it("Tutor's id to delete are valid. Should respond with 200 status code", async () => {
    const tutorToDelete = await tutor.create({
      name: 'Pedro Marques',
      phone: '12345678901',
      email: 'pedro@gmail.com',
      date_of_birth: '2003-10-10 11:23',
      zipcode: '20031006'

    })

    if (tutorToDelete != null) {
      const tutorToUpdateId = tutorToDelete.id

      const res = await request(app)
        .delete(`/api/v1/vetclinic/tutor/${tutorToUpdateId}`)
      expect(res.statusCode).toBe(200)
    }
  })

  it("Tutor's id to delete are valid but not associated with a record. Should respond with 404 status code", async () => {
    const res = await request(app)
      .delete('/api/v1/vetclinic/tutor/12342c30d468d8bd485bb965')

    expect(res.statusCode).toBe(404)
  })

  it("Tutor's id format are invalid. Should respond with 500 status code", async () => {
    const res = await request(app)
      .delete('/api/v1/vetclinic/tutor/invalidId')

    expect(res.statusCode).toBe(500)
  })
})

describe('DELETE PET', () => {
  it("Both pet's id and tutor's are valid. Should respond with 410 status code", async () => {
    const tutor = await request(app).post('/api/v1/vetclinic/tutor').send({
      name: 'Pedro Marques',
      phone: '12345678901',
      email: 'pedro@gmail.com',
      date_of_birth: '2003-10-10 11:23',
      zipcode: '20031006'
    })

    if (tutor.body.data != null) {
      const tutorId: string = tutor.body.data._id

      const pet = await request(app).post(`/api/v1/vetclinic/pet/${tutorId}`).send({
        name: "Marquinhos d'Avilla",
        species: 'Bulldog',
        carry: 'Small',
        weight: 45.5,
        date_of_birth: '2003-10-06 11:23'
      })

      if (pet.body.data != null) {
        const petId = pet.body.data._id
        const res = await request(app).delete(`/api/v1/vetclinic/pet/${petId}/tutor/${tutorId}`)

        expect(res.statusCode).toBe(410)
      }
    }
  })

  it("Pet's id is valid but not associated with a record. Should respond with 404 status code", async () => {
    const tutor = await request(app).post('/api/v1/vetclinic/tutor').send({
      name: 'Pedro Marques',
      phone: '12345678901',
      email: 'pedro@gmail.com',
      date_of_birth: '2003-10-10 11:23',
      zipcode: '20031006'
    })

    if (tutor.body.data != null) {
      const tutorId: string = tutor.body.data._id

      const pet = await request(app).post(`/api/v1/vetclinic/pet/${tutorId}`).send({
        name: "Marquinhos d'Avilla",
        species: 'Bulldog',
        carry: 'Small',
        weight: 45.5,
        date_of_birth: '2003-10-06 11:23'
      })

      if (pet.body.data != null) {
        const res = await request(app).delete(`/api/v1/vetclinic/pet/12342c30d468d8bd485bb965/tutor/${tutorId}`)

        expect(res.statusCode).toBe(404)
      }
    }
  })

  it("Pet's id format are invalid. Should respond with 500 status code", async () => {
    const tutor = await request(app).post('/api/v1/vetclinic/tutor').send({
      name: 'Pedro Marques',
      phone: '12345678901',
      email: 'pedro@gmail.com',
      date_of_birth: '2003-10-10 11:23',
      zipcode: '20031006'
    })

    if (tutor.body.data != null) {
      const tutorId: string = tutor.body.data._id

      const pet = await request(app).post(`/api/v1/vetclinic/pet/${tutorId}`).send({
        name: "Marquinhos d'Avilla",
        species: 'Bulldog',
        carry: 'Small',
        weight: 45.5,
        date_of_birth: '2003-10-06 11:23'
      })

      if (pet.body.data != null) {
        const res = await request(app).delete('/api/v1/vetclinic/pet/<invalidId>/tutor/<invalidId>')

        expect(res.statusCode).toBe(500)
      }
    }
  })
})
