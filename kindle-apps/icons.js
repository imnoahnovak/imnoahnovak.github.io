// Icon pack for Kindle Dashboard
// Uses Google Material Symbols so icons stay consistent and readable

const Icons = {
    // Weather icons
    weather: {
        clear: 'sunny',
        cloudy: 'cloud',
        partlyCloudy: 'partly_cloudy_day',
        rain: 'rainy',
        snow: 'weather_snowy',
        thunderstorm: 'thunderstorm',
        fog: 'foggy',
        wind: 'air'
    },
    
    // UI icons
    ui: {
        home: 'home',
        settings: 'settings',
        menu: 'menu',
        close: 'close',
        check: 'check_circle',
        save: 'save',
        back: 'arrow_back',
        notes: 'note_alt',
        tasks: 'done_all',
        timer: 'timer',
        calculator: 'calculate',
        weather: 'sunny_snowing',
        calendar: 'calendar_month',
        rss: 'rss_feed',
        breathing: 'self_improvement',
        contacts: 'contacts',
        reading: 'menu_book',
        drawing: 'ink_pen',
        add: 'add',
        remove: 'remove',
        up: 'keyboard_arrow_up',
        down: 'keyboard_arrow_down'
    }
};

// Helper function to create icon element
function createIcon(category, name, className = '') {
    const icon = Icons[category]?.[name];
    if (!icon) {
        console.warn(`Icon not found: ${category}.${name}`);
        return document.createElement('div');
    }

    const wrapper = document.createElement('div');
    wrapper.className = `icon ${className}`;

    if (typeof icon === 'string') {
        const span = document.createElement('span');
        span.className = 'material-symbols-rounded';
        span.textContent = icon;
        wrapper.appendChild(span);
    } else {
        wrapper.innerHTML = icon;
    }

    return wrapper;
}

// Helper function to get weather icon based on condition
function getWeatherIcon(condition) {
    const lower = condition.toLowerCase();
    
    if (lower.includes('clear') || lower.includes('sunny')) {
        return createIcon('weather', 'clear', 'weather-icon');
    } else if (lower.includes('partly cloudy') || lower.includes('partly sunny')) {
        return createIcon('weather', 'partlyCloudy', 'weather-icon');
    } else if (lower.includes('cloudy') || lower.includes('overcast')) {
        return createIcon('weather', 'cloudy', 'weather-icon');
    } else if (lower.includes('rain') || lower.includes('shower') || lower.includes('drizzle')) {
        return createIcon('weather', 'rain', 'weather-icon');
    } else if (lower.includes('snow') || lower.includes('sleet') || lower.includes('ice')) {
        return createIcon('weather', 'snow', 'weather-icon');
    } else if (lower.includes('thunder') || lower.includes('storm')) {
        return createIcon('weather', 'thunderstorm', 'weather-icon');
    } else if (lower.includes('fog') || lower.includes('mist') || lower.includes('haze')) {
        return createIcon('weather', 'fog', 'weather-icon');
    } else if (lower.includes('wind') || lower.includes('breezy')) {
        return createIcon('weather', 'wind', 'weather-icon');
    }
    
    // Default to cloudy
    return createIcon('weather', 'cloudy', 'weather-icon');
}
