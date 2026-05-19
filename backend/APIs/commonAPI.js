// create mini applications
import exp from 'express'
import {UserModel} from '../models/UserModel.js'
import {hash,compare} from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { verifyToken } from '../middlewares/verifyToken.js'

export const commonApp = exp.Router()
import {upload} from '../config/multer.js'
import {uploadToCloudinary} from '../config/cloudinaryUpload.js'
import cloudinary from '../config/cloudinary.js'

const {sign}=jwt

const getCookieOptions = (req) => {
    const origin = req.get("origin") || "";
    const isLocalRequest = origin.startsWith("http://localhost") || origin.startsWith("http://127.0.0.1");

    return {
        httpOnly: true,
        sameSite: isLocalRequest ? "lax" : "none",
        secure: !isLocalRequest,
    }
}

// Route to register
commonApp.post('/users', upload.single("profileImageUrl"), async (req, res, next) => {
    let cloudinaryResult;

    try {
        // get tthe details of the user
        const newUser = req.body;

        // check for the roles : only author and user not admin
        let allowedRoles = ['USER', 'AUTHOR']
        if (!allowedRoles.includes(newUser.role))
            return res.status(400).json({ message: "invalid role" })

        /// upload image to cloudinary from memoryStorage
        if (req.file) {
    try {
        cloudinaryResult = await uploadToCloudinary(req.file.buffer);
        newUser.profileImageUrl = cloudinaryResult?.secure_url;
    } catch (err) {
        newUser.profileImageUrl = "";
    }
} else {
    newUser.profileImageUrl = "";
}

        // RUN VALIDATORS MANUALLY

        // replace the password eith hashed password
        newUser.password = await hash(newUser.password, 12)

        // create document
        const userDocument = new UserModel(newUser);

        // save document
        await userDocument.save()

        // send respone
        res.status(201).json({ message: "User registered " });

    } catch (err) {
        //delete image from cloudinary
        if (cloudinaryResult?.public_id)
            await cloudinary.uploader.destroy(cloudinaryResult.public_id)

        next(err);
    }
})

// route for login
commonApp.post('/login', async (req, res) => {
    // get email and password from the req
    const { email, password } = req.body;

    // get user details
    const user = await UserModel.findOne({ email: email })
    if (!user) {
        return res.status(400).json({ message: "Invalid email" });
    }

    // compare the password with og password
    let isMatched = await compare(password, user.password)
    if (!isMatched) {
        return res.status(400).json({ message: "Incorrect password" });
    }

    // TOKEN CREATION
  const signedToken = sign(
  {
    id: user._id,
    email: user.email,
    role: user.role,
    firstName: user.firstName,
    lastName: user.lastName,
    profileImageUrl: user.profileImageUrl
  },
  process.env.SECRET_KEY,
  { expiresIn: "1h" }
)

    // set token to the cookie header 
    res.cookie("token", signedToken, getCookieOptions(req))

    // remove the password field from the user obj
    const userObj = user.toObject();
    delete userObj.password;

    res.status(200).json({ message: "Login Successful", payload: userObj })
})

// route for logout
commonApp.get('/logout', (req, res) => {
    // delete the teoken from the cookie storage
    res.clearCookie("token", getCookieOptions(req))
    res.status(200).json({ message: "Logged out successfully" });
})

// Page for refresh
commonApp.get("/check-auth", verifyToken("USER", "AUTHOR", "ADMIN"), (req, res) => {
    res.status(200).json({
        message: "authenticated",
        payload: req.user,
    });
});

// change the password
commonApp.put('/password', verifyToken("ADMIN", "AUTHOR", "USER"), async (req, res) => {
    // check if current and new Passwords are same
    const { currentPassword, newPassword } = req.body;

    if (currentPassword === newPassword) {
        return res.json({ message: "Current and new passwords should not be the same" })
    }

    // get current password from the role loggedin
    const userId = req.user?.id;

    // find the user
    const user = await UserModel.findById(userId);

    const isMatched = await compare(currentPassword, user.password);

    //chck the current paswword of logged in role and req are same/not
    if (!isMatched) {
        return res.status(400).json({ message: "Current password is not matching" })
    }

    //hash the password
    const hashedPassword = await hash(newPassword, 12);

    //replace the password and save
    user.password = hashedPassword
    user.save();

    //send res
    res.status(200).json({ message: "Password updated" })
})
