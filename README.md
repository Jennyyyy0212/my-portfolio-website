# Jenny Cheng's Personal Portfolio

Welcome to Jennyyyy's site! I used Flask and React to build a portfolio site.

## Live link
Site: [https://jennyyyy0212.github.io/my-portfolio-website/](https://jennyyyy0212.github.io/my-portfolio-website/)

## Tech
- React (CRA)
- Flask API (Python)
- Docker (for local dev)
- GitHub Actions (build & deploy)
- Static hosting (GitHub Pages)

## Requirement
- Docker Desktop (or Docker Engine) + Docker Compose v2
- (Optional) Python 3 & pip — only needed if you want to run the Flask backend without Docker

### (Optional) Run Flask locally without Docker
From the `backend` folder:

```bash
python -m venv python3-virtualenv
source python3-virtualenv/bin/activate     # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

## Local development (Docker)
Under the project `root` folder: 
```bash
# Build and start containers in the background
docker compose up --build -d

# See running containers
docker compose ps

# See logs (replace with the service name, e.g., website_frontend or website_backend)
docker logs <service-name>

# Stop and remove containers
docker compose down
```

- Frontend: http://localhost:3000 (or 127.0.0.1:3000)
- Backend: http://localhost:5002 (or 127.0.0.1:5002)
You'll now be able to open the frontend URL to view the website!

## Deploy via Github Action
### Required Setup
1. Repo settings
   - Enable Pages → Build and deployment → Source: GitHub Actions.
2. Create a Web Service on Render and get the deployed URL
   - Set root directory as `backend`
   - Set Dockerfile Path as `backend/ ./Dockerfile.prod` using the production Dockerfile
3. Updated frontend config. Set homepage and proxy with your backend deploy URL and your github page to `package.json` (or let the workflow set `PUBLIC_URL`):
   ```
    {
        "homepage": "https://<your-username>.github.io/<repo-name>/",
        "proxy": "<Your backend deployed URL on Render>",
    }
   ```
4. Secrets (Repo Settings → Secrets and variables → Actions)
   - `DISCORD_WEBHOOK` – your Discord channel webhook URL on your Discord server (or delete the `notify` job).
   - `RENDER_DEPLOY_HOOK` – your Render Web Service deploy hook. (If you don’t use Render, delete the `deploy_backend` job from the workflow.)

### Deploy
1. Push to `main` on your fork.
2. Watch the run in `Actions` → `Deploy site`.
3. **Manual trigger** the workflow after you tested on local and everything works good (Not automatically but you can change it if you want)
4. Received the Discord notification if success or fail
5. Check your updated site at `https://<your-username>.github.io/<repo-name>/` (You can also check the backend service deploy status on [Render](https://render.com/))