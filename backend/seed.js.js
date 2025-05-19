const mongoose = require("mongoose");
const Lead = require("./models/Lead");

mongoose.connect("mongodb://localhost:27017/leaddb");

const campaigns = ["Google Ads", "Facebook Ads", "Email Campaign", "LinkedIn"];
const sources = ["Google", "Facebook", "Email", "LinkedIn"];

const leads = Array.from({ length: 500 }).map((_, i) => ({
  name: `Lead ${i + 1}`,
  campaign: campaigns[i % campaigns.length],
  source: sources[i % sources.length],
  date: new Date(Date.now() - i * 86400000),
  leadScore: Math.floor(Math.random() * 100)
}));

Lead.insertMany(leads)
  .then(() => {
    console.log("Dummy leads added");
    mongoose.disconnect();
  })
  .catch((err) => console.error(err));
