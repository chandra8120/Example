import express from 'express'
import formController from './Form.js'
import chandraController from './chandraController.js'
import sekharController from './sekharController.js'
import sridharController from './sridharController.js'
import practiseController from './practiseController.js'
import loginController from './loginController.js'
import userController from './loginController.js'
import residentController from './residentController.js'

const router=express.Router()

router.post("/postform",formController.createForm)
router.get("/get",formController.getForm) 
router.delete("/delete/:id",formController.deleteForm)

router.post("/postchandra",chandraController.createChandra)
router.get("/getchandra",chandraController.getAllChandra)
router.delete("/delete/:id",chandraController.deletChandra)

router.post("/postsekhar",sekharController.createSekhar)
router.get("/getsekhar",sekharController.geAllSekhar)
router.delete("/deletesekhar/:id",sekharController.deleteSekhar)

router.post("/postsridhar",sridharController.createSridhar)
router.get("/getsridhar",sridharController.getAllSridhar)

router.post("/postpractise",practiseController.createPractise)
router.get("/getpractise",practiseController.getPractise)
router.delete("/deletepractise/:id",practiseController.deletePractise)

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/generate-otp', userController.generateOTP);
router.post('/verify-otp', userController.verifyOTP);
router.post("/reset-password",userController.resetPassword)


router.post("/post",residentController.createResident)
router.get("/get",residentController.getAllSekhars)

export default router