# Dashboard Application

A lightweight, responsive dashboard application with multiple panels for time, weather, calendar, tasks, and settings.

## Features

### 🕒 Clock
- Digital and analog clock formats
- Real-time updates every second
- Toggle between formats with a button

### 🌤️ Weather
- Location-based weather using Open-Meteo API
- Current temperature and conditions
- Extended weather details (humidity, wind, pressure, visibility)
- Weather icons based on conditions

### 📅 Calendar
- Full month calendar view
- Navigate between months
- Add and manage events
- Today's date highlighted
- Events marked on calendar dates

### ✅ Tasks
- Add new tasks
- Mark tasks as complete
- Delete tasks
- Persistent storage

### ⚙️ Settings
- Auto-update interval (15-60 minutes)
- Automatic dark mode (6 PM - 6 AM)
- Manual dark mode toggle
- Clear all data option

## Navigation

- **Swipe**: Touch or mouse drag left/right
- **Keyboard**: Use arrow keys (← →)
- **Dots**: Click navigation dots at the top

## Panels

1. **Main**: Clock + Date + Weather
2. **Extended Weather**: Detailed weather information
3. **Calendar**: Full calendar with events
4. **Tasks**: Task management
5. **Settings**: Configuration options

## Design

- Inspired by kindle-apps style
- Clean, minimalist interface
- Dark mode support
- Responsive layout
- Smooth panel transitions

## Usage

Simply open `index.html` in a modern web browser. No build process or dependencies required.

### Adding Weather
1. Enter a city name in the input field
2. Click "Update" or press Enter
3. Weather data will be fetched and displayed

### Adding Tasks
1. Navigate to the Tasks panel (panel 4)
2. Enter task description
3. Click "Add Task" or press Enter

### Adding Events
1. Navigate to the Calendar panel (panel 3)
2. Select a date
3. Enter event title
4. Click "Add Event"

## Data Storage

All data is stored locally in your browser using LocalStorage:
- Tasks
- Events
- Settings preferences
- Selected location

## Browser Support

Works in all modern browsers that support:
- ES6+ JavaScript
- CSS custom properties
- LocalStorage API
- Canvas API (for analog clock)

## License

Open source - feel free to use and modify.
