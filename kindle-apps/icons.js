// Icon pack for Kindle Dashboard
// Using simple SVG icons optimized for e-ink displays

const Icons = {
    // Weather icons
    weather: {
        clear: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/>
            <line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/>
            <line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>`,
        cloudy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
        </svg>`,
        partlyCloudy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M13 2v2m4.24 1.76l1.42 1.42M21 12h-2m-.76 4.24l-1.42 1.42"/>
            <path d="M6 15a5 5 0 0 1 9.9-1.09A3.5 3.5 0 1 1 17 21H6a5 5 0 0 1 0-10z"/>
        </svg>`,
        rain: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M16 13v8m-8-5v5m4-8v9"/>
            <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
        </svg>`,
        snow: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"/>
            <line x1="8" y1="16" x2="8" y2="16"/>
            <line x1="8" y1="20" x2="8" y2="20"/>
            <line x1="12" y1="18" x2="12" y2="18"/>
            <line x1="12" y1="22" x2="12" y2="22"/>
            <line x1="16" y1="16" x2="16" y2="16"/>
            <line x1="16" y1="20" x2="16" y2="20"/>
        </svg>`,
        thunderstorm: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"/>
            <polyline points="13 11 9 17 15 17 11 23"/>
        </svg>`,
        fog: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 15h18M3 19h14M5 11h14"/>
        </svg>`,
        wind: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/>
        </svg>`
    },
    
    // UI icons
    ui: {
        home: `<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22" fill="none"/>
        </svg>`,
        settings: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 1v6m0 6v10M1 12h6m6 0h10"/>
            <path d="M4.22 4.22l4.24 4.24m7.08 0l4.24-4.24M4.22 19.78l4.24-4.24m7.08 0l4.24 4.24"/>
        </svg>`,
        menu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
        </svg>`,
        close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>`,
        check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"/>
        </svg>`,
        save: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
            <polyline points="17 21 17 13 7 13 7 21"/>
            <polyline points="7 3 7 8 15 8"/>
        </svg>`,
        back: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12 19 5 12 12 5"/>
        </svg>`,
        notes: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10 9 9 9 8 9"/>
        </svg>`,
        tasks: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 11 12 14 22 4"/>
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
        </svg>`,
        timer: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="13" r="8"/>
            <polyline points="12 9 12 13 15 15"/>
            <path d="M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7l.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83"/>
            <line x1="10" y1="3" x2="14" y2="3"/>
        </svg>`,
        calculator: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="4" y="2" width="16" height="20" rx="2"/>
            <line x1="8" y1="6" x2="16" y2="6"/>
            <line x1="16" y1="10" x2="16" y2="10"/>
            <line x1="12" y1="10" x2="12" y2="10"/>
            <line x1="8" y1="10" x2="8" y2="10"/>
            <line x1="16" y1="14" x2="16" y2="14"/>
            <line x1="12" y1="14" x2="12" y2="14"/>
            <line x1="8" y1="14" x2="8" y2="14"/>
            <line x1="16" y1="18" x2="16" y2="18"/>
            <line x1="12" y1="18" x2="12" y2="18"/>
            <line x1="8" y1="18" x2="8" y2="18"/>
        </svg>`,
        weather: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
        </svg>`,
        calendar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>`,
        add: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
        </svg>`,
        remove: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="5" y1="12" x2="19" y2="12"/>
        </svg>`,
        up: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="18 15 12 9 6 15"/>
        </svg>`,
        down: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 12 15 18 9"/>
        </svg>`
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
    wrapper.innerHTML = icon;
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
