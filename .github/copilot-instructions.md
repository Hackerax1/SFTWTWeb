# Copilot Instructions for SFTWTWeb

This repository is a Node.js + Express app that renders EJS views and calls the Steam Web API.

## Tech and Structure

- Entry point: `app.js`
- Views: `views/`
- Static assets: `static/`
- Runtime config: `.env` (`STEAM_API_KEY` is required)

## Coding Guidelines

- Use CommonJS (`require`/`module.exports`) to match the existing codebase.
- Keep changes minimal and focused on the user request.
- Preserve route behavior and existing response formats unless explicitly asked to change them.
- Prefer async/await and clear error handling (`try/catch` with meaningful HTTP status codes).
- Do not hardcode secrets; read from environment variables.

## API and Behavior Expectations

- Steam API calls should remain server-side.
- If adding routes, validate input and handle missing/invalid Steam data gracefully.
- Keep JSON response shapes stable for frontend compatibility.

## CI/CD Notes

- Workflow file: `.github/workflows/master_sftwt.yml`
- Keep deployment limited to the `master` branch.
- Prefer current stable GitHub Actions major versions.