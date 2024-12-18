Cloudflare worker that redirects the following:

- https://examind.io/meet{name} to calendars on HubSpot
- https://student-help.examind.io/ to student help page presentation on Google Drive
- https://instructor-help.examind.io/ to support documentation on Gitbook
- https://download.examind.io/ to feedback and download page on LeadPagesproduct page presentation on Google Drive

# Development & Preview

```
npx wrangler dev
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
