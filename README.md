# ALEXCE

## Google Calendar

To enable the **Add to Google Calendar** button, create a Google OAuth 2.0 Web client, enable the Google Calendar API, and add your local and production URLs as authorized JavaScript origins. Copy `.env.example` to `.env.local` and set `VITE_GOOGLE_CALENDAR_CLIENT_ID`. The app requests only the `calendar.events` scope when the user clicks the button.
