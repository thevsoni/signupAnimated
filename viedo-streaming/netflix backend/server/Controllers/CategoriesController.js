import Categories from "../Models/CategoriesModel.js";
import asyncHandler from 'express-async-handler';

// ******* PUBLIC CONTROLLERS ********

//@desc get all categories
//@route get /api/categories
//@access public
const getCategories = asyncHandler(async (req, res) => {
    try {
        //find all categories in db
        const categories = await Categories.find({});
        //send all categories to the client
        res.json(categories);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

// ****** PRIVATE CONTROLLERS *******



// ****** ADMIN CONTROLLERS *******

//@desc create new category
//@route post /api/categories
//@access private/admin
const createCategory = asyncHandler(async (req, res) => {
    try {
        //get title from request body
        const { title } = req.body;
        //create new category
        const category = new Categories({
            title,
        });
        //save the category in the db
        const createdCategory = await category.save();
        //send new category to the client
        res.status(201).json(createdCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//@desc update category
//@route put /api/categories/:id
//@access private/admin
const updateCategory = asyncHandler(async (req, res) => {
    try {
        //get categoryid from request params
        const category = await Categories.findById(req.params.id);
        if (category) {
            //update category title
            category.title = req.body.title || category.title;
            //save the updated category in the db
            const updatedCategory = await category.save();
            // send the updated category to the client
            res.json(updatedCategory);
        }
        else {
            res.status(404).json({ message: "category not found" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//@desc delete category
//@route delete /api/categories/:id
//@access private/admin
const deleteCategory = asyncHandler(async (req, res) => {
    try {
        //get category id from request params
        const category = await Categories.findById(req.params.id);
        if (category) {
            //delete the category from the database
            await category.deleteOne();
            //send success msg to the client
            res.json({ message: "category removed" });
        }
        else {
            res.status(404).json({ message: "category not found" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export { getCategories, createCategory, updateCategory, deleteCategory }