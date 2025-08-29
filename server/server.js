require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
app.use(morgan('combined'));
app.use(express.json());

const USER_INFO = {
  fullName: process.env.USER_FULL_NAME || "john_doe",
  email: process.env.USER_EMAIL || "john@xyz.com",
  rollNumber: process.env.USER_ROLL_NUMBER || "ABCD123",
  dateOfBirth: process.env.USER_DATE_OF_BIRTH || "17091999"
};

const isNumber = (str) => {
  return !isNaN(str) && !isNaN(parseFloat(str));
};

const isAlphabet = (str) => {
  return /^[a-zA-Z]$/.test(str);
};

const isSpecialChar = (str) => {
  return /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]$/.test(str);
};

const createConcatString = (alphabets) => {
  if (alphabets.length === 0) return "";
  
  const reversed = alphabets.reverse();
  let result = "";
  let isUpperCase = true;
  
  for (let i = 0; i < reversed.length; i++) {
    const char = reversed[i];
    if (isUpperCase) {
      result += char.toUpperCase();
    } else {
      result += char.toLowerCase();
    }
    isUpperCase = !isUpperCase;
  }
  
  return result;
};

app.post('/bfhl', (req, res) => {
  try {
    const { data } = req.body;
    
    if (!data || !Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        error: "Invalid input: 'data' must be an array"
      });
    }
    
    const numbers = [];
    const alphabets = [];
    const specialChars = [];
    
    data.forEach(item => {
      if (isNumber(item)) {
        numbers.push(item);
      } else if (isAlphabet(item)) {
        alphabets.push(item.toUpperCase());
      } else if (isSpecialChar(item)) {
        specialChars.push(item);
      }
    });
    
    const evenNumbers = numbers.filter(num => parseInt(num) % 2 === 0);
    const oddNumbers = numbers.filter(num => parseInt(num) % 2 === 1);
    
    const sum = numbers.reduce((acc, num) => acc + parseInt(num), 0).toString();
    
    const concatString = createConcatString([...alphabets]);
    
    const userId = `${USER_INFO.fullName}_${USER_INFO.dateOfBirth}`.toLowerCase();
    
    const response = {
      is_success: true,
      user_id: userId,
      email: USER_INFO.email,
      roll_number: USER_INFO.rollNumber,
      even_numbers: evenNumbers,
      odd_numbers: oddNumbers,
      alphabets: alphabets,
      special_characters: specialChars,
      sum: sum,
      concat_string: concatString
    };
    
    res.status(200).json(response);
    
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({
      is_success: false,
      error: "Internal server error"
    });
  }
});

app.get('/', (req, res) => {
  res.json({
    message: "BFHL API is running!",
    endpoints: {
      "POST /bfhl": "Process data array and return categorized results"
    },
    example: {
      input: { "data": ["2","a","y","4","&","-","*","5","92","b"] },
      output: {
        "is_success": true,
        "user_id": "john_doe_17091999",
        "email": "john@xyz.com",
        "roll_number": "ABCD123",
        "odd_numbers": ["5"],
        "even_numbers": ["2","4","92"],
        "alphabets": ["A","Y","B"],
        "special_characters": ["&","-","*"],
        "sum": "103",
        "concat_string": "ByA"
      }
    }
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    is_success: false,
    error: "Something went wrong!"
  });
});

app.use('*', (req, res) => {
  res.status(404).json({
    is_success: false,
    error: "Endpoint not found"
  });
});

app.listen(PORT, () => {
  console.log(`BFHL API server running on port ${PORT}`);
  console.log(`Update .env file with your details`);
  console.log(`API Documentation: http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
