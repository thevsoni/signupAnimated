
import express from 'express';
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import storage from '../config/firebaseStorage.js';


const Uploadrouter = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
});

Uploadrouter.post('/', upload.single('file'), async (req, res) => {
    try {
        //get file from request
        const file = req.file;
        //create a new filename
        if (file) {
            const filename = `${uuidv4()}${path.extname(file.originalname)}`;
            const blob = storage.file(filename);


            const blobStream = blob.createWriteStream({
                resumable: false,
                metadata: {
                    contentType: file.mimetype,
                },
            });


            //if error
            blobStream.on("error", (error) => {
                res.status(400).json({ message: error.message, error: error });
                console.log("error")
            });

            //if success
            blobStream.on("finish", () => {
                console.log("success")
                //get the public url
                const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${storage.name}/o/${filename}?alt=media`;
                //return the public url
                res.status(200).json(publicUrl)
            });

            blobStream.end(file.buffer);
        }
        //when there is no file
        else {
            res.status(400).json({ message: "pls upload a file" })
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default Uploadrouter;



//above code is not working .doubt it is of firebase-admin.


//below codes are working but getting only downloading url
//for these ,i m using firebaseStorage2.js
/*
//now i m using general portion of firebase
import express, { Router } from 'express';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import multer from 'multer';
import config from '../config/firebaseStorage2.js';

const router = express.Router();

//initialize a firebase application
initializeApp(config.firebaseConfig);

//initialize cloud storage and get a reference to the service
const storage = getStorage();

//setting up multer as a middleware to grab photo uploads
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('file'), async (req, res) => {
    try {
        const storageRef = ref(storage, `${req.file.originalname}`)

        //create file metadata including the content type
        const metaData = { contentType: req.file.mimetype }

        //upload the file in the bucket storage
        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer)
        //by using uploadBytesResumable ,we can control the progress of uploading
        console.log("done till here")
        //grab the public url
        const downloadURL = await getDownloadURL(snapshot.ref);
        res.status(200).json({
            message: 'file uploaded successfully',
            name: req.file.originalname,
            type: req.file.mimetype,
            downloadURL: downloadURL
        })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
export default router;

*/
//now i will do some changes in above code .above code is working but badhiya se ab



/*
//now i m using general portion of firebase
import express from 'express';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import config from '../config/firebaseStorage2.js';

const router = express.Router();

//initialize a firebase application
initializeApp(config.firebaseConfig);

//initialize cloud storage and get a reference to the service
const storage = getStorage();

//setting up multer as a middleware to grab photo uploads
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('file'), async (req, res) => {

    try {
        const filename = `${uuidv4()}${path.extname(req.file.originalname)}`;

        // const storageRef = ref(storage, req.file.originalname)
        const storageRef = ref(storage, filename)

        //create file metadata including the content type
        const metaData = { contentType: req.file.mimetype }

        //upload the file in the bucket storage
        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer)
        //by using uploadBytesResumable ,we can control the progress of uploading
        console.log("done till here")


        //grab the public url
        const downloadURL = await getDownloadURL(snapshot.ref);
        // const viewURL = `https://firebasestorage.googleapis.com/v0/b/${storage.name}/o/${filename}?alt=media`;

        // Generate a view-only URL with a 5-minute expiration
        // const signedUrl = await snapshot.getSignedUrl({
        //     action: 'read',
        //     expires: '03-17-2024'
        // });



        // Return the view-only URL to the client
        // res.send({ url: signedUrl });

        res.status(200).json({
            message: 'file uploaded successfully',
            name: req.file.originalname,
            type: req.file.mimetype,
            downloadURL: downloadURL,
            // viewURL: signedUrl
        })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
export default router;
*/