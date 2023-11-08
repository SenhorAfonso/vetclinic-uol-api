import mongoose from 'mongoose';
import petSchema from './pet';

export const tutorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Must provide a name'],
        trim: true,
        maxlength: [55, 'Name can not be more than 55 characters']
    },
    phone: {
        type: String,
        required: [true, 'Must provide a phone number'],
        trim: true,
        maxlength: [11, 'Phone can not be more than 11 characters'],
        match: [/\d{11}/g, 'Please fill a valid phone number']
        
    },
    email: {
        type: String,
        required: [true, 'Must provide a email address'],
        trim: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please fill a valid email address']
    },
    date_of_birth: {
        type: Date,
        required: [true, 'Must provide a birth date'],
        trim: true,
        match: [/\d{4}\-\d{2}\-\d{2}\s\d{2}\:\d{2}/, 'Please fill a valid birth date']
    },
    zipcode: {
        type: String,
        required: [true, 'Must provide a zipcode'],
        trim: true,
        maxlength: [8, 'Zipcode can not be more than 8 characters'],
        match: [/\d{8}/, 'Please fill a valid zipcode']
    },
    pets: [
        {
            type: mongoose.Types.ObjectId,
            ref: petSchema
        }
    ]
    
})

export default mongoose.model('tutorModel', tutorSchema);