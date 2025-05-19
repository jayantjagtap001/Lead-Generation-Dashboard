const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const leadRoutes = require("./routes/leads.js");
const dotenv=require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/",async(req,res)=>{
    try {
        res.status(200).json("Lead Generation Analytics Backend");

    } catch (error) {
        res.status(404).json({error});
    }
})


mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err));



app.use("/leads", leadRoutes);

app.listen(process.env.PORT, () => console.log(`Server running on port 5000`));

