import mongoose from 'mongoose';

const matchSchema = new mongoose.Schema({
  date: String,
  competition: String,
  homeTeam: String,
  awayTeam: String,
  score: String,
  location: String
});

const refereeSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    index: true
  },
  matches: [matchSchema],
  lastUpdated: { 
    type: Date, 
    default: Date.now 
  }
});

export const Referee = mongoose.model('Referee', refereeSchema);