import Sekhar from "./sekharModel.js";


const sekharController={
  createSekhar: async (req, res) => {
    try {
      const { name, price, comment } = req.body;
      if(!name || !price || !comment){
        res.status(301).json({message:"name and price and comment required fields"})
      }
      const newSekhar = new Sekhar({ name, price, comment });
      const sek = await newSekhar.save();
      res.status(201).json({message:"successfully sekhar data added",sekhar:sek})
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
    

  geAllSekhar: async (req, res) => {
    try {
      const sekhar = await Sekhar.find();
      res.status(200).json(sekhar);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to get all data" });
    }
  },

  deleteSekhar:async(req,res)=>{
    await Sekhar.findByIdAndDelete(req.params)
    res.status(400).json({message:"Delete sekhar successfully"})
  }
  
}
export default sekharController  