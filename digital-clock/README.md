# ⏰ Digital Clock with Multiple Timezones

A beautiful React application displaying current time across multiple timezones with real-time updates.

## Features

- 🕐 **Real-Time Updates** - Clock updates every second
- 🌍 **Multiple Timezones** - Display time in different timezones
- ➕ **Add/Remove Timezones** - Dynamically add or remove timezones
- 📱 **Responsive Design** - Works on all devices
- ✨ **Beautiful UI** - Glassmorphism design with gradient backgrounds
- 🖱️ **Interactive** - Click timezone cards to select primary display
- 📅 **Date Display** - Shows full date and day of week for each timezone
- ⏱️ **Local Time** - Always shows your local system time

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

## Available Timezones

- Los Angeles (America/Los_Angeles)
- New York (America/New_York)
- Chicago (America/Chicago)
- Denver (America/Denver)
- London (Europe/London)
- Paris (Europe/Paris)
- Dubai (Asia/Dubai)
- Delhi (Asia/Kolkata)
- Bangkok (Asia/Bangkok)
- Tokyo (Asia/Tokyo)
- Sydney (Australia/Sydney)
- Auckland (Pacific/Auckland)
- Singapore (Asia/Singapore)
- Hong Kong (Asia/Hong_Kong)
- Shanghai (Asia/Shanghai)

## Technologies Used

- React 18
- CSS3 (Glassmorphism)
- Intl API for timezone conversion

## Project Structure

```
digital-clock/
├── src/
│   ├── components/
│   │   └── DigitalClock.jsx
│   ├── styles/
│   │   └── DigitalClock.css
│   ├── App.jsx
│   ├── App.css
│   └── index.js
├── package.json
└── README.md
```

## How It Works

1. **State Management** - Uses React hooks to manage timezones and current time
2. **Real-Time Updates** - setInterval updates the time state every second
3. **Timezone Conversion** - Uses Intl.DateTimeFormat for accurate timezone conversion
4. **Dynamic Timezone Addition** - Add or remove timezones from the grid
5. **Responsive Grid** - Auto-fit grid layout that adapts to screen size

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## License

MIT
