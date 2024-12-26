require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

console.log(process.env.MONGODB_URI);

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// Define Schema and Model for Data
const dataSchema = new mongoose.Schema({
  field1: String,
  field2: String,
  field3: String
});

const Data = mongoose.model('Data', dataSchema);

// Routes

// GET route
app.get('/api/data', async (req, res) => {
  try {
    const data = await Data.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data', error });
  }
});

// POST route to create a new record
app.post('/api/data', async (req, res) => {
    const { field1, field2, field3 } = req.body;
    console.log('Received data:', req.body);

    try {
      const newData = new Data({ field1, field2, field3 });
      await newData.save();
      res.status(201).json(newData);
    } catch (error) {
      res.status(500).json({ message: 'Error creating new data', error });
    }
});

// PUT route
app.put('/api/data/:id', async (req, res) => {
  const { id } = req.params;
  const { field1, field2, field3 } = req.body;

  try {
    const updatedData = await Data.findByIdAndUpdate(id, { field1, field2, field3 }, { new: true });
    if (!updatedData) {
      return res.status(404).json({ message: 'Data not found' });
    }
    res.status(200).json(updatedData);
  } catch (error) {
    res.status(500).json({ message: 'Error updating data', error });
  }
});

// DELETE route
app.delete('/api/data/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedData = await Data.findByIdAndDelete(id);
    if (!deletedData) {
      return res.status(404).json({ message: 'Data not found' });
    }
    res.status(200).json({ message: 'Data deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting data', error });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
