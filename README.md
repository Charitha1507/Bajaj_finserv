# BFHL REST API Project

A complete REST API implementation with Node.js backend and React frontend for the BFHL assignment.

## Project Overview

This project implements a REST API that processes an array of data and categorizes it into different types (numbers, alphabets, special characters) with specific business logic requirements.

### API Specifications

- **Method**: POST
- **Route**: `/bfhl`
- **Status Code**: 200
- **Input Format**: `{ "data": ["a", "1", "334", "4", "R", "$"] }`

### Output Format

```json
{
  "is_success": true,
  "user_id": "john_doe_17091999",
  "email": "john@xyz.com",
  "roll_number": "ABCD123",
  "even_numbers": ["4"],
  "odd_numbers": ["1", "334"],
  "alphabets": ["A", "R"],
  "special_characters": ["$"],
  "sum": "339",
  "concat_string": "Ra"
}
```

## Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: React.js
- **Dependencies**: See package.json files

## Project Structure

```
bfhl-api/
├── server/                 # Backend server
│   ├── server.js          # Main API server
│   ├── package.json       # Backend dependencies
│   ├── env.example        # Environment variables template
│   ├── .env               # Environment variables (create from env.example)
│   └── test-api.js        # API testing script
├── client/                # React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js         # Main React component
│   │   ├── App.css        # Component styles
│   │   ├── index.js       # React entry point
│   │   └── index.css      # Global styles
│   └── package.json       # Frontend dependencies
└── README.md              # Project documentation
```

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd bfhl-api
   ```

2. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../client
   npm install
   cd ..
   ```

4. **Set up environment variables**
   ```bash
   cd server
   cp env.example .env
   ```
   
   Update the `.env` file with your information:
   ```env
   USER_FULL_NAME=your_full_name
   USER_EMAIL=your@email.com
   USER_ROLL_NUMBER=YOUR123
   USER_DATE_OF_BIRTH=DDMMYYYY
   ```

5. **Start the backend server**
   ```bash
   cd server
   npm start
   # or for development with auto-reload
   npm run dev
   ```

6. **Start the frontend (in a new terminal)**
   ```bash
   cd client
   npm start
   ```

7. **Access the application**
   - Backend API: http://localhost:3001
   - Frontend: http://localhost:3000

## API Endpoints

### POST /bfhl
Processes an array of data and returns categorized results.

**Request:**
```json
{
  "data": ["2", "a", "y", "4", "&", "-", "*", "5", "92", "b"]
}
```

**Response:**
```json
{
  "is_success": true,
  "user_id": "john_doe_17091999",
  "email": "john@xyz.com",
  "roll_number": "ABCD123",
  "odd_numbers": ["5"],
  "even_numbers": ["2", "4", "92"],
  "alphabets": ["A", "Y", "B"],
  "special_characters": ["&", "-", "*"],
  "sum": "103",
  "concat_string": "ByA"
}
```

### GET /
Returns API documentation and example usage.

### GET /health
Health check endpoint.

## Features

- **Data Categorization**: Automatically categorizes input into numbers, alphabets, and special characters
- **Number Processing**: Separates even and odd numbers, calculates sum
- **String Manipulation**: Converts alphabets to uppercase, creates concatenated string with alternating caps
- **Error Handling**: Graceful error handling with proper HTTP status codes
- **Input Validation**: Validates input format and provides helpful error messages
- **Modern UI**: Clean React frontend with real-time API testing
- **Responsive Design**: Works on desktop and mobile devices

## Environment Variables

The application uses environment variables for configuration. Copy `env.example` to `.env` and update the values:

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# API Configuration
API_VERSION=v1
CORS_ORIGIN=http://localhost:3000

# User Information (Update these with your details)
USER_FULL_NAME=your_full_name
USER_EMAIL=your@email.com
USER_ROLL_NUMBER=YOUR123
USER_DATE_OF_BIRTH=DDMMYYYY
```

### Environment Variables Explained

- **PORT**: Server port (default: 3001)
- **NODE_ENV**: Environment mode (development/production)
- **CORS_ORIGIN**: Allowed origin for CORS (default: http://localhost:3000)
- **USER_***: Your personal information for the API response

## Testing

### Manual Testing
1. Use the React frontend to test the API
2. Try different input combinations
3. Test error scenarios

### API Testing with curl
```bash
curl -X POST http://localhost:3001/bfhl \
  -H "Content-Type: application/json" \
  -d '{"data": ["2", "a", "y", "4", "&", "-", "*", "5", "92", "b"]}'
```

### Example Test Cases

1. **Basic Test**
   ```json
   {"data": ["a", "1", "334", "4", "R", "$"]}
   ```

2. **Mixed Data Test**
   ```json
   {"data": ["10", "x", "y", "z", "15", "!", "@", "#", "25", "A", "B", "C"]}
   ```

3. **Empty Array Test**
   ```json
   {"data": []}
   ```

## Customization

### Updating User Information
Edit the `.env` file with your details:
```env
USER_FULL_NAME=your_name_here
USER_EMAIL=your.email@domain.com
USER_ROLL_NUMBER=YOUR_ROLL_NUMBER
USER_DATE_OF_BIRTH=DDMMYYYY
```

### Adding New Features
- Modify the processing logic in `server/server.js`
- Update the React frontend to display new fields
- Add new API endpoints as needed

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

If you encounter any issues:
1. Check the console for error messages
2. Verify your Node.js version (v14+)
3. Ensure all dependencies are installed
4. Check the API documentation at `/` endpoint

## Project Status

**Complete Features:**
- REST API implementation
- Data categorization logic
- Error handling
- React frontend
- Environment variables configuration
- Documentation

**Future Enhancements:**
- Unit tests
- API rate limiting
- Database integration
- User authentication
- More advanced data processing

---

**Happy Coding!**
