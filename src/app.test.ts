import request from 'supertest';
import app from './server';
import tutor from './model/tutor';
import pet from './model/pet';
import mongoose from 'mongoose';

console.clear();

afterAll(() => {
    mongoose.connection.close();
})

describe("GET /api/v1/vetclinic", () => {

    //  buscar todos os tutores
    it("should respond with 200 status code", async () => {
        const res = await request(app)
            .get("/api/v1/vetclinic");

        expect(res.statusCode).toBe(200);
    });

    // adicionar um novo tutor com sucesso
    it('should respond with 201 status code', async () => {
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


    //  atualizar os dados de um tutor
    it('should respond with 200 status code', async () => {
        console.clear()
        console.log('oi')
        const tutorToUpdate = await tutor.create({
            "name": "Pedro Marques",
            "phone": "12345678901",
            "email": "pedro@gmail.com",
            "date_of_birth": "2003-10-10 11:23",
            "zipcode": "20031006"
            
        })
        
        if (tutorToUpdate) {
            console.log('oi')
        
            const tutorToUpdateId = tutorToUpdate.id;
            console.log(`o id é: ${tutorToUpdateId}`);
            const res = await request(app)
                .put(`/api/v1/vetclinic/tutor/${tutorToUpdateId}`)
                .send({
                    "name": "Pedro Afonso"
                });

                console.log(res.statusCode)
                expect(res.statusCode).toBe(200);
        }

    });

    //  atualizar tutor com id valido mas incorreto
    it('should respond with 404 status code', async () => {

        const res = await request(app)
            .put(`/api/v1/vetclinic/tutor/12342c30d468d8bd485bb965`)
            .send({
                "name": "Pedro Afonso"
            });

            console.log(res.statusCode)
            expect(res.statusCode).toBe(404);
        

    });

    // atualizar tutor com id invalido
    it('should respond with 500 status code', async () => {

        const res = await request(app)
            .put(`/api/v1/vetclinic/tutor/1234`)
            .send({
                "name": "Pedro Afonso"
            });

            console.log(res.statusCode)
            expect(res.statusCode).toBe(500);
        

    });

    // atualizar tutor com field invalido
    it('should respond with 500 status code', async () => {

        const res = await request(app)
            .put(`/api/v1/vetclinic/tutor/1234`)
            .send({
                "name": "Pedro Afonso da Silva Marques Alberto Nunes de Souze Junior"
            });

            console.log(res.statusCode)
            expect(res.statusCode).toBe(500);
        

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
            .delete(`/api/v1/vetclinic/tutor/IdInvalido`)

        expect(res.statusCode).toBe(500);
    

    })

})

describe("DELETE PET", () => {

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
                const res = await request(app).delete(`/api/v1/vetclinic/pet/${petId}/tutor/${tutorId}`)

                expect(res.statusCode).toBe(410);


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

