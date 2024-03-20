import mongoose from "mongoose";

// Define the schema
const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    id: {
        type: Number,
        required: true,
        unique: true
    }
});

// Create a model based on the schema
const Category = mongoose.models.category ?? mongoose.model('category', CategorySchema);

export default Category;