Cloudflare worker that redirects the following:

- https://examind.io/meet{name} to calendars on HubSpot
- https://student-help.examind.io/ to student help page presentation on Google Drive

# Setup

```
npm install -g @cloudflare/wrangler
```

# Development & Preview

```
wrangler dev
```

Visit:

- http://localhost:8787/product
- http://localhost:8787/meetjohnny

# Test

```
npm test
```

# Publish

```
wrangler login
wrangler publish
```

OR

Push `main` branch to GitHub to trigger deployment using GitHub Workflows.
