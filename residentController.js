import Resident from "./residentModel.js";
import Sekhar from "./sekharModel.js";
import multer from "multer";

// Set up multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).array("multipleImages"); // Assuming the field name is "multipleImages"

const residentController = {
    createResident: async (req, res) => {
        try {
            upload(req, res, async (err) => {
                if (err) {
                    console.error("Error uploading files:", err);
                    return res.status(500).json({ error: "Internal Server error" });
                }

                // Destructure req.body and req.files
                const { 
                    propertyType, bhkType, ownershipType, builtUpArea, propertyAge,
                    facing, floorType, floor, totalFloor, city, locality, landmark,
                    mapForSelectingAddress, expectedPrice, maintainceCostForMonthly,
                    avilableFrom, kitchenType, furnishing, parking, description,
                    bathrooms, balcony, waterSupply, gym, gatedSecurity, powerBackup,
                    secondaryMobileNo, amenities
                } = req.body;
                const multipleImages = req.files.map(file => file.buffer.toString('base64'));

                // Create a new Resident instance with data
                const newResident = new Resident({
                    propertyType, bhkType, ownershipType, builtUpArea, propertyAge,
                    facing, floorType, floor, totalFloor, city, locality, landmark,
                    mapForSelectingAddress, expectedPrice, maintainceCostForMonthly,
                    avilableFrom, kitchenType, furnishing, parking, description,
                    bathrooms, balcony, waterSupply, gym, gatedSecurity, powerBackup,
                    secondaryMobileNo, amenities, multipleImages
                });

                // Save the Resident instanced
                const savedResident = await newResident.save();

                res.status(201).json({ message: "Successfully added the data", savedResident });
            });
        } catch (error) {
            console.error("Error creating Resident:", error);
            res.status(500).json({ error: "Internal Server error" });
        }
    },

    getAllSekhars: async (req, res) => {
        try {
            // Retrieve all Sekhar documents from the database
            const allSekhars = await Sekhar.find();

            // Return the list of Sekhars as a JSON response
            res.status(200).json(allSekhars);
        } catch (error) {
            console.error("Error getting all Sekhars:", error);
            res.status(500).json({ error: "Internal Server error" });
        }
    }
};

export default residentController;


