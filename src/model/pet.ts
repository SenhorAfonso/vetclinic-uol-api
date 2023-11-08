import mongoose from 'mongoose';

export const petSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Must provide a name for the pet'],
        trim: true,
        maxlenght: [55, 'Name can not be more than 55 characters']

    },
    species: {
        type: String,
        require: [true, 'Must provide a species for the pet'],
        trim: true,
        maxlenght: [55, 'Name can not be more than 55 characters']

    },
    carry: {
        type: String,
        require: [true, 'Must provide a carry description']
    },
    weight: {
        type: Number,
        require: [true, "Must provide a pet's weight"],
    },
    date_of_birth: {

    }
})

export default mongoose.model('petModel', petSchema);