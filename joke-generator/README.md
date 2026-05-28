# 😂 Joke Generator

A fun React application that fetches random jokes from multiple external APIs.

## Features

- 🎲 **Multiple Joke Sources**
  - General jokes (via API Ninjas)
  - Programming jokes (via Official Joke API)
  - Dad jokes (via icanhazdadjoke)

- 📋 **Copy to Clipboard** - Easily copy jokes to share
- 📱 **Share on Social Media** - Share jokes on Twitter and Facebook
- 📜 **Joke History** - Keep track of last 5 jokes
- ✨ **Beautiful UI** - Gradient design with smooth animations
- 📱 **Responsive** - Works on all devices

## Setup

1. Install dependencies:
```bash
npm install
```

2. Get API Keys:
   - API Ninjas: https://api-ninjas.com/
   - Update `YOUR_API_NINJAS_KEY` in `src/components/JokeGenerator.jsx`

3. Start development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

## API Endpoints Used

1. **General Jokes**
   - URL: `https://api.api-ninjas.com/v1/jokes`
   - Requires API key

2. **Programming Jokes**
   - URL: `https://official-joke-api.appspot.com/random_joke`
   - Free, no authentication needed

3. **Dad Jokes**
   - URL: `https://icanhazdadjoke.com/slack`
   - Free, no authentication needed

## Technologies Used

- React 18
- Axios
- CSS3

## Project Structure

```
joke-generator/
├── src/
│   ├── components/
│   │   └── JokeGenerator.jsx
│   ├── styles/
│   │   └── JokeGenerator.css
│   ├── App.jsx
│   ├── App.css
│   └── index.js
├── package.json
└── README.md
```

## License

MIT
