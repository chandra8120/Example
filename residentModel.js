import { Schema, model } from "mongoose";

const residentSchema = new Schema({
  propertyType: { type: String, required: true },
  bhkType: { type: String, required: true },
  ownershipType: { type: String, required: true },
  builtUpArea: { type: String, required: true },
  propertyAge: { type: String, required: true },
  facing: { type: String, required: true },
  floorType: { type: String, required: true },
  floor: { type: String, required: true },
  totalFloor: { type: String, required: true },
  city: { type: String, required: true },
  locality: { type: String, required: true },
  landmark: { type: String, required: true },
  mapForSelectingAddress: { type: String, required: true },
  expectedPrice: { type: String, required: true },
  maintainceCostForMonthly: { type: String, required: true },
  avilableFrom: { type: String, required: true },
  kitchenType: { type: String, required: true },
  furnishing: { type: String, required: true },
  parking: { type: String, required: true },
  description: { type: String, required: true },
  bathrooms: { type: String, required: true },
  balcony: { type: String, required: true },
  waterSupply: { type: String, required: true },
  gym: { type: String, required: true },
  gatedSecurity: { type: String, required: true },
  powerBackup: { type: String, required: true },
  secondaryMobileNo: { type: String, required: true },
  amenities: { type: String, required: true },
  multipleImages: [{ type: String, required: true }],
  schedule: { type: Date, default: Date.now },
});

const Resident = model("Resident", residentSchema);
export default Resident;
