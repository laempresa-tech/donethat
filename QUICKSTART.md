# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your MongoDB Atlas connection string:
   ```env
   MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/donethat?retryWrites=true&w=majority
   ADMIN_API_KEY=your-secret-key-123
   ```

   **Get MongoDB URI:**
   - Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free tier)
   - Create a cluster → Connect → Choose "Connect your application"
   - Copy the connection string and replace `<username>` and `<password>`

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Run Development Server

**Option A: Test frontend only (no form submissions)**
```bash
npm run dev
```
Visit: http://localhost:5173

**Option B: Full-stack with Netlify Functions (RECOMMENDED)**
```bash
netlify dev
```
Visit: http://localhost:8888

> **Note:** Form submissions only work with `netlify dev`

### Step 4: Test the Application

1. **Landing Page**: Fill out the waitlist form
   - Choose user type (Aspiring Entrepreneur or Business Owner)
   - Enter your email
   - Submit

2. **Admin Dashboard**: Visit `/admin`
   - Enter the API key from your `.env` file
   - View submissions, filter by type, export to CSV

## 📋 What Was Built

### ✅ Frontend
- Modern landing page with scroll animations
- Responsive design (mobile → desktop)
- Email signup form with validation
- Success/error states

### ✅ Backend (Netlify Functions)
- **POST /api/submit-form**: Save waitlist signups
- **GET /api/get-submissions**: Retrieve data with pagination
- MongoDB Atlas integration with Mongoose
- Email uniqueness validation

### ✅ Admin Dashboard
- Secure authentication with API key
- Cursor-based pagination (efficient for large datasets)
- Filter by user type
- Export to CSV
- Real-time statistics

## 🔑 Key Routes

- `/` - Landing page
- `/admin` - Admin dashboard (requires API key)

## 🧪 Testing Form Submission

1. Start Netlify Dev: `netlify dev`
2. Visit: http://localhost:8888
3. Fill out the form and submit
4. Check MongoDB Atlas to see the new document
5. Visit `/admin` to see it in the dashboard

## 📦 What's Included

```
✅ All Tailwind CSS warnings fixed
✅ Netlify Functions configured
✅ MongoDB schema with indexes
✅ Cursor-based pagination
✅ Admin dashboard with auth
✅ CSV export functionality
✅ Error handling
✅ Loading states
✅ Environment variables secured (.env gitignored)
```

## 🚨 Important Notes

- **Always use `netlify dev`** for full-stack testing
- **Never commit `.env`** to version control (already in .gitignore)
- **MongoDB Atlas**: Make sure to whitelist your IP or use `0.0.0.0/0` for dev
- **API Key**: Keep your ADMIN_API_KEY secret and strong

## 📖 Full Documentation

See [SETUP-GUIDE.md](./SETUP-GUIDE.md) for complete documentation including:
- Deployment instructions
- API documentation
- Database schema details
- Troubleshooting guide
- Security best practices

## 🐛 Common Issues

**Form not submitting?**
→ Use `netlify dev` instead of `npm run dev`

**"Unauthorized" in dashboard?**
→ Check API key matches `.env` file

**MongoDB connection error?**
→ Verify connection string and IP whitelist in Atlas

## 🎉 Ready to Deploy?

1. Push to GitHub/GitLab
2. Connect to Netlify
3. Add environment variables in Netlify dashboard
4. Deploy!

Happy building! 🚀
