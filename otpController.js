// otpController.js
import OTP from './otpModel.js';
import nodemailer from 'nodemailer';

const otpController = {
    generateOTP: async (req, res) => {
        try {
            const { email } = req.body;
            const generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();

            // Save OTP to the database
            const otpDocument = new OTP({
                email,
                otp: generatedOTP,
            });
            await otpDocument.save();

            // Send OTP via email
            const transporter = nodemailer.createTransport({
                // configure your email transport here
            });

            const mailOptions = {
                from: 'chandrasekhar8120@gmail.com',
                to: email,
                subject: 'Your OTP for Verification',
                text: `Your OTP is: ${generatedOTP}`,
            };

            console.log('Generated OTP:', generatedOTP);
            console.log('Email:', email);

            await transporter.sendMail(mailOptions);

            console.log('Email sent successfully.');

            res.status(200).json({ message: 'OTP generated and sent successfully' });
        } catch (error) {
            console.error('Error generating OTP:', error);
            res.status(500).json({ error: 'Failed to generate OTP' });
        }
    },

    verifyOTP: async (req, res) => {
        try {
            const { email, otp } = req.body;

            // Check if the provided OTP is valid
            const existingOTP = await OTP.findOne({ email, otp });

            if (existingOTP) {
                // OTP is valid
                res.status(200).json({ message: 'OTP verification successful' });
            } else {
                // OTP is invalid
                res.status(401).json({ error: 'Invalid OTP' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to verify OTP' });
        }
    },
};

export default otpController;
