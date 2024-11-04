import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { scrapeFFBBData } from './scraper.js';
import { Referee } from './models/referee.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/ffbb-referees')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// API Routes
app.get('/api/referees', async (req, res) => {
  try {
    const { search } = req.query;
    const query = search 
      ? { name: { $regex: search, $options: 'i' } }
      : {};
    
    const referees = await Referee.find(query);
    res.json(referees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Manual trigger for scraping (protected in production)
app.post('/api/scrape', async (req, res) => {
  try {
    const data = await scrapeFFBBData();
    res.json({ message: 'Scraping completed', count: data.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});