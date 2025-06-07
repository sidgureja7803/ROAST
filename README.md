# Resume Roaster 🔥

A fun web application that roasts your resume or project descriptions using Google's Gemini AI. Get feedback on your professional content with varying levels of humor and sarcasm.

## Features

- **Resume/Project Roasting**: Upload text or paste content to get AI-powered feedback
- **Multiple Roast Levels**: Choose from Mild, Spicy, or Extra Burn intensity
- **Download & Share**: Save your roasts as text files or copy to clipboard
- **Clean UI**: Modern, responsive interface built with React and TailwindCSS

## Tech Stack

### Frontend
- React.js
- TailwindCSS
- React Router
- Axios
- React Hot Toast

### Backend
- Node.js
- Express.js
- Google Generative AI (Gemini)
- Winston (logging)
- CORS, Express Validator

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Google Gemini API key

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/resume-roaster.git
cd resume-roaster
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Create a `.env` file in the backend directory
```
PORT=5000
GEMINI_API_KEY=your_gemini_api_key_here
```

4. Install frontend dependencies
```bash
cd ../frontend
npm install
```

5. Start the development servers

Backend:
```bash
cd backend
npm run dev
```

Frontend:
```bash
cd frontend
npm run dev
```

6. Open your browser and navigate to `http://localhost:5173`

## Usage

1. Paste your resume text or project description in the input field
2. Select your preferred roast level (Mild, Spicy, or Extra Burn)
3. Click "Roast It!" and wait for the AI to generate feedback
4. View, copy, or download your roast

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Google Gemini API for powering the roasts
- All the terrible resumes that inspired this project 