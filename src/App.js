import React, { useState } from 'react';
import './App.css';

function App() {
  // State for the inputs
  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [inputValue3, setInputValue3] = useState('');
  const [response, setResponse] = useState('');

  // Fetch data from backend (GET)
  const handleGet = async () => {
    const response = await fetch('http://localhost:5000/api/data');
    const data = await response.json();
    setResponse(JSON.stringify(data, null, 2));
  };

  // Add data to the backend (POST)
  const handlePost = async () => {
    const data = { field1: inputValue1, field2: inputValue2, field3: inputValue3 };    
    const response = await fetch('http://localhost:5000/api/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (response.ok) {
      setResponse(`Data added successfully: ${JSON.stringify(result, null, 2)}`);
    } else {
      setResponse(`Error: ${result.message}`);
    }
  };

  // Update data in backend (PUT)
  const handlePut = async () => {
    const data = { field1: inputValue1, field2: inputValue2, field3: inputValue3 };
    const response = await fetch('http://localhost:5000/api/data/your_record_id', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    setResponse(JSON.stringify(result, null, 2));
  };

  // Delete data from backend (DELETE)
  const handleDelete = async () => {
    const response = await fetch('http://localhost:5000/api/data/your_record_id', { method: 'DELETE' });
    const result = await response.json();
    setResponse(result.message);
  };

  return (
    <div className="App">
      <h1>React CRUD Example with MongoDB</h1>
      <div className="input-group">
        <input 
          type="text" 
          placeholder="Enter data 1" 
          value={inputValue1} 
          onChange={(e) => setInputValue1(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Enter data 2" 
          value={inputValue2} 
          onChange={(e) => setInputValue2(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Enter data 3" 
          value={inputValue3} 
          onChange={(e) => setInputValue3(e.target.value)} 
        />
      </div>
      <div className="button-group">
        <button onClick={handleGet}>Get</button>
        <button onClick={handlePost}>Post</button>
        <button onClick={handlePut}>Put</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
      <div className="response">
        <pre>{response}</pre>
      </div>
    </div>
  );
}

export default App;
