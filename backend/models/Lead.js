const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
  name: String,
  campaign: String,
  source: String,
  date: Date,
  leadScore: Number,
});

module.exports = mongoose.model('Lead', LeadSchema);
