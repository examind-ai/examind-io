Cloudflare worker that redirects https://examind.io/meet{name} to calendars on HubSpot.

# Setup

```
npm install -g @cloudflare/wrangler
```

# Development & Preview

```
wrangler dev
```

Visit: http://localhost:8787/product

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
