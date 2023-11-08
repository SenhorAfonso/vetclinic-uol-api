import tutorModel from "../model/tutor";
import petModel from "../model/pet"
import { Request, Response } from 'express';
import bodyparser from 'body-parser';
import mongoose, { Error, Mongoose } from "mongoose";


type pet = {
    name: string,
    species: string,
    carry: 'Small' | 'Mediu' |'large' | 'Giant',
    weight: Number,
    date_of_birth: Date;
}

async function getAllTutors(req: Request, res: Response) {
    console.clear()
    let sucess: boolean = true;
    let tutors: object = {};

    try {
        tutors = await tutorModel.find({});
    } catch (err: any) {
        sucess = false;
        res.status(500).json({sucess, data: tutors});
    }

    res.status(200).json({sucess, tutors});
    
};

async function createNewTutor(req: Request, res: Response) {
    console.clear()
    let newTutor: object = {};
    let sucess: boolean = true;
    try {
        newTutor = await tutorModel.create(req.body);
    } catch (err) {
        sucess = false;
        if (err instanceof Error.ValidationError) {
            console.log(err.message);
        } else {
            console.log(err)
        }
    } 
    
    res.send({sucess, data: newTutor})
    
}

function updateTutor(req: Request, res: Response) {
    console.clear()
    
}

function deleteTutor(req: Request, res: Response) {

}

async function createNewPet(req: Request, res: Response) {
    console.clear()
    let newPet: object = {};
    let sucess: boolean = true;
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
                    sucess = false;
                    msg = `There is no tutor with id = ${req.params.tutorId}`
                    res.json({sucess, msg})
                    
                }})
                .catch ((err: any)=> {
                    sucess = false;
                    if (err instanceof Error.ValidationError) {
                        console.log(err.message)
                    } else if (err instanceof Error.CastError) {
                        msg = `The ID ${req.params.tutorId} (${typeof req.params.tutorId}) is not compatible with type ObjectId`
                        res.json({sucess, msg})
                }
            }) 

    } catch (err: any) {
        
        sucess = false;
    }

    res.send({sucess, data: newPet});

}

function updatePet(req: Request, res: Response) {

}

function deletePet(req: Request, res: Response) {
    
}

module.exports = { getAllTutors, createNewTutor, updateTutor, deleteTutor, createNewPet, updatePet, deletePet }
