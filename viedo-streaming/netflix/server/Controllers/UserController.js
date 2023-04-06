import asyncHandler from 'express-async-handler';
import User from '../Models/UserModel.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../middlewares/Auth.js';


// register user
// route post /api/users
// access public
const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, password, image } = req.body;
    try {
        const userExists = await User.findOne({ email });

        //check if user exists
        if (userExists) {
            res.status(400);
            throw new Error('User already exists');
        }

        //hash pwd
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        //create a user in db
        const user = await User.create({
            fullName,
            email,
            password: hashedPassword,
            image
        })

        //if user created successfully send user data and token to client
        if (user) {
            res.status(201).json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                image: user.image,
                isAdmin: user.isAdmin,
                token: generateToken(user._id)
            });
        }
        else {
            res.status(400);
            throw new Error("invalid user data")
        }
    } catch (error) {
        res.status(401).json({ message: error.message })
    }
});

//login user
//route post /api/users/login
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    try {
        //find user in db
        const user = await User.findOne({ email });
        //if user exists then compare pwd then send user data and token to client 
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                image: user.image,
                isAdmin: user.isAdmin,
                token: generateToken(user._id)
            })
        }
        else {
            res.status(401);
            throw new Error("invalid email or password");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

//private controllers


//update user profile
//route put /api/users/profile
const updateUserProfile = asyncHandler(async (req, res) => {
    const { fullName, email, image } = req.body;
    try {
        //find user in db
        const user = await User.findById(req.user._id);
        //if user exists update user data and save it in db
        if (user) {
            user.fullName = fullName || user.fullName;
            user.email = email || user.email;
            user.image = image || user.image;

            const updateUser = await user.save();
            //send update user data and token to client
            res.json({
                _id: updateUser._id,
                fullName: updateUser.fullName,
                email: updateUser.email,
                image: updateUser.image,
                isAdmin: updateUser.isAdmin,
                token: generateToken(updateUser._id)
            })

        }
        else {
            res.status(404);
            throw new Error("User not found");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})


//delete user profile
//route delete /api/users
//access private
const deleteUserProfile = asyncHandler(async (req, res) => {
    try {

        //find user in DB
        const user = await User.findById(req.user._id);
        //if user exists delete user from db

        if (user) {
            //if user is admin throw eror msg
            if (user.isAdmin) {
                res.status(400);
                throw new Error("cant delete admin user");
            }
            //else delete user from db
            // await user.remove();  it is not working
            await user.deleteOne();
            //may be delete() will also works

            res.json({ message: "user deleted successfully" })
        }
        else {
            res.status(404);
            throw new Error("User not found")
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})


//change user password
//route PUT /api/users/password
//access private
const changePassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    try {
        //find user in db
        const user = await User.findById(req.user._id);
        //if user exist ,compare old password with hashed password then update user password and save it in db
        if (user && (await bcrypt.compare(oldPassword, user.password))) {
            //hash new passsword
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);
            user.password = hashedPassword;
            await user.save();
            res.json({ message: "Password changed successfully" })
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

export { registerUser, loginUser, updateUserProfile, deleteUserProfile, changePassword }
// export default registerUser 