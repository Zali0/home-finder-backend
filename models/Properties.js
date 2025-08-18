
import mongoose from 'mongoose';

const PropertySchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    type: { type: String, enum: ['Rent', 'Sale'], required: true },
    availability: { type: String, enum: ['Available', 'Unavailable'], required: true },
    bedrooms: { type: Number, required: true, min: 0 },
    bathrooms: { type: Number, required: true, min: 0 },
    parking: { type: String, enum: ['Garage Available', 'No Parking'], required: true },
    kitchen: { type: Number, required: true, min: 0 },
    size: { type: Number, required: true, min: 0 }, // Size in square feet
    createdAt: { type: Date, default: Date.now }
});
   

export default mongoose.model('properties', PropertySchema);