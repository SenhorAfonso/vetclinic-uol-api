import tutorModel from "../model/tutor";
import petModel from "../model/pet"
import { Request, Response } from 'express';
import bodyparser from 'body-parser';
import mongoose, { Error, Mongoose } from "mongoose";
import { error } from "console";
import tutor from "../model/tutor";

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

    res.status(200).json({success, data: tutors});
    
};

async function createNewTutor(req: Request, res: Response) {
    console.clear()
    let newTutor: object = {};
    let success: boolean = true;
    try {
        newTutor = await tutorModel.create(req.body);
    } catch (err) {
        success = false;
        if (err instanceof Error.ValidationError) {
            console.log(err.message);
        } else {
            console.log(err)
        }
    } 
    
    res.send({success, data: newTutor})
    
}

async function updateTutor(req: Request, res: Response) {
    console.clear()

    const {id: tutorId} = req.params;
    const newTutorInfo = req.body;

    let success: boolean = true;
    let msg: string;

    try {
        const updatedTutor = await tutorModel.findByIdAndUpdate(
            tutorId,
            newTutorInfo,
            {new: true, runValidators: true}
        );

        if (updatedTutor) {
            res.json({success, data: updatedTutor})
        } else {
            success = false;
            msg = `There is no tutor with id = ${tutorId}`;
            res.status(404).json({ success, msg });
        }
    } catch (err) {
        success = false;
        if (err instanceof Error.ValidationError) {
            msg = `Field validation error: ${err.message}`;
            res.json({ success, msg });

        } else if (err instanceof Error.CastError) {
            msg = `The ID ${tutorId} is not compatible with type ObjectId`;
            res.json({ success, msg });

        }
    }

}

async function deleteTutor(req: Request, res: Response) {

    const tutorId = req.params.id;

    let msg: string;
    let success: boolean = true;

    try {
        const deletedTutor = await tutorModel.findOneAndDelete({_id: tutorId});

        if (deletedTutor) {
            res.status(200).json({success, deletedTutor});
        } else {
            success = false;
            msg = `There is no tutor with id = ${tutorId}`;
            res.status(404).json({success, msg})
        }

    } catch (err) {
        if (err instanceof Error.CastError) {
            msg = `The ID ${tutorId} (${typeof tutorId}) is not compatible with type ObjectId`
            return res.json({success, msg})
        }
    }

}

async function createNewPet(req: Request, res: Response) {
    console.clear()
    let newPet: object = {};
    let success: boolean = true;
    let tutor: object | null = {};
    let msg: string;
    console.log(req.body)
    
    try {

        await tutorModel.findById(req.params.tutorId)
            .then(async (doc) => {
                if (doc) {
                    newPet = await petModel.create(req.body);
                    doc.pets.push(newPet);
                    doc.save();
                } else {
                    success = false;
                    msg = `There is no tutor with id = ${req.params.tutorId}`
                    res.json({success, msg})
                    
                }})
                .catch ((err: any)=> {
                    success = false;
                    if (err instanceof Error.ValidationError) {
                        msg = `Field validation error: ${err.message}`
                        return res.json({success, msg})
                    } else if (err instanceof Error.CastError) {
                        msg = `The ID ${req.params.tutorId} (${typeof req.params.tutorId}) is not compatible with type ObjectId`
                        return res.json({success, msg})
                    } else {
                        res.json({"deu ruim": "Muito"})
                    }
            }) 

    } catch (err: any) {
        success = false;
    }

    res.json({success, data: newPet});

}

async function updatePet(req: Request, res: Response) {
    console.clear();

    const petId = req.params.petId; 
    const tutorId = req.params.tutorId; 
    const newPetInfo = req.body;

    let success: boolean = true;
    let msg: string;

    try {
        
        const updatedPet = await petModel.findByIdAndUpdate(
            petId,
            newPetInfo,
            {new: true, runValidators: true}
        )

        if (updatedPet) {
            res.status(200).json({success, data: updatedPet})
        } else {
            success = false;
            msg = `There is no pet with id = ${petId}`;
            res.status(404).json({ success, msg });
        }

    } catch (err) {
        success = false;
        if (err instanceof Error.ValidationError) {
            msg = `Field validation error: ${err.message}`;
            res.json({ success, msg });

        } else if (err instanceof Error.CastError) {
            msg = `The ID ${petId} is not compatible with type ObjectId`;
            res.json({ success, msg });

        }
    }   
}

async function deletePet(req: Request, res: Response) {
    console.clear()

    const petId = req.params.petId;
    const tutorId = req.params.tutorId;

    let msg: string;
    let success: boolean = true;

    try {
        const deletedPet = await petModel.findOneAndDelete({_id: petId});

        if (deletedPet) {
            const updatedTutor = await tutorModel.findByIdAndUpdate(
                tutorId,
                { $pull: { pets: deletedPet } },
                { new: true }
            );
            res.json({success, deletedPet});

        } else {
            success = false;
            msg = `There is no pet with id ${petId}`;
            res.status(404).json({success, msg});

        }

    } catch (err) {
        if (err instanceof Error.CastError) {
            msg = `The ID ${req.params.tutorId} (${typeof req.params.tutorId}) is not compatible with type ObjectId`
            return res.json({success, msg})
        }
    }
}

module.exports = { getAllTutors, createNewTutor, updateTutor, deleteTutor, createNewPet, updatePet, deletePet }
