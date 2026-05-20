# 🚀 Complete Heroku Deployment - Manual Steps

## ✅ What's Already Done

1. ✅ **GitHub Repository Created:** https://github.com/tboehm-SF/galderma
2. ✅ **Code Pushed to GitHub:** All files committed and synced
3. ✅ **Heroku Configuration Files Added:**
   - `Procfile` (process configuration)
   - `app.json` (app manifest)
   - `package.json` (updated with engines and heroku-postbuild)
   - `.env.production` (production environment variables)

## 📋 Remaining Steps (5 minutes)

### Step 1: Login to Heroku

Open your terminal and run:

```bash
cd /Users/tbohm/claude-projects/galderma
heroku login
```

This will open a browser window. Click **"Log in"** to authenticate.

### Step 2: Create Heroku App

After logging in, run:

```bash
heroku create galderma-aspire
```

Or choose your own app name:
```bash
heroku create your-custom-name
```

**Note:** App names must be unique across all Heroku. If taken, try:
- `galderma-aspire-rewards`
- `aspire-galderma-landing`
- `galderma-rewards-2026`

### Step 3: Deploy to Heroku

```bash
git push heroku main
```

This will:
- Upload your code to Heroku
- Install dependencies (`npm install`)
- Build the Next.js app (`npm run build`)
- Start the server (`npm start`)

### Step 4: Set Environment Variables

```bash
heroku config:set NODE_ENV=production
heroku config:set NEXT_TELEMETRY_DISABLED=1
```

### Step 5: Open Your Deployed App

```bash
heroku open
```

This will open your live landing page in the browser! 🎉

## 🔗 Alternative: Deploy via Heroku Dashboard (No CLI needed)

If you prefer using the web interface:

### Option A: Direct Git Push

1. Go to https://dashboard.heroku.com/
2. Click **"New"** → **"Create new app"**
3. Name: `galderma-aspire` (or your choice)
4. Region: **United States** or **Europe**
5. Click **"Create app"**

### Option B: Connect to GitHub (Recommended)

6. In your new app, go to the **"Deploy"** tab
7. Deployment method: Click **"GitHub"**
8. Click **"Connect to GitHub"** (authorize if needed)
9. Search for repository: **"galderma"**
10. Click **"Connect"** next to **tboehm-SF/galderma**

### Enable Automatic Deploys

11. Scroll to **"Automatic deploys"** section
12. Select branch: **main**
13. Click **"Enable Automatic Deploys"**

### First Manual Deploy

14. Scroll to **"Manual deploy"** section
15. Choose branch: **main**
16. Click **"Deploy Branch"**
17. Wait for build to complete (2-3 minutes)
18. Click **"View"** to see your live site!

### Set Environment Variables (Dashboard)

19. Go to **"Settings"** tab
20. Click **"Reveal Config Vars"**
21. Add these variables:
    - Key: `NODE_ENV` → Value: `production`
    - Key: `NEXT_TELEMETRY_DISABLED` → Value: `1`

## 🌐 Your Live URLs

Once deployed, you'll have:

- **GitHub:** https://github.com/tboehm-SF/galderma
- **Heroku:** https://galderma-aspire.herokuapp.com (or your custom name)

## 🔍 Verify Deployment

### Check Build Logs

```bash
heroku logs --tail
```

Or in Dashboard: **More** → **View logs**

### Check App Status

```bash
heroku ps
```

Should show:
```
=== web (Basic): npm start (1)
web.1: up 2026/05/20 21:30:00 +0000 (~ 1m ago)
```

### Test the Live Site

Visit your Heroku URL and verify:
- ✅ Page loads
- ✅ Header with menu and account icon visible
- ✅ Hero section displays properly
- ✅ "JOIN NOW" and "SIGN IN" buttons styled correctly
- ✅ Perks section shows 4 benefit cards
- ✅ Footer expands safety information
- ✅ Responsive on mobile (test in DevTools)

## 🐛 Troubleshooting

### "Application Error" Page

Check logs for errors:
```bash
heroku logs --tail --app galderma-aspire
```

Common fixes:
```bash
# Rebuild
git commit --allow-empty -m "Rebuild"
git push heroku main

# Restart dynos
heroku restart
```

### Build Fails

1. Verify build works locally:
```bash
npm run build
```

2. Check Node.js version:
```bash
node --version  # Should be >= 18.17.0
```

3. Clear cache and rebuild:
```bash
heroku repo:purge_cache --app galderma-aspire
git push heroku main
```

### Port Issues

Next.js automatically uses Heroku's `$PORT` variable. No configuration needed.

## 🎯 Post-Deployment

### Add Custom Domain (Optional)

```bash
heroku domains:add www.aspirerewards.com
heroku certs:auto:enable
```

Then configure your DNS:
- CNAME: `www` → `galderma-aspire.herokudns.com`

### Monitor Performance

```bash
# View metrics
heroku metrics

# Check response times
heroku logs --tail | grep "ms"
```

### Scale Up (If Needed)

Free tier sleeps after 30 minutes of inactivity. For always-on:

```bash
heroku dyno:resize hobby --app galderma-aspire
```

Cost: $7/month per dyno

## ✅ Quick Command Reference

```bash
# View app info
heroku info

# View logs
heroku logs --tail

# Restart app
heroku restart

# Check config
heroku config

# Scale dynos
heroku ps:scale web=1

# Open in browser
heroku open

# SSH into dyno (for debugging)
heroku run bash
```

## 🎊 Success Checklist

After deployment, verify:
- [ ] GitHub repository accessible
- [ ] Heroku app created
- [ ] Build completed successfully
- [ ] App is running (no crashes)
- [ ] Landing page loads in browser
- [ ] All components render correctly
- [ ] Mobile responsive works
- [ ] No console errors

## 📞 Need Help?

- **Heroku Status:** https://status.heroku.com/
- **Heroku Support:** https://help.heroku.com/
- **GitHub Issues:** Create issue in your repository
- **Logs:** Always check `heroku logs --tail` first

---

## 🏁 You're Almost Done!

Just run these 4 commands to go live:

```bash
cd /Users/tbohm/claude-projects/galderma
heroku login
heroku create galderma-aspire
git push heroku main
heroku open
```

**That's it!** Your pixel-perfect ASPIRE Galderma Rewards landing page will be live! 🚀
