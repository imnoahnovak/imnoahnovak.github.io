// Settings management for Kindle Dashboard
const SETTINGS_KEY = 'kindle-dashboard-settings';

// Default settings
const DEFAULT_SETTINGS = {
    darkMode: 'off', // 'off', 'on', or 'time-based'
    timeFormat: '12hr', // '12hr' or '24hr'
    weatherLocation: {
        lat: 40.7128,
        lon: -74.0060,
        name: 'New York, NY'
    },
    panels: [
        { id: 'dashboard-main', type: 'home', enabled: true, order: 0, removable: false },
        { id: 'dashboard-weather', type: 'panel', enabled: true, order: 1, removable: true },
        { id: 'dashboard-calendar', type: 'panel', enabled: true, order: 2, removable: true },
        { id: 'dashboard-apps', type: 'panel', enabled: true, order: 3, removable: true }
    ]
};

// Settings manager
class SettingsManager {
    constructor() {
        this.settings = this.loadSettings();
    }

    loadSettings() {
        try {
            const stored = localStorage.getItem(SETTINGS_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                // Merge with defaults to ensure new settings are present
                return { ...DEFAULT_SETTINGS, ...parsed };
            }
        } catch (e) {
            console.error('Error loading settings:', e);
        }
        return { ...DEFAULT_SETTINGS };
    }

    saveSettings() {
        try {
            localStorage.setItem(SETTINGS_KEY, JSON.stringify(this.settings));
            return true;
        } catch (e) {
            console.error('Error saving settings:', e);
            return false;
        }
    }

    getSetting(key) {
        return this.settings[key];
    }

    setSetting(key, value) {
        this.settings[key] = value;
        this.saveSettings();
        return true;
    }

    updatePanels(panels) {
        this.settings.panels = panels;
        this.saveSettings();
    }

    getEnabledPanels() {
        return this.settings.panels
            .filter(panel => panel.enabled)
            .sort((a, b) => a.order - b.order);
    }

    isDarkMode() {
        const mode = this.settings.darkMode;
        if (mode === 'on') return true;
        if (mode === 'off') return false;
        
        // Time-based: dark mode between 8 PM and 6 AM
        if (mode === 'time-based') {
            const hour = new Date().getHours();
            return hour >= 20 || hour < 6;
        }
        
        return false;
    }

    applyTheme() {
        if (this.isDarkMode()) {
            document.documentElement.style.setProperty('--background-color', '#000000');
            document.documentElement.style.setProperty('--text-color', '#ffffff');
            document.documentElement.style.setProperty('--muted-color', '#cccccc');
        } else {
            document.documentElement.style.setProperty('--background-color', '#ffffff');
            document.documentElement.style.setProperty('--text-color', '#000000');
            document.documentElement.style.setProperty('--muted-color', '#333333');
        }
    }

    resetToDefaults() {
        this.settings = { ...DEFAULT_SETTINGS };
        this.saveSettings();
    }
}

// Global settings instance
const settingsManager = new SettingsManager();
