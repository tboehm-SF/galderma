# ASPIRE HCP Portal — Heroku Configuration Guide

## Overview

The ASPIRE HCP Portal is a Next.js application that connects to Salesforce Loyalty Management to authenticate healthcare providers and display their loyalty program data (points, tiers, benefits, patients, transactions). The app requires Salesforce credentials configured as Heroku config vars to function.

---

## Required Config Vars

The app supports **three authentication methods** to connect to Salesforce. You only need to configure **one** of the following options:

### Option 1: Direct Access Token (Recommended for Quick Setup)

| Config Var | Description | Example |
|---|---|---|
| `SF_ACCESS_TOKEN` | A valid Salesforce session/access token | `00DJ9000000...` |
| `SF_INSTANCE_URL` | Your Salesforce org's instance URL | `https://storm-dc66fbb0060ba4.my.salesforce.com` |

**When to use:** Best for demos and quick validation. Note that access tokens expire (typically after 2 hours), so this method requires periodic token refresh.

**How to get the access token:**
1. Log into your Salesforce org
2. Open Developer Console or use the CLI to retrieve a session token
3. Copy the full token string (it can be quite long)

---

### Option 2: OAuth Client Credentials (Recommended for Production)

| Config Var | Description | Example |
|---|---|---|
| `SF_CLIENT_ID` | Connected App Consumer Key | `3MVG9...` |
| `SF_CLIENT_SECRET` | Connected App Consumer Secret | `A1B2C3D4...` |
| `SF_INSTANCE_URL` | Your Salesforce org's instance URL | `https://storm-dc66fbb0060ba4.my.salesforce.com` |

**When to use:** Best for long-running production deployments. Tokens are automatically refreshed by the app. Requires a Connected App configured in Salesforce with Client Credentials flow enabled.

**Prerequisites:**
- A Connected App deployed to your Salesforce org (e.g., `ASPIRE HCP Portal`)
- Client Credentials flow enabled on the Connected App
- A "Run As" user assigned with appropriate permissions

---

### Option 3: Username-Password Login

| Config Var | Description | Example |
|---|---|---|
| `SF_USERNAME` | Salesforce username | `admin@myorg.com` |
| `SF_PASSWORD` | Salesforce password | *(set securely)* |
| `SF_SECURITY_TOKEN` | Salesforce security token (appended to password) | `aBcDeFgHiJ...` |
| `SF_LOGIN_URL` | Login endpoint (optional, defaults to `https://login.salesforce.com`) | `https://login.salesforce.com` |

**When to use:** Simple setup without needing a Connected App. Works well for sandboxes and development orgs. For sandboxes, set `SF_LOGIN_URL` to `https://test.salesforce.com`.

**How to get the security token:**
1. In Salesforce, go to **Settings** → **My Personal Information** → **Reset My Security Token**
2. A new token will be emailed to you
3. This token is appended to the password internally by the app

---

## How to Set Config Vars

### Via Heroku Dashboard

1. Go to your app in the [Heroku Dashboard](https://dashboard.heroku.com)
2. Navigate to **Settings** → **Config Vars** → **Reveal Config Vars**
3. Add each key-value pair
4. The app will automatically restart with the new values

### Via Heroku CLI

```bash
heroku config:set SF_ACCESS_TOKEN="your-token-here" SF_INSTANCE_URL="https://your-org.my.salesforce.com" --app galderma-aspire-e31be09de09a
```

---

## Verification

After setting config vars, verify the connection by hitting the health endpoint:

```
GET https://galderma-aspire-e31be09de09a.herokuapp.com/api/health
```

A successful response looks like:

```json
{
  "status": "ok",
  "time": "2026-05-22T08:42:36.454Z",
  "env": {
    "hasSfAccessToken": true,
    "hasSfInstanceUrl": true,
    "hasSfClientId": false,
    "hasSfUsername": false,
    "hasSfPassword": false,
    "nodeEnv": "production"
  }
}
```

At minimum, one complete pair must show `true`:
- `hasSfAccessToken` **AND** `hasSfInstanceUrl`
- OR `hasSfClientId` **AND** `hasSfInstanceUrl` (plus `SF_CLIENT_SECRET` is set)
- OR `hasSfUsername` **AND** `hasSfPassword`

---

## Common Issues

| Problem | Cause | Fix |
|---|---|---|
| `Missing Salesforce credentials` error | No complete credential pair is set | Check the health endpoint — ensure at least one full pair is configured |
| `SF_INSTANCE_URL` shows `false` | Config var not set or has a typo | Add it: `https://storm-dc66fbb0060ba4.my.salesforce.com` (no trailing slash) |
| `INVALID_SESSION_ID` error | Access token has expired | Generate a new token and update `SF_ACCESS_TOKEN` |
| `LOGIN_MUST_USE_SECURITY_TOKEN` | Missing security token for username-password auth | Set `SF_SECURITY_TOKEN` or add the token to your IP allowlist in Salesforce |
| Login returns 404 "No active membership" | Email doesn't match any active Loyalty Program Member | Verify the email exists as a Contact linked to an active `LoyaltyProgramMember` |

---

## Architecture Notes

- The portal is a **Next.js 16** app running in **standalone mode** on Heroku
- Salesforce connectivity uses **jsforce** (server-side only — credentials never reach the browser)
- All API routes (`/api/auth/login`, `/api/member`, `/api/health`) run as dynamic server functions
- Environment variables are read at **runtime** (not baked in at build time), so updating a config var and restarting the dyno is sufficient
- The `heroku-postbuild` script handles the build + static asset copying for standalone mode

---

## Salesforce Org Details (Galderma ASPIRE)

| Item | Value |
|---|---|
| Org Instance URL | `https://storm-dc66fbb0060ba4.my.salesforce.com` |
| Connected App | `ASPIRE HCP Portal` (ID: `06PJ9000000TXoN`) |
| Loyalty Program | ASPIRE Practice Rewards (ID: `0lpJ9000000x9xEIAQ`) |
| Demo Member | Dr. Aaron Morita — `aaronmorita@gmail.com` |
