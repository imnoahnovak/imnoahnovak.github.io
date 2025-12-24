# Local Apps for Kindle Dashboard

This folder is for storing local web apps that can be accessed from the dashboard.

## Adding a New App

1. Create a new folder for your app (e.g., `notes`, `timer`, `tasks`)
2. Add an `index.html` file with your app's interface
3. Keep it lightweight - optimize for Kindle's e-ink display:
   - Use black and white only
   - Minimize JavaScript
   - Avoid animations and heavy images
   - Use simple, clear layouts
4. Update the dashboard's Apps list in `/kindle-apps/index.html` to link to your new app

## Example Structure

```
apps/
├── notes/
│   └── index.html
├── timer/
│   └── index.html
└── tasks/
    └── index.html
```

## Tips for Kindle-Friendly Apps

- Use large, readable fonts (16px minimum)
- Provide clear borders for interactive elements
- Support keyboard navigation
- Store data in localStorage for offline use
- Test on the Kindle browser to ensure compatibility
