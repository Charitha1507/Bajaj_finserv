const axios = require('axios');

const API_BASE_URL = 'http://localhost:3001';

const testCases = [
  {
    name: "Example from specification",
    data: ["2", "a", "y", "4", "&", "-", "*", "5", "92", "b"]
  },
  {
    name: "Basic test case",
    data: ["a", "1", "334", "4", "R", "$"]
  },
  {
    name: "Mixed data test",
    data: ["10", "x", "y", "z", "15", "!", "@", "#", "25", "A", "B", "C"]
  },
  {
    name: "Empty array test",
    data: []
  },
  {
    name: "Numbers only test",
    data: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
  },
  {
    name: "Alphabets only test",
    data: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]
  }
];

async function testAPI() {
  console.log('Starting API Tests...\n');
  
  for (const testCase of testCases) {
    try {
      console.log(`Testing: ${testCase.name}`);
      console.log(`Input: ${JSON.stringify(testCase.data)}`);
      
      const response = await axios.post(`${API_BASE_URL}/bfhl`, {
        data: testCase.data
      });
      
      console.log('Response:');
      console.log(JSON.stringify(response.data, null, 2));
      console.log('\n' + '='.repeat(50) + '\n');
      
    } catch (error) {
      console.log('Error:');
      console.log(error.response?.data || error.message);
      console.log('\n' + '='.repeat(50) + '\n');
    }
  }
  
  try {
    console.log('Testing health endpoint...');
    const healthResponse = await axios.get(`${API_BASE_URL}/health`);
    console.log('Health check response:', healthResponse.data);
  } catch (error) {
    console.log('Health check failed:', error.message);
  }
  
  try {
    console.log('\nTesting documentation endpoint...');
    const docResponse = await axios.get(`${API_BASE_URL}/`);
    console.log('Documentation endpoint working');
  } catch (error) {
    console.log('Documentation endpoint failed:', error.message);
  }
}

if (require.main === module) {
  testAPI().catch(console.error);
}

module.exports = { testAPI };
