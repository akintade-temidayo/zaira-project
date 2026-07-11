const User = require('../../models/user.model')

const verifyOtp = async (req, res) =>{
    try{
        const { email, otpCode } = req.body
        const normalizedEmail = typeof email === 'string'
            ? email.trim().toLowerCase()
            : email

        if(!email || !otpCode){
            return res.status(400).json({
                success: false,
                message: 'email & OTP code required'
            })
        }

        const user = await User.findOne({ email: normalizedEmail })

        if(!user){
            return res.status(404).json({
                success: false,
                message: "user not found"
            })
        }

        if(user.otpCode !== otpCode){
            return res.status(400).json({
                success: false,
                message:'Invalid OTP code'
            })
        }

        // clear OTP after verification soo it cant be used again
        user.otpCode = null
        user.isVerified = true
        await user.save()

        res.status(200).json({
            success: true,
            message: 'OTP verified successfully',
            token: user._id
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: 'Verification failed',
            error: err.message
        })
    }
}
module.exports = verifyOtp
