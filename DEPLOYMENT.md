# Deployment Guide - Galderma ASPIRE Rewards

## 🚀 Deployment Configuration

This project is configured for deployment via **GitHub → Heroku** pipeline.

## 📋 Prerequisites

Before deployment, ensure you have:
- [ ] GitHub account
- [ ] Heroku account (free tier works)
- [ ] Heroku CLI installed (`brew install heroku/brew/heroku`)
- [ ] Git configured with your credentials

## 🔧 Deployment Files Created

### 1. **Procfile**
Tells Heroku how to start the application:
```
web: npm start
```

### 2. **package.json** (Updated)
- Added `engines` to specify Node.js version (>=18.17.0)
- Added `heroku-postbuild` script for automatic builds
- Configured npm version requirement

### 3. **app.json**
Heroku app manifest with:
- App metadata
- Environment variables
- Buildpack configuration
- Formation settings

### 4. **.env.production**
Production environment variables (safe to commit)

## 📝 Deployment Steps

### Step 1: Push to GitHub

```bash
# Initialize git (already done)
git status

# Stage all files
git add .

# Commit changes
git commit -m "Initial commit: ASPIRE Galderma Rewards landing page"

# Create GitHub repository (via GitHub CLI or web)
gh repo create galderma --public --source=. --remote=origin

# Or manually add remote:
# git remote add origin https://github.com/YOUR_USERNAME/galderma.git

# Push to GitHub
git push -u origin main
```

### Step 2: Deploy to Heroku

#### Option A: Via Heroku CLI (Recommended)

```bash
# Login to Heroku
heroku login

# Create Heroku app
heroku create galderma-aspire-rewards

# Add Node.js buildpack (automatic with package.json)
heroku buildpacks:set heroku/nodejs

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set NEXT_TELEMETRY_DISABLED=1

# Connect to GitHub repository (if using Heroku GitHub integration)
# This can be done via Heroku Dashboard: Deploy → GitHub → Connect

# Or deploy directly via Git
git push heroku main

# Open the deployed app
heroku open
```

#### Option B: Via Heroku Dashboard

1. Go to https://dashboard.heroku.com/
2. Click "New" → "Create new app"
3. Name: `galderma-aspire-rewards` (or your choice)
4. Region: Choose closest to your users
5. Click "Create app"

**Connect to GitHub:**
6. Go to "Deploy" tab
7. Deployment method: Select "GitHub"
8. Connect to your GitHub account
9. Search for "galderma" repository
10. Click "Connect"

**Enable Automatic Deploys:**
11. Scroll to "Automatic deploys"
12. Choose branch: `main`
13. Click "Enable Automatic Deploys"

**Manual Deploy (First Time):**
14. Scroll to "Manual deploy"
15. Choose branch: `main`
16. Click "Deploy Branch"

**Set Environment Variables:**
17. Go to "Settings" tab
18. Click "Reveal Config Vars"
19. Add:
    - `NODE_ENV` = `production`
    - `NEXT_TELEMETRY_DISABLED` = `1`

### Step 3: Verify Deployment

```bash
# Check logs
heroku logs --tail

# Check app status
heroku ps

# Open in browser
heroku open
```

## 🌐 Your Deployed URLs

- **GitHub:** https://github.com/YOUR_USERNAME/galderma
- **Heroku:** https://galderma-aspire-rewards.herokuapp.com (or your custom name)

## 🔍 Troubleshooting

### Build Fails

```bash
# Check build logs
heroku logs --tail --app galderma-aspire-rewards

# Common issues:
# - Node version mismatch: Check package.json engines
# - Missing dependencies: Ensure all deps are in package.json
# - Build errors: Run `npm run build` locally first
```

### App Crashes

```bash
# Check runtime logs
heroku logs --tail

# Restart dynos
heroku restart

# Check dyno status
heroku ps
```

### Port Issues

Next.js automatically handles Heroku's `PORT` environment variable. No additional configuration needed.

### Memory Issues (Free Tier)

If app exceeds 512MB RAM:
```bash
# Upgrade to Hobby dyno ($7/month)
heroku dyno:resize hobby --app galderma-aspire-rewards
```

## 📊 Monitoring

### View Metrics
```bash
# Via CLI
heroku metrics

# Via Dashboard
# Go to app → Metrics tab
```

### Check Performance
```bash
# View response times
heroku logs --tail | grep "ms"

# Monitor errors
heroku logs --tail | grep "error"
```

## 🔄 Continuous Deployment

Once GitHub is connected to Heroku:

1. Make changes locally
2. Commit: `git commit -m "Your message"`
3. Push: `git push origin main`
4. Heroku automatically builds and deploys
5. Check deployment status in Heroku Dashboard

## 🔐 Security Best Practices

- ✅ Never commit `.env.local` files
- ✅ Use Heroku Config Vars for secrets
- ✅ Enable HTTPS (automatic on Heroku)
- ✅ Add custom domain with SSL certificate
- ✅ Set up monitoring and alerts

## 🎯 Custom Domain Setup

```bash
# Add custom domain
heroku domains:add www.aspirerewards.com

# Add SSL certificate (automatic with paid dynos)
heroku certs:auto:enable

# Configure DNS:
# CNAME: www → <your-app>.herokudns.com
# ALIAS/ANAME: @ → <your-app>.herokudns.com
```

## 💰 Cost Estimates

### Free Tier (Eco Dynos)
- ✅ 1000 dyno hours/month (free)
- ✅ Sleeps after 30 min inactivity
- ✅ Perfect for demo/staging

### Hobby Tier ($7/month)
- ✅ Never sleeps
- ✅ Custom domain + SSL
- ✅ Better for production

### Production Tier ($25+/month)
- ✅ Multiple dynos
- ✅ High availability
- ✅ Premium support

## 📈 Scaling

```bash
# Scale dynos (horizontal scaling)
heroku ps:scale web=2

# Upgrade dyno type (vertical scaling)
heroku dyno:resize standard-2x
```

## 🔄 Rollback

```bash
# View releases
heroku releases

# Rollback to previous version
heroku rollback v5

# Or specific version
heroku releases:rollback v3
```

## ✅ Post-Deployment Checklist

- [ ] App loads successfully
- [ ] All components render correctly
- [ ] Responsive design works on mobile
- [ ] No console errors
- [ ] Images load (once added)
- [ ] Navigation works
- [ ] Footer expands correctly
- [ ] Performance is acceptable (<3s load time)

## 🎊 Success!

Your Galderma landing page is now live and automatically deploys with every GitHub push!

---

**Next Steps:**
1. Add real hero images
2. Configure custom domain
3. Set up monitoring/analytics
4. Add backend functionality (forms, auth)
