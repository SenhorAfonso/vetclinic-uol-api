import tutorModel from "../model/tutor";
import petModel from "../model/pet"
import { Request, Response } from 'express';
import bodyparser from 'body-parser';
import mongoose, { Error, Mongoose } from "mongoose";

function getAllTutors(req: Request, res: Response) {
    console.clear()
    const tutors = tutorModel.find({});
    console.log(tutors)
    res.status(200).json({tutors});
    
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

function createNewPet(req: Request, res: Response) {

}

function updatePet(req: Request, res: Response) {

}

function deletePet(req: Request, res: Response) {

}

module.exports = { getAllTutors, createNewTutor, updateTutor, deleteTutor, createNewPet, updatePet, deletePet }
