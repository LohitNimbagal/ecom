import mongoose from "mongoose";

const selectedCatSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: [true, "Please provide a username"],
        // unique: true,
    },
    categories: {
        type: [String],
        required: [true, "Please provide a username"],
    },
    
})

const SelectedCategory = mongoose.models.selectedCat || mongoose.model("selectedCat", selectedCatSchema);

export default SelectedCategory;