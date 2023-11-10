import request from 'supertest';
import app from './server';
import tutor from './model/tutor';
import pet from './model/pet';
import mongoose from 'mongoose';
import exp from 'constants';

console.clear();

afterAll(() => {
    mongoose.connection.close();
})

// agrupar os grupos por métodos
describe('CREATE TUTOR', () => {

    // adicionar um novo tutor com sucesso
    it('Body data is valid. Should return 201 status code', async () => {
        const res = await request(app)
            .post('/api/v1/vetclinic/tutor')
            .send({
                "name": "Pedro Afonso",
                "phone": "12345678901",
                "email": "pedro@gmail.com",
                "date_of_birth": "2003-10-10 11:23",
                "zipcode": "20031006"
            });

            expect(res.statusCode).toBe(201);

      });

    it('Body data is invalid. Should return with 500 status code', async () => {
        const res = await request(app)
            .post('/api/v1/vetclinic/tutor')
            .send({
                "name": "Darwin Raglan Caspian Ahab Poseidon Nicodemius Watterson III",
                "phone": "12345678901",
                "email": "pedro@gmail.com",
                "date_of_birth": "2003-10-10 11:23",
                "zipcode": "20031006"
            });

            expect(res.statusCode).toBe(500);

      });

})

describe('UPDATE TUTOR', () => {

    it('Both id and body data are valid. Should return 200 status code', async () => {

        const tutorToUpdate = await request(app)
            .post('/api/v1/vetclinic/tutor')
            .send({
                "name": "Pedro Alonso",
                "phone": "12345678901",
                "email": "pedro@gmail.com",
                "date_of_birth": "2003-10-10 11:23",
                "zipcode": "20031006"
            });
            
            if (tutorToUpdate.body.data) {
                const tutorId = tutorToUpdate.body.data._id;

                const res = await request(app)
                    .put(`/api/v1/vetclinic/tutor/${tutorId}`)
                    .send({
                        "name": "Pedro Afonso",
                    })

                expect(res.statusCode).toBe(200)

            } else {
                throw new Error('Error creating new tutor');

            }

    })

    it('Id is valid but not associated with a record. Should return 404 status code', async () => {

        const res = await request(app)
            .put(`/api/v1/vetclinic/tutor/12342c30d468d8bd485bb965`)
            .send({
                "name": "Pedro Afonso",
            })

        expect(res.statusCode).toBe(404)

    })

    it('Id format is invalid. Should return 500 status code', async () => {

        const res = await request(app)
            .put(`/api/v1/vetclinic/tutor/<invalidId>`)
            .send({
                "name": "Pedro Afonso",
            })

        expect(res.statusCode).toBe(500)

    })

    it('Body data format is invalid. Should return 500 status code', async () => {

        const res = await request(app)
            .put(`/api/v1/vetclinic/tutor/<invalidId>`)
            .send({
                "name": "Darwin Raglan Caspian Ahab Poseidon Nicodemius Watterson III",
            })

        expect(res.statusCode).toBe(500)

    })



})

describe('CREATE PET', () => {

    it('Should respond with 201 status code', async () => {

        const tutor = await request(app).post('/api/v1/vetclinic/tutor').send({
            "name": "Pedro Afonso",
            "phone": "12345678901",
            "email": "pedro@gmail.com",
            "date_of_birth": "2003-10-10 11:23",
            "zipcode": "20031006"
        })

        if (tutor.body.data) {
            const tutorId: string = tutor.body.data._id;

            const res = await request(app).post(`/api/v1/vetclinic/pet/${tutorId}`).send({
                "name": "Marquinhos d'Avilla",
                "species": "Bulldog",
                "carry": "Small",
                "weight": 45.5,
                "date_of_birth": "2003-10-06 11:23"
            })

            expect(res.statusCode).toBe(201)
        }
    })

    it('Should respond with 500 status code', async () => {

        const tutor = await request(app).post('/api/v1/vetclinic/tutor').send({
            "name": "Pedro Afonso",
            "phone": "12345678901",
            "email": "pedro@gmail.com",
            "date_of_birth": "2003-10-10 11:23",
            "zipcode": "20031006"
        })

        if (tutor.body.data) {
            const tutorId: string = tutor.body.data._id;

            const res = await request(app).post(`/api/v1/vetclinic/pet/${tutorId}`).send({
                "name": "Marquinhos d'Avilla",
                "species": "Bulldog",
                "carry": "Pequeno",
                "weight": 45.5,
                "date_of_birth": "2003-10-06 11:23"
            })

            expect(res.statusCode).toBe(500)
        }
    })

    it('Should respond with 404 status code', async () => {

        const res = await request(app).post(`/api/v1/vetclinic/pet/12342c30d468d8bd485bb965`).send({
            "name": "Marquinhos d'Avilla",
            "species": "Bulldog",
            "carry": "Small",
            "weight": 45.5,
            "date_of_birth": "2003-10-06 11:23"
        })

        expect(res.statusCode).toBe(404)

    })
    
    it('Should respond with 500 status code', async () => {

        const res = await request(app).post(`/api/v1/vetclinic/pet/<invalidId>`).send({
            "name": "Marquinhos d'Avilla",
            "species": "Bulldog",
            "carry": "Small",
            "weight": 45.5,
            "date_of_birth": "2003-10-06 11:23"
        })

        expect(res.statusCode).toBe(500)

    })
    
})


describe('UPDATE PET', () => {

    // update pet valid 
    it('Should respond with 200 status code', async () => {

        console.log('oi')
        const tutor = await request(app).post('/api/v1/vetclinic/tutor').send({
            "name": "Pedro Marques",
            "phone": "12345678901",
            "email": "pedro@gmail.com",
            "date_of_birth": "2003-10-10 11:23",
            "zipcode": "20031006"
        })

        if (tutor.body.data) {
            const tutorId: string = tutor.body.data._id;
        
            const pet = await request(app).post(`/api/v1/vetclinic/pet/${tutorId}`).send({
                "name": "Marquinhos d'Avilla", 
                "species": "Bulldog",
                "carry": "Small",
                "weight": 45.5,
                "date_of_birth": "2003-10-06 11:23"
            })

            if (pet.body.data) {
                console.log('chegou')
                const petId = pet.body.data._id;
                console.log(petId)

                const res = await request(app)
                    .put(`/api/v1/vetclinic/pet/${petId}/tutor/${tutorId}`)
                    .send({
                        "name": "Trovão"
                    })

                expect(res.statusCode).toBe(200);

            }
        }
    })

    it('Should respond with 404 status code', async () => {

        const res = await request(app)
            .put(`/api/v1/vetclinic/pet/12342c30d468d8bd485bb965/tutor/12342c30d468d8bd485bb965`)
            .send({
                "name": "Trovão"
            })

        expect(res.statusCode).toBe(404);

    })

    it('Should respond with 500 status code', async () => {

        const res = await request(app)
        .put(`/api/v1/vetclinic/pet/<invaliID>/tutor/12342c30d468d8bd485bb965`)
        .send({
            "name": "Darwin Raglan Caspian Ahab Poseidon Nicodemius Watterson III"
        })

    expect(res.statusCode).toBe(500);

    })

    it('Should respond with 500 status code', async () => {

        const res = await request(app)
        .put(`/api/v1/vetclinic/pet/<invaliID>/tutor/12342c30d468d8bd485bb965`)
        .send({
            "name": "Trovão"
        })

    expect(res.statusCode).toBe(500);

    })



})


describe("GET /api/v1/vetclinic", () => {

    //  buscar todos os tutores
    it("should respond with 200 status code", async () => {
        const res = await request(app)
            .get("/api/v1/vetclinic");

        expect(res.statusCode).toBe(200);
    });
     

});

describe("DELETE TUTOR", () => {

    it('Should respond with 200 status code', async () => {

        const tutorToDelete = await tutor.create({
            "name": "Pedro Marques",
            "phone": "12345678901",
            "email": "pedro@gmail.com",
            "date_of_birth": "2003-10-10 11:23",
            "zipcode": "20031006"
            
        })
        
        if (tutorToDelete) {
        
            const tutorToUpdateId = tutorToDelete.id;
            
            const res = await request(app)
                .delete(`/api/v1/vetclinic/tutor/${tutorToUpdateId}`)
                expect(res.statusCode).toBe(200);
        }
    

    })

    //  tentativa de telete com id valido e não cadastrado
    it('Should respond with 404 status code', async () => {
        const res = await request(app)
            .delete(`/api/v1/vetclinic/tutor/12342c30d468d8bd485bb965`)

        expect(res.statusCode).toBe(404);
    

    })

    //  tentativa de telete com id invalido e não cadastrado
    it('Should respond with 404 status code', async () => {
        const res = await request(app)
            .delete(`/api/v1/vetclinic/tutor/invalidId`)

        expect(res.statusCode).toBe(500);
    

    })

})

describe("DELETE PET", () => {

    // delete successfull
    it('Should respond with 410 status code', async () => { 

        console.clear()

        const tutor = await request(app).post('/api/v1/vetclinic/tutor').send({
            "name": "Pedro Marques",
            "phone": "12345678901",
            "email": "pedro@gmail.com",
            "date_of_birth": "2003-10-10 11:23",
            "zipcode": "20031006"
        })

        if (tutor.body.data) {
            const tutorId: string = tutor.body.data._id;

            const pet = await request(app).post(`/api/v1/vetclinic/pet/${tutorId}`).send({
                "name": "Marquinhos d'Avilla",
                "species": "Bulldog",
                "carry": "Small",
                "weight": 45.5,
                "date_of_birth": "2003-10-06 11:23"
            })

            if (pet.body.data) {

                const petId = pet.body.data._id;
                const res = await request(app).delete(`/api/v1/vetclinic/pet/${petId}/tutor/${tutorId}`)

                expect(res.statusCode).toBe(410);


            }

        }

    })

    // id not found
    it('Shoul respond with 404 status code', async () => {

        const tutor = await request(app).post('/api/v1/vetclinic/tutor').send({
            "name": "Pedro Marques",
            "phone": "12345678901",
            "email": "pedro@gmail.com",
            "date_of_birth": "2003-10-10 11:23",
            "zipcode": "20031006"
        })

        if (tutor.body.data) {
            const tutorId: string = tutor.body.data._id;

            const pet = await request(app).post(`/api/v1/vetclinic/pet/${tutorId}`).send({
                "name": "Marquinhos d'Avilla",
                "species": "Bulldog",
                "carry": "Small",
                "weight": 45.5,
                "date_of_birth": "2003-10-06 11:23"
            })

            if (pet.body.data) {

                const petId = pet.body.data._id;
                const res = await request(app).delete(`/api/v1/vetclinic/pet/12342c30d468d8bd485bb965/tutor/${tutorId}`)

                expect(res.statusCode).toBe(404);

            }
        }
    })

    // id invalid
    it('Shoul respond with 500 status code', async () => {

        const tutor = await request(app).post('/api/v1/vetclinic/tutor').send({
            "name": "Pedro Marques",
            "phone": "12345678901",
            "email": "pedro@gmail.com",
            "date_of_birth": "2003-10-10 11:23",
            "zipcode": "20031006"
        })

        if (tutor.body.data) {
            const tutorId: string = tutor.body.data._id;

            const pet = await request(app).post(`/api/v1/vetclinic/pet/${tutorId}`).send({
                "name": "Marquinhos d'Avilla",
                "species": "Bulldog",
                "carry": "Small",
                "weight": 45.5,
                "date_of_birth": "2003-10-06 11:23"
            })

            if (pet.body.data) {

                const petId = pet.body.data._id;
                const res = await request(app).delete(`/api/v1/vetclinic/pet/<invalidId>/tutor/<invalidId>`)

                expect(res.statusCode).toBe(500);

            }
        }
    })
})

/*

import request from 'supertest';
import app from './app';

describe('POST /api/v1/vetclinic', () => {
  it('should respond with 201 status code', async () => {
    const res = await request(app)
      .post('/api/v1/vetclinic')
      .send({
        // Seus dados de exemplo para o POST
      });

    expect(res.statusCode).toBe(201);
  });
});

describe('GET /api/v1/vetclinic/:id', () => {
  it('should respond with 200 status code', async () => {
    const res = await request(app).get('/api/v1/vetclinic/123');

    expect(res.statusCode).toBe(200);
  });
});

describe('PUT /api/v1/vetclinic/:id', () => {
  it('should respond with 200 status code', async () => {
    const res = await request(app)
      .put('/api/v1/vetclinic/123')
      .send({
        // Seus dados de exemplo para o PUT
      });

    expect(res.statusCode).toBe(200);
  });
});

describe('DELETE /api/v1/vetclinic/:id', () => {
  it('should respond with 204 status code', async () => {
    const res = await request(app).delete('/api/v1/vetclinic/123');

    expect(res.statusCode).toBe(204);
  });
});

*/

