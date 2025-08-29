# Deployment Guide

## Quick Deployment Steps

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### 2. Deploy Options

#### Vercel (Recommended)
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Click "Deploy"

#### Railway
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your repository
6. Click "Deploy"

#### Render
1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Click "New" → "Web Service"
4. Connect your repository
5. Configure:
   - Name: `bfhl-api`
   - Environment: `Node`
   - Build Command: `npm install && cd client && npm install && npm run build`
   - Start Command: `npm start`
6. Click "Create Web Service"

### 3. Environment Variables

After deployment, add these in your hosting platform's dashboard:

```env
PORT=3001
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-url.com
USER_FULL_NAME=your_name
USER_EMAIL=your@email.com
USER_ROLL_NUMBER=YOUR123
USER_DATE_OF_BIRTH=DDMMYYYY
```

### 4. Test Your Deployment

```bash
curl -X POST https://your-app-url.vercel.app/bfhl \
  -H "Content-Type: application/json" \
  -d '{"data": ["2", "a", "y", "4", "&", "-", "*", "5", "92", "b"]}'
```

Your API will be live and accessible worldwide!
