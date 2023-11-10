import tutorModel from "../model/tutor";
import petModel from "../model/pet"
import { Request, Response } from 'express';
import bodyparser from 'body-parser';
import mongoose, { Error, Mongoose } from "mongoose";
import { error } from "console";
import tutor from "../model/tutor";

// TESTADO
async function getAllTutors(req: Request, res: Response) {
    console.clear()
    let success: boolean = true;
    let tutors: object = {};

    try {
        tutors = await tutorModel.find({});
    } catch (err: any) {
        success = false;
        res.status(500).json({success, data: tutors});
    }

    res.status(200).json({success, tutors: tutors ?? {}});
    
};

// TESTADO
async function createNewTutor(req: Request, res: Response) {

    let success: boolean = true;
    let msg: string = '';
    let status: number = 0;
    let newTutor: object = {};

    try {
        newTutor = await tutorModel.create(req.body);
        msg = `Created object`;
        status = 201;

    } catch (err) {
        success = false;
        if (err instanceof Error.ValidationError) {
            msg = `Field validation error: ${err.message}`;
            status = 500;
        } else {
            status = 500;
        }
    } 

    res.status(status).json({success, msg, newTutor: newTutor ?? {}})

    
}

// TESTADO
async function updateTutor(req: Request, res: Response) {
    const {id: tutorId} = req.params;
    const newTutorInfo = req.body;

    let success: boolean = true;
    let msg: string = '';
    let status: number = 0;
    let updatedTutor: object | null = {};

    try {
        updatedTutor = await tutorModel.findByIdAndUpdate(
            tutorId,
            newTutorInfo,
            {new: true, runValidators: true}
        );

        if (updatedTutor) {
            status = 200;
            msg = 'Created object.';

        } else {
            success = false;
            msg = `There is no tutor with id = ${tutorId}`;
            status = 404;

        }
    } catch (err) {
        success = false;
        if (err instanceof Error.ValidationError) {
            msg = `Field validation error: ${err.message}`;
            status = 500;
            
        } else if (err instanceof Error.CastError) {
            msg = `The ID ${tutorId} is not compatible with type ObjectId`;
            status = 500;

        }
    }

    res.status(status).json({success, msg, updatedTutor: updatedTutor ?? {}})

}

// TESTADO
async function deleteTutor(req: Request, res: Response) {
    const tutorId = req.params.id;

    let msg: string = '';
    let status: number = 0;
    let success: boolean = true;
    let deletedTutor: object | null = {};


    try {
        deletedTutor = await tutorModel.findOneAndDelete({_id: tutorId});

        if (deletedTutor) {
            status = 200;
            msg = 'Deleted object';

        } else {
            success = false;
            msg = `There is no tutor with id = ${tutorId}`;
            status = 404;

        }

    } catch (err) {
        if (err instanceof Error.CastError) {
            msg = `The ID ${tutorId} (${typeof tutorId}) is not compatible with type ObjectId`;
            status = 500;

        } else {
            status = 500
            msg =  `${err}`
        }
    }

    res.status(status).json({success, msg, dadeletedTutorta: deletedTutor ?? {}})


}

// TESTADO
async function createNewPet(req: Request, res: Response) {

    let success: boolean = true;
    let msg: string = '';
    let newPet: object | null = {};
    let status: number = 0;
    
    try {
        await tutorModel.findById(req.params.tutorId)
            .then(async (doc) => {
                if (doc) {
                    try {
                        console.log(req.body)
                        newPet = await petModel.create(req.body);
                        doc.pets.push(newPet);
                        doc.save();
                        msg = 'Created object';
                        status = 201;
                    } catch (err) {
                        if (err instanceof Error.ValidationError) {
                            msg = `Field validation error: ${err.message}`;
                            status = 500;

                        } else {
                            status = 500;
                            msg = `${err}`

                        }
                    }
                } else {
                    success = false;
                    msg = `There is no tutor with id = ${req.params.tutorId}`
                    status = 404;
                    
                }})
                .catch ((err: any)=> {
                    success = false;
                    if (err instanceof Error.ValidationError) {
                        msg = `Field validation error: ${err.message}`
                        status = 500;

                    } else if (err instanceof Error.CastError) {
                        msg = `The ID ${req.params.tutorId} (${typeof req.params.tutorId}) is not compatible with type ObjectId`
                        status = 500;

                    } 
                }) 

    } catch (err: any) {
        success = false;
        status = 500
        msg = `${err}`
    }
    
    res.status(status).json({success, msg, newPet: newPet ?? {}})
}

// ATUALIZAR O PET DE DENTRO DO TUTOR
// primeiro achar o tutor, depois atualizar o pet e só no fim atualizar o tutor
async function updatePet(req: Request, res: Response) {

    const petId = req.params.petId; 
    const tutorId = req.params.tutorId; 
    const newPetInfo = req.body;

    let success: boolean = true;
    let msg: string = '';
    let status: number = 0;
    let updatedPet: object | null = {};

    try {
        updatedPet = await petModel.findByIdAndUpdate(
            petId,
            newPetInfo,
            {new: true, runValidators: true}
        )

        if (updatedPet) {

            status = 200;
            
        } else {
            success = false;
            msg = `There is no pet with id = ${petId}`;
            status = 404;
            
        }

    } catch (err) {
        success = false;
        if (err instanceof Error.ValidationError) {
            msg = `Field validation error: ${err.message}`;
            status = 500;
            
        } else if (err instanceof Error.CastError) {
            msg = `The ID ${petId} is not compatible with type ObjectId`;
            status = 500;
        }
    }   

    res.status(status).json({success, status, updatedPet: updatedPet ?? {}})

}

// TESTADO
async function deletePet(req: Request, res: Response) {
    const petId = req.params.petId;
    const tutorId = req.params.tutorId;

    let status: number = 0;
    let msg: string = '';
    let success: boolean = true;
    let deletedPet: object | null = {};
    let tutorToUpdate: any;
    
    try {
        tutorToUpdate = tutorModel.findById({_id: tutorId})

        if (tutorToUpdate) {
            deletedPet = await petModel.findOneAndDelete({_id: petId});

            if (deletedPet) {
                tutorToUpdate = await tutorModel.findByIdAndUpdate(
                    tutorId,
                    { $pull: { pets: deletedPet } },
                    { new: true });

                status = 200;

            } else {
                status = 404;
                msg = `There is no pet with id = ${petId}`

            }

        } else {
            status = 404;
            msg = `There is no tutor with id = ${tutorId}`

        }

    } catch (err) {
        if (err instanceof Error.CastError) {
            msg = `The ID ${tutorId} (${typeof tutorId}) is not compatible with type ObjectId`
            status = 500;
        }
    }
    res.status(status).json({success, msg, status, deletedPet: deletedPet ?? {}})
}

module.exports = { getAllTutors, createNewTutor, updateTutor, deleteTutor, createNewPet, updatePet, deletePet }
