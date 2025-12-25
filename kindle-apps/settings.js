// Settings management for Kindle Dashboard
const SETTINGS_KEY = 'kindle-dashboard-settings';

// Pattern opacity constants (boosted for better visibility)
const PATTERN_OPACITY_DARK = 0.22;
const PATTERN_OPACITY_LIGHT = 0.16;

// Default settings
const DEFAULT_SETTINGS = {
    darkMode: 'off', // 'off', 'on', or 'time-based'
    timeFormat: '12hr', // '12hr' or '24hr'
    clockStyle: 'digital', // 'digital' or 'analog'
    backgroundPattern: 'blank', // 'blank', 'dotted', 'striped'
    weatherLocation: {
        lat: 40.7128,
        lon: -74.0060,
        name: 'New York, NY'
    },
    panels: [
        { id: 'dashboard-main', type: 'home', enabled: true, order: 0, removable: false },
        { id: 'dashboard-weather', type: 'panel', enabled: true, order: 1, removable: true },
        { id: 'dashboard-calendar', type: 'panel', enabled: true, order: 2, removable: true },
        { id: 'dashboard-reading-log', type: 'panel', enabled: true, order: 3, removable: true },
        { id: 'dashboard-rss', type: 'panel', enabled: true, order: 4, removable: true }
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
                parsed.panels = this.sanitizePanels(parsed.panels);
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

    sanitizePanels(panels) {
        // Start from defaults if panels data is missing or malformed
        if (!panels || !Array.isArray(panels)) {
            return [...DEFAULT_SETTINGS.panels];
        }

        const validIds = new Set(DEFAULT_SETTINGS.panels.map(panel => panel.id));
        const filteredPanels = panels
            .filter(panel => panel && validIds.has(panel.id))
            .map(panel => ({ ...panel }));

        DEFAULT_SETTINGS.panels.forEach(defaultPanel => {
            if (!filteredPanels.some(panel => panel.id === defaultPanel.id)) {
                filteredPanels.push({ ...defaultPanel });
            }
        });

        // Ensure required home panel always exists
        if (!filteredPanels.some(panel => panel.id === 'dashboard-main')) {
            filteredPanels.unshift({ ...DEFAULT_SETTINGS.panels[0] });
        }

        // Merge with defaults for missing properties and normalize order
        const defaultsById = Object.fromEntries(
            DEFAULT_SETTINGS.panels.map(panel => [panel.id, panel])
        );

        const mergedPanels = filteredPanels
            .map(panel => ({ ...defaultsById[panel.id], ...panel }))
            .sort((a, b) => (a.order || 0) - (b.order || 0))
            .map((panel, index) => ({ ...panel, order: index }));

        return mergedPanels;
    }

    updatePanels(panels) {
        this.settings.panels = this.sanitizePanels(panels);
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
            document.documentElement.style.setProperty('--background-color', '#222222');
            document.documentElement.style.setProperty('--text-color', '#eeeeee');
            document.documentElement.style.setProperty('--muted-color', '#aaaaaa');
            document.documentElement.style.setProperty('--border-color', '#eeeeee');
            document.documentElement.style.setProperty('--surface-color', '#111111');
        } else {
            document.documentElement.style.setProperty('--background-color', '#ffffff');
            document.documentElement.style.setProperty('--text-color', '#000000');
            document.documentElement.style.setProperty('--muted-color', '#333333');
            document.documentElement.style.setProperty('--border-color', '#000000');
            document.documentElement.style.setProperty('--surface-color', '#f6f6f6');
        }
        // Apply background pattern after theme colors are set
        this.applyBackgroundPattern();
    }

    applyBackgroundPattern() {
        const pattern = this.settings.backgroundPattern || 'blank';
        const isDark = this.isDarkMode();
        const body = document.body;
        
        // Remove existing pattern classes
        body.classList.remove('bg-blank', 'bg-dotted', 'bg-striped');
        
        // Apply new pattern
        body.classList.add(`bg-${pattern}`);
        
        // Set pattern colors based on theme for all patterns
        const opacity = isDark ? PATTERN_OPACITY_DARK : PATTERN_OPACITY_LIGHT;
        const baseColor = isDark ? '238, 238, 238' : '0, 0, 0';
        document.documentElement.style.setProperty('--pattern-color', `rgba(${baseColor}, ${opacity})`);
    }

    resetToDefaults() {
        this.settings = { ...DEFAULT_SETTINGS };
        this.saveSettings();
    }
}

// Global settings instance
const settingsManager = new SettingsManager();
