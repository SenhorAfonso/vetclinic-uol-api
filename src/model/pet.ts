import mongoose from 'mongoose';



export const petSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Must provide a name for the pet'],
        trim: true,
        maxlength: [55, 'Name can not be more than 55 characters'],

    },
    species: {
        type: String,
        required: [true, 'Must provide a species for the pet'],
        trim: true,
        maxlength: [55, 'Name can not be more than 55 characters']

    },
    carry: {
        type: String,
        required: [true, 'Must provide a carry description'],
        enum: ['Small', 'Medium', 'Large', 'Giant']
    },
    weight: {
        type: Number,
        required: [true, "Must provide a pet's weight"],
    },
    date_of_birth: {
        type: String,
        required: [true, 'Must provide a birth date'],
        trim: true,
        match: [/\d{4}\-\d{2}\-\d{2}\s\d{2}\:\d{2}/, 'Please fill a valid birth date']
    }
})

export default mongoose.model('petModel', petSchema);
