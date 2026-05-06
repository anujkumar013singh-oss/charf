# Netlify Deployment Guide

This guide explains how to deploy your full-stack application (React frontend + Express backend with MongoDB) to Netlify.

## Overview

Your application consists of:
- **Frontend**: React + Vite (in `/client`)
- **Backend**: Express.js API (in `/api` folder as serverless functions)
- **Database**: MongoDB Atlas

Netlify will deploy both as a single site with serverless functions handling the backend.

---

## Prerequisites

1. **Node.js** 18.14.0 or later
2. **Netlify Account** (free tier available at https://netlify.com)
3. **Git Repository** (GitHub, GitLab, or Bitbucket)
4. **MongoDB Atlas** cluster with connection string
5. **Netlify CLI** (optional but recommended)

---

## Step 1: Prepare Your Project Structure

Your project should have this structure:

```
project-root/
├── client/                 # React frontend
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   └── ...
├── api/                    # Serverless functions
│   ├── contact.js
│   ├── search.js
│   └── health.js
├── netlify.toml           # Netlify configuration (create this)
└── package.json           # Root package.json
```

---

## Step 2: Create `netlify.toml` Configuration

Create a `netlify.toml` file in your project root:

```toml
# Build configuration
[build]
  command = "cd client && npm install && npm run build"
  functions = "api"
  publish = "client/dist"

# Environment variables
[build.environment]
  NODE_VERSION = "18"

# Redirects for API routes
[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

# Fallback for SPA routing
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## Step 3: Update API Functions for Netlify

Your API files in `/api` are already set up correctly as Netlify Functions. They use the serverless handler pattern:

```javascript
export default async function handler(req, res) {
  // Your function logic
}
```

**Key points:**
- Each file in `/api` becomes a separate function
- `/api/contact.js` → `/.netlify/functions/contact`
- `/api/search.js` → `/.netlify/functions/search`
- `/api/health.js` → `/.netlify/functions/health`

---

## Step 4: Set Environment Variables on Netlify

### Option A: Using Netlify UI

1. Go to your Netlify site dashboard
2. Navigate to **Site Settings → Environment**
3. Click **Add a variable**
4. Add the following environment variable:

| Key | Value |
|-----|-------|
| `MONGO_URI` | `mongodb+srv://alonesurvivor03_db_user:anuj1234@cluster0.qwgai2u.mongodb.net/authvault?retryWrites=true&w=majority&appName=Cluster0` |

5. Click **Save**

### Option B: Using Netlify CLI

```bash
netlify env:set MONGO_URI "mongodb+srv://alonesurvivor03_db_user:anuj1234@cluster0.qwgai2u.mongodb.net/authvault?retryWrites=true&w=majority&appName=Cluster0"
```

---

## Step 5: Configure MongoDB Atlas

Ensure your MongoDB Atlas cluster allows connections from Netlify:

1. Go to **MongoDB Atlas Dashboard**
2. Navigate to **Network Access**
3. Click **Add IP Address**
4. Select **Allow access from anywhere** (0.0.0.0/0)
   - This is necessary because Netlify Functions use dynamic IPs
5. Click **Confirm**

---

## Step 6: Deploy to Netlify

### Option A: Using Git (Recommended - Continuous Deployment)

1. Push your code to GitHub/GitLab/Bitbucket:
   ```bash
   git add .
   git commit -m "Prepare for Netlify deployment"
   git push origin main
   ```

2. Go to https://app.netlify.com
3. Click **Add new site → Import an existing project**
4. Select your Git provider and repository
5. Configure build settings:
   - **Build command**: `cd client && npm install && npm run build`
   - **Publish directory**: `client/dist`
   - **Functions directory**: `api`
6. Click **Deploy site**

Netlify will automatically deploy whenever you push to your main branch.

### Option B: Using Netlify CLI (Manual Deployment)

1. Install Netlify CLI globally:
   ```bash
   npm install -g netlify-cli
   ```

2. Authenticate with Netlify:
   ```bash
   netlify login
   ```

3. Deploy your site:
   ```bash
   netlify deploy --prod
   ```

---

## Step 7: Verify Deployment

After deployment, test your endpoints:

1. **Health Check**:
   ```
   https://your-site-name.netlify.app/api/health
   ```
   Expected response: `{ "status": "OK", "timestamp": "..." }`

2. **Search Certificate**:
   ```
   https://your-site-name.netlify.app/api/search?cert=CERT123
   ```

3. **Contact Form**:
   ```bash
   curl -X POST https://your-site-name.netlify.app/api/contact \
     -H "Content-Type: application/json" \
     -d '{
       "name": "John Doe",
       "email": "john@example.com",
       "message": "Test message"
     }'
   ```

---

## Troubleshooting

### Issue: "MONGO_URI is not defined"

**Solution**: 
- Verify the environment variable is set in Netlify UI
- Check that the variable name is exactly `MONGO_URI` (case-sensitive)
- Redeploy after adding the variable

### Issue: "MongoDB connection timeout"

**Solution**:
- Ensure MongoDB Atlas allows connections from `0.0.0.0/0`
- Check your connection string is correct
- Verify the database name is `authvault`

### Issue: "Function execution timeout"

**Solution**:
- Netlify Functions have a 60-second timeout for synchronous functions
- Optimize your MongoDB queries
- Consider using Background Functions for long-running tasks

### Issue: "CORS errors"

**Solution**:
- Your API already has CORS enabled
- Check browser console for specific error messages
- Verify the frontend is making requests to the correct API URL

### Issue: "404 on API routes"

**Solution**:
- Verify `netlify.toml` has the correct redirects
- Check that files are in the `/api` directory
- Ensure function names match the route paths

---

## Monitoring and Logs

1. Go to your Netlify site dashboard
2. Click **Functions** tab to see all deployed functions
3. Click on a function to view:
   - Invocation count
   - Execution time
   - Error logs
   - Recent invocations

---

## Performance Tips

1. **Cold Start Optimization**:
   - Keep function bundle size small
   - Use `external_node_modules` in `netlify.toml` for large packages

2. **Database Connection Pooling**:
   - Your code already implements connection caching with `global.mongoose`
   - This reuses connections across function invocations

3. **Response Streaming**:
   - For large responses, consider using Netlify's response streaming feature

---

## Updating Your Deployment

### To update your site:

1. Make changes locally
2. Commit and push to your Git repository:
   ```bash
   git add .
   git commit -m "Update feature"
   git push origin main
   ```
3. Netlify automatically redeploys

### To rollback to a previous version:

1. Go to your Netlify site dashboard
2. Click **Deploys**
3. Find the previous deployment
4. Click **Restore this deploy**

---

## Next Steps

- Set up a custom domain in Netlify settings
- Configure branch deploys for staging environments
- Set up Netlify Analytics
- Configure Netlify Forms for contact submissions
- Set up automated testing with Netlify CI

---

## Additional Resources

- [Netlify Express Documentation](https://docs.netlify.com/frameworks/express/)
- [Netlify Functions Overview](https://docs.netlify.com/functions/overview)
- [Netlify Environment Variables](https://docs.netlify.com/configure-builds/environment/)
- [MongoDB Atlas Connection Guide](https://docs.mongodb.com/manual/reference/connection-string/)

---

## Support

If you encounter issues:
1. Check Netlify Function logs in the dashboard
2. Review MongoDB Atlas connection logs
3. Check browser console for frontend errors
4. Visit [Netlify Community Forums](https://community.netlify.com)
