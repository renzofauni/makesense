# MakeSense Website

A lightweight static website for MakeSense. The site has separate Home, Services, and Contact pages and is ready for GitHub and Vercel.

## Pages

- `index.html` - Home
- `services.html` - Services
- `contact.html` - Contact

## Local Preview

```bash
npm run dev
```

Open `http://localhost:4173`.

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. In Vercel, choose **New Project** and import the repository.
3. Leave the framework preset as **Other** or **Static**.
4. Leave the build command empty.
5. Set the output directory to `.`.
6. Deploy.

The included `vercel.json` enables clean URLs, so `/services` and `/contact` can resolve to their HTML pages after deployment.

## Notes

- The site is intentionally static, so there are no paid hosting requirements.
- The contact form currently uses `mailto:lets@makesense.co.nz`.
- Brand and decorative SVG assets live in `assets/`.
