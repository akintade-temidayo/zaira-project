const User = require('../../models/user.model')

const login = async (req, res) =>{
    try{
        const {email, password} = req.body
        const normalizedEmail = typeof email === 'string'
            ? email.trim().toLowerCase()
            : email

        if (!email || !password){
            return res.status(400).json({
                success: false,
                message: 'email and password are required'
            })
        }

        // find user by email
        const user = await User.findOne({ email: normalizedEmail })

        if (!user){
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            })
        }

        if (user.password !== password) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            })
        }
        
        // after finding user and confirming password
        if (!user.isVerified) {
            return res.status(403).json({
                success: false,
                message: 'Please verify your account before logging in'
            })
        }

        // successful login
        res.status(200).json({
            success: true,
            message :'Login successful',
            token: user._id,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                profilePicture: user.profilePicture
            }
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: 'Login failed',
            error: err.message
        })
    }
}
module.exports = login
