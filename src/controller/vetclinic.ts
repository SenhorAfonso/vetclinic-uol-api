import tutorModel from '../model/tutor'
import petModel from '../model/pet'
import { type Request, type Response } from 'express'
import { Error } from 'mongoose'

async function getAllTutors (req: Request, res: Response): Promise<void> {
  let success: boolean = true
  let tutors: object = {}
  let status: number = 0

  try {
    tutors = await tutorModel.find({})
    status = 200
  } catch (err: any) {
    success = false
    status = 500
  }

  res.status(status).json({ success, tutors: tutors ?? {} })
};

async function createNewTutor (req: Request, res: Response): Promise<void> {
  let success: boolean = true
  let msg: string = ''
  let status: number = 0
  let newTutor: object = {}

  try {
    newTutor = await tutorModel.create(req.body)
    msg = 'Created object'
    status = 201
  } catch (err) {
    success = false
    if (err instanceof Error.ValidationError) {
      msg = `Field validation error: ${err.message}`
      status = 500
    } else {
      status = 500
    }
  }

  res.status(status).json({ success, msg, newTutor: newTutor ?? {} })
}

async function updateTutor (req: Request, res: Response): Promise<void> {
  const { id: tutorId } = req.params
  const newTutorInfo = req.body

  let success: boolean = true
  let msg: string = ''
  let status: number = 0
  let updatedTutor: object | null = {}

  try {
    updatedTutor = await tutorModel.findByIdAndUpdate(
      tutorId,
      newTutorInfo,
      { new: true, runValidators: true }
    )

    if (updatedTutor != null) {
      status = 200
      msg = 'Updated object.'
    } else {
      success = false
      msg = `There is no tutor with id = ${tutorId}`
      status = 404
    }
  } catch (err) {
    success = false
    if (err instanceof Error.ValidationError) {
      msg = `Field validation error: ${err.message}`
      status = 500
    } else if (err instanceof Error.CastError) {
      msg = `The ID ${tutorId} is not compatible with type ObjectId`
      status = 500
    }
  }

  res.status(status).json({ success, msg, updatedTutor: updatedTutor ?? {} })
}

async function deleteTutor (req: Request, res: Response): Promise<void> {
  const tutorId = req.params.id

  let msg: string = ''
  let status: number = 0
  let success: boolean = true
  let deletedTutor: object | null = {}

  try {
    deletedTutor = await tutorModel.findOneAndDelete({ _id: tutorId })

    if (deletedTutor != null) {
      status = 200
      msg = 'Deleted object'
    } else {
      success = false
      msg = `There is no tutor with id = ${tutorId}`
      status = 404
    }
  } catch (err: any) {
    if (err instanceof Error.CastError) {
      msg = `The ID ${tutorId} (${typeof tutorId}) is not compatible with type ObjectId`
      status = 500
    } else {
      status = 500
      msg = `${err}`
    }
  }

  res.status(status).json({ success, msg, deletedTutor: deletedTutor ?? {} })
}

async function createNewPet (req: Request, res: Response): Promise<void> {
  let success: boolean = true
  let msg: string = ''
  let newPet: object | null = {}
  let status: number = 0

  try {
    await tutorModel.findById(req.params.tutorId)
      .then(async (doc) => {
        if (doc != null) {
          try {
            if (req.body.carry === undefined) {
              const petWeight: number = req.body.weight

              if (petWeight < 10) {
                req.body.carry = 'Small'
              } else if (petWeight < 27) {
                req.body.carry = 'Medium'
              } else if (petWeight < 45) {
                req.body.carry = 'Large'
              } else {
                req.body.carry = 'Giant'
              }
            }

            newPet = await petModel.create(req.body)
            doc.pets.push(newPet)
            await doc.save()
            msg = 'Created object'
            status = 201
          } catch (err: any) {
            if (err instanceof Error.ValidationError) {
              msg = `Field validation error: ${err.message}`
              status = 500
            } else {
              status = 500
              msg = `${err}`
            }
          }
        } else {
          success = false
          msg = `There is no tutor with id = ${req.params.tutorId}`
          status = 404
        }
      })
      .catch((err: any) => {
        success = false
        if (err instanceof Error.ValidationError) {
          msg = `Field validation error: ${err.message}`
          status = 500
        } else if (err instanceof Error.CastError) {
          msg = `The ID ${req.params.tutorId} (${typeof req.params.tutorId}) is not compatible with type ObjectId`
          status = 500
        }
      })
  } catch (err: any) {
    success = false
    status = 500
    msg = `${err}`
  }

  res.status(status).json({ success, msg, newPet: newPet ?? {} })
}
async function updatePet (req: Request, res: Response): Promise<void> {
  const petId = req.params.petId
  const tutorId = req.params.tutorId
  const newPetInfo = req.body

  let success: boolean = true
  let msg: string = ''
  let status: number = 0
  let updatedPet: object | null = {}
  let petToUpdate: object | null = {}
  let tutorToUpdate: any

  try {
    tutorToUpdate = await petModel.findOne({ _id: petId })

    if (tutorToUpdate != null) {
      petToUpdate = await petModel.findOne({ _id: petId })

      if (petToUpdate != null) {
        updatedPet = await petModel.findOneAndUpdate({ _id: petId }, newPetInfo, { new: true })

        tutorToUpdate = await tutorModel.findByIdAndUpdate(
          tutorId,
          { $pull: { pets: petToUpdate } },
          { new: true })

        tutorToUpdate = await tutorModel.findByIdAndUpdate(
          tutorId,
          { $push: { pets: updatedPet } },
          { new: true })

        status = 200
        msg = 'Updated pet'
      } else {
        status = 404
        msg = `There is no pet with id ${petId}`
      }
    } else {
      status = 404
      msg = `There is no tutor with id ${tutorId}`
    }
  } catch (err: any) {
    success = false
    if (err instanceof Error.ValidationError) {
      msg = `Field validation error: ${err.message}`
      status = 500
    } else if (err instanceof Error.CastError) {
      msg = `The ID ${tutorId} is not compatible with type ObjectId`
      status = 500
    }
  }

  res.status(status).json({ success, msg, updatedPet: updatedPet ?? {} })
}

async function deletePet (req: Request, res: Response): Promise<void> {
  const petId = req.params.petId
  const tutorId = req.params.tutorId

  let status: number = 0
  let msg: string = ''
  let success: boolean = true
  let deletedPet: object | null = {}
  let tutorToUpdate: any

  try {
    tutorToUpdate = tutorModel.findById({ _id: tutorId })

    if (tutorToUpdate != null) {
      deletedPet = await petModel.findOneAndDelete({ _id: petId })

      if (deletedPet != null) {
        tutorToUpdate = await tutorModel.findByIdAndUpdate(
          tutorId,
          { $pull: { pets: deletedPet } },
          { new: true })

        status = 200
        msg = 'Deleted object'
      } else {
        success = false
        status = 404
        msg = `There is no pet with id = ${petId}`
      }
    } else {
      status = 404
      success = false
      msg = `There is no tutor with id = ${tutorId}`
    }
  } catch (err) {
    success = false
    if (err instanceof Error.CastError) {
      msg = `The ID ${tutorId} (${typeof tutorId}) is not compatible with type ObjectId`
      status = 500
    }
  }
  res.status(status).json({ success, msg, status, deletedPet: deletedPet ?? {} })
}

export { getAllTutors, createNewTutor, updateTutor, deleteTutor, createNewPet, updatePet, deletePet }
