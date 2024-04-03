// userController.js
import bcrypt from 'bcrypt';
import User from './loginModel.js'


const userController = {
    signup: async (req, res) => {
        try {
            const { email, password } = req.body;
            const existingUser = await User.findOne({ email });

            if (existingUser) {
                return res.status(200).json({ message: "User email already exists" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new User({ email, password: hashedPassword });
            await newUser.save();
            res.status(201).json({ message: "User signup successful" });
        } catch (error) {
            console.error('Error during signup:', error);
            res.status(500).json({ error: 'Failed to signup' });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({ error: "Invalid password" });
            }

            res.status(200).json({ message: "Login successful" });
        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).json({ error: 'Failed to login' });
        }
    },

   // generateOTP function with added logging
// generateOTP function to log OTP to console without sending an email

generateOTP: async (req, res) => {
    try {
        const { email } = req.body;
        const generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();

        // console.log('Generated OTP:', generatedOTP);

        // Save OTP to the database
        const user = await User.findOneAndUpdate({ email }, { otp: generatedOTP, otpCreatedAt: new Date() }, { new: true });

        if (!user) {
            console.error('User not found for email:', email);
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'OTP generated successfully', generatedOTP });
    } catch (error) {
        console.error('Error generating OTP:', error);
        res.status(500).json({ error: 'Failed to generate OTP' });
    }
},




    verifyOTP: async (req, res) => {
        try {
            const { email, otp } = req.body;

            // Check if the provided OTP is valid
            const user = await User.findOne({ email, otp, otpCreatedAt: { $gt: new Date(new Date() - 5 * 60000) } });

            if (user) {
                // OTP is valid
                res.status(200).json({ message: 'OTP verification successful' });
            } else {
                // OTP is invalid or expired
                res.status(401).json({ error: 'Invalid or expired OTP' });
            }
        } catch (error) {
            console.error('Error during OTP verification:', error);
            res.status(500).json({ error: 'Failed to verify OTP' });
        }
    },
    resetPassword: async (req, res) => {
        try {
          const { email, otp, newPassword } = req.body;
    
          // Check if the provided OTP is valid and not expired
          const user = await User.findOne({
            email,
            otp,
            otpCreatedAt: { $gt: new Date(new Date() - 5 * 60000) },
          });
    
          if (!user) {
            // OTP is invalid or expired
            return res.status(401).json({ error: 'Invalid or expired OTP' });
          }
    
          // Update the user's password with the new one
          const hashedPassword = await bcrypt.hash(newPassword, 10);
          user.password = hashedPassword;
          user.otp = null; // Clear the OTP after successful reset
          user.otpCreatedAt = null;
    
          await user.save();
    
          res.status(200).json({ message: 'Password reset successful' });
        } catch (error) {
          console.error('Error during password reset:', error);
          res.status(500).json({ error: 'Failed to reset password' });
        }
      },
        
};

export default userController;
