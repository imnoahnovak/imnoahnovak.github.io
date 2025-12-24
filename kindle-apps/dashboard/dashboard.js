// Dashboard Application
class Dashboard {
    constructor() {
        this.currentPanel = 0;
        this.totalPanels = 5;
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.updateInterval = null;
        this.currentMonth = new Date();
        this.events = JSON.parse(localStorage.getItem('events') || '[]');
        this.tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        
        this.init();
    }

    init() {
        this.initSwipeNavigation();
        this.initKeyboardNavigation();
        this.initNavDots();
        this.initClock();
        this.initWeather();
        this.initCalendar();
        this.initTasks();
        this.initSettings();
        this.applyDarkMode();
        this.startAutoUpdate();
    }

    // Navigation
    initSwipeNavigation() {
        const wrapper = document.querySelector('.panels-wrapper');
        
        wrapper.addEventListener('touchstart', (e) => {
            this.touchStartX = e.changedTouches[0].screenX;
        });

        wrapper.addEventListener('touchend', (e) => {
            this.touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        });

        // Mouse drag for desktop
        let isDragging = false;
        wrapper.addEventListener('mousedown', (e) => {
            isDragging = true;
            this.touchStartX = e.screenX;
        });

        wrapper.addEventListener('mouseup', (e) => {
            if (isDragging) {
                this.touchEndX = e.screenX;
                this.handleSwipe();
                isDragging = false;
            }
        });
    }

    handleSwipe() {
        const diff = this.touchStartX - this.touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0 && this.currentPanel < this.totalPanels - 1) {
                this.navigateToPanel(this.currentPanel + 1);
            } else if (diff < 0 && this.currentPanel > 0) {
                this.navigateToPanel(this.currentPanel - 1);
            }
        }
    }

    initKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' && this.currentPanel < this.totalPanels - 1) {
                this.navigateToPanel(this.currentPanel + 1);
            } else if (e.key === 'ArrowLeft' && this.currentPanel > 0) {
                this.navigateToPanel(this.currentPanel - 1);
            }
        });
    }

    initNavDots() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const panel = parseInt(dot.dataset.panel);
                this.navigateToPanel(panel);
            });
        });
    }

    navigateToPanel(panelIndex) {
        this.currentPanel = panelIndex;
        const wrapper = document.querySelector('.panels-wrapper');
        wrapper.style.transform = `translateX(-${panelIndex * 100}vw)`;
        
        // Update active dot
        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === panelIndex);
        });
        
        // Update active panel
        document.querySelectorAll('.panel').forEach((panel, index) => {
            panel.classList.toggle('active', index === panelIndex);
        });
    }

    // Clock
    initClock() {
        this.updateClock();
        setInterval(() => this.updateClock(), 1000);

        const toggleBtn = document.getElementById('toggleClock');
        const digitalClock = document.getElementById('digitalClock');
        const analogClock = document.getElementById('analogClock');

        toggleBtn.addEventListener('click', () => {
            const isDigital = !digitalClock.classList.contains('hidden');
            if (isDigital) {
                digitalClock.classList.add('hidden');
                analogClock.classList.remove('hidden');
                toggleBtn.textContent = 'Switch to Digital';
                this.drawAnalogClock();
            } else {
                digitalClock.classList.remove('hidden');
                analogClock.classList.add('hidden');
                toggleBtn.textContent = 'Switch to Analog';
            }
        });
    }

    updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        
        document.getElementById('digitalClock').textContent = `${hours}:${minutes}:${seconds}`;
        
        // Update date
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        document.getElementById('dateDisplay').textContent = now.toLocaleDateString('en-US', options);

        // Update analog clock if visible
        const analogClock = document.getElementById('analogClock');
        if (!analogClock.classList.contains('hidden')) {
            this.drawAnalogClock();
        }
    }

    drawAnalogClock() {
        const canvas = document.getElementById('analogClock');
        const ctx = canvas.getContext('2d');
        const now = new Date();
        
        const width = canvas.width;
        const height = canvas.height;
        const radius = width / 2 - 20;
        
        ctx.clearRect(0, 0, width, height);
        ctx.save();
        ctx.translate(width / 2, height / 2);
        
        // Check if dark mode
        const isDark = document.documentElement.classList.contains('dark-mode');
        const color = isDark ? '#f2f2f2' : '#000000';
        
        // Draw clock circle
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // Draw hour markers
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        for (let i = 0; i < 12; i++) {
            const angle = (i * Math.PI) / 6;
            ctx.save();
            ctx.rotate(angle);
            ctx.beginPath();
            ctx.moveTo(0, -radius + 10);
            ctx.lineTo(0, -radius + 20);
            ctx.stroke();
            ctx.restore();
        }
        
        // Draw hands
        const hour = now.getHours() % 12;
        const minute = now.getMinutes();
        const second = now.getSeconds();
        
        // Hour hand
        const hourAngle = (Math.PI / 6) * hour + (Math.PI / 360) * minute;
        this.drawHand(ctx, hourAngle, radius * 0.5, 6, color);
        
        // Minute hand
        const minuteAngle = (Math.PI / 30) * minute + (Math.PI / 1800) * second;
        this.drawHand(ctx, minuteAngle, radius * 0.7, 4, color);
        
        // Second hand
        const secondAngle = (Math.PI / 30) * second;
        this.drawHand(ctx, secondAngle, radius * 0.9, 2, color);
        
        // Center dot
        ctx.beginPath();
        ctx.arc(0, 0, 5, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
        
        ctx.restore();
    }

    drawHand(ctx, angle, length, width, color) {
        ctx.save();
        ctx.rotate(angle - Math.PI / 2);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(length, 0);
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.stroke();
        ctx.restore();
    }

    // Weather
    initWeather() {
        const locationBtn = document.getElementById('locationBtn');
        const locationInput = document.getElementById('locationInput');
        
        locationBtn.addEventListener('click', () => {
            const location = locationInput.value.trim();
            if (location) {
                this.fetchWeather(location);
                localStorage.setItem('location', location);
            }
        });

        locationInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                locationBtn.click();
            }
        });

        // Load saved location
        const savedLocation = localStorage.getItem('location');
        if (savedLocation) {
            locationInput.value = savedLocation;
            this.fetchWeather(savedLocation);
        }
    }

    async fetchWeather(location) {
        // Using Open-Meteo API (no key required) with geocoding
        try {
            // First, geocode the location
            const geoResponse = await fetch(
                `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1&language=en&format=json`
            );
            const geoData = await geoResponse.json();
            
            if (!geoData.results || geoData.results.length === 0) {
                this.showWeatherError('Location not found');
                return;
            }
            
            const { latitude, longitude, name, country } = geoData.results[0];
            
            // Fetch weather data
            const weatherResponse = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,pressure_msl,visibility&timezone=auto`
            );
            const weatherData = await weatherResponse.json();
            
            this.displayWeather(weatherData, name, country);
        } catch (error) {
            console.error('Weather fetch error:', error);
            this.showWeatherError('Unable to fetch weather data');
        }
    }

    displayWeather(data, city, country) {
        const current = data.current;
        
        // Basic weather
        document.getElementById('weatherTemp').textContent = `${Math.round(current.temperature_2m)}°C`;
        document.getElementById('weatherLocation').textContent = `${city}, ${country}`;
        
        // Weather icon and condition based on WMO code
        const { icon, description } = this.getWeatherInfo(current.weather_code);
        document.getElementById('weatherIcon').textContent = icon;
        document.getElementById('weatherCondition').textContent = description;
        
        // Extended weather
        document.getElementById('feelsLike').textContent = `${Math.round(current.apparent_temperature)}°C`;
        document.getElementById('humidity').textContent = `${current.relative_humidity_2m}%`;
        document.getElementById('windSpeed').textContent = `${Math.round(current.wind_speed_10m)} km/h`;
        document.getElementById('pressure').textContent = `${Math.round(current.pressure_msl)} hPa`;
        document.getElementById('visibility').textContent = `${(current.visibility / 1000).toFixed(1)} km`;
        document.getElementById('description').textContent = description;
    }

    getWeatherInfo(code) {
        // WMO Weather interpretation codes
        const weatherCodes = {
            0: { icon: '☀️', description: 'Clear sky' },
            1: { icon: '🌤️', description: 'Mainly clear' },
            2: { icon: '⛅', description: 'Partly cloudy' },
            3: { icon: '☁️', description: 'Overcast' },
            45: { icon: '🌫️', description: 'Foggy' },
            48: { icon: '🌫️', description: 'Depositing rime fog' },
            51: { icon: '🌦️', description: 'Light drizzle' },
            53: { icon: '🌦️', description: 'Moderate drizzle' },
            55: { icon: '🌧️', description: 'Dense drizzle' },
            61: { icon: '🌧️', description: 'Slight rain' },
            63: { icon: '🌧️', description: 'Moderate rain' },
            65: { icon: '🌧️', description: 'Heavy rain' },
            71: { icon: '🌨️', description: 'Slight snow' },
            73: { icon: '🌨️', description: 'Moderate snow' },
            75: { icon: '🌨️', description: 'Heavy snow' },
            77: { icon: '🌨️', description: 'Snow grains' },
            80: { icon: '🌦️', description: 'Slight rain showers' },
            81: { icon: '🌧️', description: 'Moderate rain showers' },
            82: { icon: '🌧️', description: 'Violent rain showers' },
            85: { icon: '🌨️', description: 'Slight snow showers' },
            86: { icon: '🌨️', description: 'Heavy snow showers' },
            95: { icon: '⛈️', description: 'Thunderstorm' },
            96: { icon: '⛈️', description: 'Thunderstorm with slight hail' },
            99: { icon: '⛈️', description: 'Thunderstorm with heavy hail' }
        };
        
        return weatherCodes[code] || { icon: '❓', description: 'Unknown' };
    }

    showWeatherError(message) {
        document.getElementById('weatherCondition').textContent = message;
        document.getElementById('weatherTemp').textContent = '--°';
    }

    // Calendar
    initCalendar() {
        this.renderCalendar();
        
        document.getElementById('prevMonth').addEventListener('click', () => {
            this.currentMonth.setMonth(this.currentMonth.getMonth() - 1);
            this.renderCalendar();
        });
        
        document.getElementById('nextMonth').addEventListener('click', () => {
            this.currentMonth.setMonth(this.currentMonth.getMonth() + 1);
            this.renderCalendar();
        });
        
        document.getElementById('addEvent').addEventListener('click', () => {
            this.addEvent();
        });
        
        this.renderEvents();
    }

    renderCalendar() {
        const year = this.currentMonth.getFullYear();
        const month = this.currentMonth.getMonth();
        
        document.getElementById('currentMonth').textContent = 
            this.currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const prevLastDay = new Date(year, month, 0);
        
        const firstDayOfWeek = firstDay.getDay();
        const daysInMonth = lastDay.getDate();
        const daysInPrevMonth = prevLastDay.getDate();
        
        const calendarGrid = document.getElementById('calendarGrid');
        calendarGrid.innerHTML = '';
        
        // Day headers
        const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        dayHeaders.forEach(day => {
            const header = document.createElement('div');
            header.className = 'calendar-header';
            header.textContent = day;
            calendarGrid.appendChild(header);
        });
        
        // Previous month days
        for (let i = firstDayOfWeek - 1; i >= 0; i--) {
            const day = document.createElement('div');
            day.className = 'calendar-day other-month';
            day.textContent = daysInPrevMonth - i;
            calendarGrid.appendChild(day);
        }
        
        // Current month days
        const today = new Date();
        for (let i = 1; i <= daysInMonth; i++) {
            const day = document.createElement('div');
            day.className = 'calendar-day';
            day.textContent = i;
            
            const currentDate = new Date(year, month, i);
            const dateStr = currentDate.toISOString().split('T')[0];
            
            if (today.toDateString() === currentDate.toDateString()) {
                day.classList.add('today');
            }
            
            if (this.events.some(e => e.date === dateStr)) {
                day.classList.add('has-event');
            }
            
            calendarGrid.appendChild(day);
        }
        
        // Next month days
        const remainingDays = 42 - calendarGrid.children.length;
        for (let i = 1; i <= remainingDays; i++) {
            const day = document.createElement('div');
            day.className = 'calendar-day other-month';
            day.textContent = i;
            calendarGrid.appendChild(day);
        }
    }

    addEvent() {
        const dateInput = document.getElementById('eventDate');
        const titleInput = document.getElementById('eventTitle');
        
        if (dateInput.value && titleInput.value.trim()) {
            const event = {
                id: Date.now(),
                date: dateInput.value,
                title: titleInput.value.trim()
            };
            
            this.events.push(event);
            localStorage.setItem('events', JSON.stringify(this.events));
            
            dateInput.value = '';
            titleInput.value = '';
            
            this.renderCalendar();
            this.renderEvents();
        }
    }

    renderEvents() {
        const eventsList = document.getElementById('eventsList');
        eventsList.innerHTML = '';
        
        const sortedEvents = [...this.events].sort((a, b) => 
            new Date(a.date) - new Date(b.date)
        );
        
        sortedEvents.forEach(event => {
            const eventItem = document.createElement('div');
            eventItem.className = 'event-item';
            
            const eventDate = new Date(event.date + 'T00:00:00');
            const formattedDate = eventDate.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
            });
            
            eventItem.innerHTML = `
                <div>
                    <strong>${event.title}</strong><br>
                    <small>${formattedDate}</small>
                </div>
                <button onclick="dashboard.deleteEvent(${event.id})">Delete</button>
            `;
            
            eventsList.appendChild(eventItem);
        });
    }

    deleteEvent(id) {
        this.events = this.events.filter(e => e.id !== id);
        localStorage.setItem('events', JSON.stringify(this.events));
        this.renderCalendar();
        this.renderEvents();
    }

    // Tasks
    initTasks() {
        document.getElementById('addTask').addEventListener('click', () => {
            this.addTask();
        });
        
        document.getElementById('taskInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTask();
            }
        });
        
        this.renderTasks();
    }

    addTask() {
        const input = document.getElementById('taskInput');
        const text = input.value.trim();
        
        if (text) {
            const task = {
                id: Date.now(),
                text: text,
                completed: false
            };
            
            this.tasks.push(task);
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
            
            input.value = '';
            this.renderTasks();
        }
    }

    renderTasks() {
        const tasksList = document.getElementById('tasksList');
        tasksList.innerHTML = '';
        
        this.tasks.forEach(task => {
            const taskItem = document.createElement('div');
            taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
            
            taskItem.innerHTML = `
                <input type="checkbox" ${task.completed ? 'checked' : ''} 
                       onchange="dashboard.toggleTask(${task.id})">
                <span class="task-text">${task.text}</span>
                <button onclick="dashboard.deleteTask(${task.id})">Delete</button>
            `;
            
            tasksList.appendChild(taskItem);
        });
    }

    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
            this.renderTasks();
        }
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(t => t.id !== id);
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
        this.renderTasks();
    }

    // Settings
    initSettings() {
        // Load saved settings
        const savedInterval = localStorage.getItem('updateInterval') || '30';
        document.getElementById('updateInterval').value = savedInterval;
        
        const autoDarkMode = localStorage.getItem('autoDarkMode') !== 'false';
        document.getElementById('autoDarkMode').checked = autoDarkMode;
        
        const manualDarkMode = localStorage.getItem('manualDarkMode') === 'true';
        document.getElementById('manualDarkMode').checked = manualDarkMode;
        
        // Update interval
        document.getElementById('updateInterval').addEventListener('change', (e) => {
            localStorage.setItem('updateInterval', e.target.value);
            this.startAutoUpdate();
        });
        
        // Auto dark mode
        document.getElementById('autoDarkMode').addEventListener('change', (e) => {
            localStorage.setItem('autoDarkMode', e.target.checked);
            this.applyDarkMode();
        });
        
        // Manual dark mode
        document.getElementById('manualDarkMode').addEventListener('change', (e) => {
            localStorage.setItem('manualDarkMode', e.target.checked);
            this.applyDarkMode();
        });
        
        // Clear data
        document.getElementById('clearData').addEventListener('click', () => {
            if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
                localStorage.clear();
                this.events = [];
                this.tasks = [];
                this.renderCalendar();
                this.renderEvents();
                this.renderTasks();
                alert('All data cleared!');
            }
        });
    }

    applyDarkMode() {
        const autoDarkMode = document.getElementById('autoDarkMode').checked;
        const manualDarkMode = document.getElementById('manualDarkMode').checked;
        
        let shouldBeDark = manualDarkMode;
        
        if (autoDarkMode && !manualDarkMode) {
            const hour = new Date().getHours();
            shouldBeDark = hour >= 18 || hour < 6;
        }
        
        document.documentElement.classList.toggle('dark-mode', shouldBeDark);
    }

    startAutoUpdate() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
        
        const minutes = parseInt(document.getElementById('updateInterval').value);
        const milliseconds = minutes * 60 * 1000;
        
        this.updateInterval = setInterval(() => {
            const location = localStorage.getItem('location');
            if (location) {
                this.fetchWeather(location);
            }
            this.applyDarkMode();
        }, milliseconds);
    }
}

// Initialize dashboard
const dashboard = new Dashboard();
