import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || ''
});

function App() {
  const [inputData, setInputData] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const exampleData = [
    ["2", "a", "y", "4", "&", "-", "*", "5", "92", "b"],
    ["a", "1", "334", "4", "R", "$"],
    ["10", "x", "y", "z", "15", "!", "@", "#", "25", "A", "B", "C"]
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      let dataArray;
      try {
        dataArray = JSON.parse(inputData);
      } catch (parseError) {
        dataArray = inputData.split(',').map(item => item.trim().replace(/['"]/g, ''));
      }

      const response = await api.post('/bfhl', {
        data: dataArray
      });

      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const loadExample = (example) => {
    setInputData(JSON.stringify(example));
  };

  const clearData = () => {
    setInputData('');
    setResult(null);
    setError(null);
  };

  return (
    <div className="App">
      <div className="container">
        <div className="header">
          <h1>BFHL API Frontend</h1>
          <p>Test and interact with the BFHL REST API</p>
        </div>

        <div className="card">
          <h2>Input Data</h2>
          <p className="description">
            Enter your data array in JSON format or as comma-separated values
          </p>
          
          <div className="examples">
            <strong>Quick Examples:</strong>
            {exampleData.map((example, index) => (
              <button
                key={index}
                className="example-btn"
                onClick={() => loadExample(example)}
              >
                Example {index + 1}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="dataInput">Data Array:</label>
              <textarea
                id="dataInput"
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
                placeholder='["2", "a", "y", "4", "&", "-", "*", "5", "92", "b"]'
                rows="4"
                required
              />
            </div>

            <div className="button-group">
              <button type="submit" className="btn primary" disabled={loading || !inputData.trim()}>
                {loading ? 'Processing...' : 'Submit Request'}
              </button>
              <button type="button" className="btn secondary" onClick={clearData}>
                Clear
              </button>
            </div>
          </form>
        </div>

        {error && (
          <div className="card">
            <div className="error">
              <strong>Error:</strong> {error}
            </div>
          </div>
        )}

        {loading && (
          <div className="card">
            <div className="loading">
              <div>Processing your request...</div>
            </div>
          </div>
        )}

        {result && (
          <div className="card">
            <h2>API Response</h2>
            <div className="success">
              <strong>Request successful!</strong> Status: {result.is_success ? 'Success' : 'Failed'}
            </div>

            <div className="result-section">
              <div className="result-grid">
                <div className="result-item">
                  <h4>User ID</h4>
                  <p>{result.user_id}</p>
                </div>
                <div className="result-item">
                  <h4>Email</h4>
                  <p>{result.email}</p>
                </div>
                <div className="result-item">
                  <h4>Roll Number</h4>
                  <p>{result.roll_number}</p>
                </div>
                <div className="result-item">
                  <h4>Success Status</h4>
                  <p>{result.is_success ? 'True' : 'False'}</p>
                </div>
                <div className="result-item">
                  <h4>Even Numbers</h4>
                  <p>{result.even_numbers?.length > 0 ? result.even_numbers.join(', ') : 'None'}</p>
                </div>
                <div className="result-item">
                  <h4>Odd Numbers</h4>
                  <p>{result.odd_numbers?.length > 0 ? result.odd_numbers.join(', ') : 'None'}</p>
                </div>
                <div className="result-item">
                  <h4>Alphabets</h4>
                  <p>{result.alphabets?.length > 0 ? result.alphabets.join(', ') : 'None'}</p>
                </div>
                <div className="result-item">
                  <h4>Special Characters</h4>
                  <p>{result.special_characters?.length > 0 ? result.special_characters.join(', ') : 'None'}</p>
                </div>
                <div className="result-item">
                  <h4>Sum of Numbers</h4>
                  <p>{result.sum || '0'}</p>
                </div>
                <div className="result-item">
                  <h4>Concatenated String</h4>
                  <p>{result.concat_string || 'Empty'}</p>
                </div>
              </div>

              <div className="json-section">
                <h3>Raw JSON Response</h3>
                <div className="json-display">
                  {JSON.stringify(result, null, 2)}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="card">
          <h2>API Documentation</h2>
          <div className="result-grid">
            <div className="result-item">
              <h4>Endpoint</h4>
              <p>POST /bfhl</p>
            </div>
            <div className="result-item">
              <h4>Status Code</h4>
              <p>200 (Success)</p>
            </div>
            <div className="result-item">
              <h4>Content Type</h4>
              <p>application/json</p>
            </div>
            <div className="result-item">
              <h4>Input Format</h4>
              <p>{"{ \"data\": [\"a\", \"1\", \"334\", \"4\", \"R\", \"$\"] }"}</p>
            </div>
          </div>
          
          <div className="features">
            <h3>Features</h3>
            <ul>
              <li>Categorizes input into numbers, alphabets, and special characters</li>
              <li>Separates even and odd numbers</li>
              <li>Converts alphabets to uppercase</li>
              <li>Calculates sum of all numbers</li>
              <li>Creates concatenated string with alternating caps in reverse order</li>
              <li>Returns user information (ID, email, roll number)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
